"use client";

import Button from "@/components/common/Button/Button";
import { deleteTodo, updateTodo, uploadImage } from "@/lib/api/todo";
import { classNames } from "@/lib/utils/classNames";
import type { Todo } from "@/types/todo";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "./TodoDetailForm.module.css";

interface TodoDetailFormProps {
  todo: Todo;
}

type SubmitStatus = "idle" | "saving" | "deleting" | "uploading";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ENGLISH_FILE_NAME_PATTERN = /^[A-Za-z0-9._-]+$/;

export default function TodoDetailForm({ todo }: TodoDetailFormProps) {
  const router = useRouter();
  const [name, setName] = useState(todo.name);
  const [memo, setMemo] = useState(todo.memo ?? "");
  const [imageUrl, setImageUrl] = useState(todo.imageUrl ?? "");
  const [previewImageUrl, setPreviewImageUrl] = useState(todo.imageUrl ?? "");
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [error, setError] = useState("");

  const isSubmitting = submitStatus !== "idle";
  const isNameEmpty = !name.trim();
  const hasChanges =
    name.trim() !== todo.name ||
    memo.trim() !== (todo.memo ?? "") ||
    imageUrl !== (todo.imageUrl ?? "") ||
    isCompleted !== todo.isCompleted;

  useEffect(() => {
    return () => {
      if (previewImageUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewImageUrl);
      }
    };
  }, [previewImageUrl]);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleMemoChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMemo(event.target.value);
  };

  const handleCompletedToggle = () => {
    setIsCompleted((prev) => !prev);
  };

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    if (!ENGLISH_FILE_NAME_PATTERN.test(file.name)) {
      setError("이미지 파일 이름은 영어, 숫자, '.', '_', '-'만 사용할 수 있습니다.");
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setError("이미지 파일 크기는 5MB 이하여야 합니다.");
      return;
    }

    const localPreviewUrl = URL.createObjectURL(file);
    setPreviewImageUrl((prev) => {
      if (prev.startsWith("blob:")) {
        URL.revokeObjectURL(prev);
      }
      return localPreviewUrl;
    });

    try {
      setError("");
      setSubmitStatus("uploading");

      const uploadedImage = await uploadImage(file);
      setImageUrl(uploadedImage.url);
      setSubmitStatus("idle");
    } catch (error) {
      console.error(error);
      setPreviewImageUrl(imageUrl);
      setError("이미지를 업로드하지 못했습니다.");
      setSubmitStatus("idle");
    }
  };

  const moveToListPage = () => {
    router.push("/");
    router.refresh();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextName = name.trim();
    if (!nextName) {
      setError("할 일 이름을 입력해주세요.");
      return;
    }

    try {
      setError("");
      setSubmitStatus("saving");

      await updateTodo(todo.id, {
        name: nextName,
        isCompleted,
        memo: memo.trim(),
        imageUrl,
      });

      moveToListPage();
    } catch (error) {
      console.error(error);
      setError("할 일을 수정하지 못했습니다.");
      setSubmitStatus("idle");
    }
  };

  const handleDelete = async () => {
    try {
      setError("");
      setSubmitStatus("deleting");

      await deleteTodo(todo.id);
      moveToListPage();
    } catch (error) {
      console.error(error);
      setError("할 일을 삭제하지 못했습니다.");
      setSubmitStatus("idle");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label
        className={classNames(
          styles.titleField,
          isCompleted && styles.completedTitle,
        )}
      >
        <button
          type="button"
          className={classNames(
            styles.checkButton,
            isCompleted && styles.checked,
          )}
          onClick={handleCompletedToggle}
          disabled={isSubmitting}
          aria-label={isCompleted ? "미완료로 변경" : "완료로 변경"}
        >
          {isCompleted ? "✓" : ""}
        </button>

        <input
          className={styles.titleInput}
          value={name}
          onChange={handleNameChange}
          disabled={isSubmitting}
          aria-label="할 일 이름"
        />
      </label>

      <div className={styles.content}>
        <div className={styles.imageField}>
          {previewImageUrl ? (
            <Image
              className={classNames(
                styles.previewImage,
                submitStatus === "uploading" && styles.uploadingImage,
              )}
              src={previewImageUrl}
              alt={`${name || todo.name} 첨부 이미지`}
              fill
              sizes="(max-width: 743px) 100vw, 400px"
              unoptimized={previewImageUrl.startsWith("blob:")}
            />
          ) : (
            <Image
              src="/images/empty/empty-image.png"
              alt=""
              width={64}
              height={64}
              aria-hidden="true"
              className={styles.emptyImageIcon}
            />
          )}

          {submitStatus === "uploading" ? (
            <div className={styles.uploadingOverlay}>업로드 중</div>
          ) : null}

          <span
            className={classNames(
              styles.imageButton,
              previewImageUrl && styles.attachedImageButton,
            )}
            aria-hidden="true"
          >
            {submitStatus === "uploading" ? (
              "..."
            ) : previewImageUrl ? (
              <Image
                src="/images/icons/image-edit.svg"
                alt=""
                width={56}
                height={56}
                aria-hidden="true"
              />
            ) : (
              "+"
            )}
          </span>
          <input
            type="file"
            accept="image/*"
            className={styles.fileInput}
            onChange={handleImageChange}
            disabled={isSubmitting}
            aria-label={previewImageUrl ? "이미지 변경" : "이미지 추가"}
          />
        </div>

        <label className={styles.memoField}>
          <span className={styles.memoTitle}>Memo</span>
          <textarea
            className={styles.memoTextarea}
            value={memo}
            onChange={handleMemoChange}
            disabled={isSubmitting}
            aria-label="메모"
          />
        </label>
      </div>

      {error ? <p className={styles.error}>{error}</p> : null}

      <div className={styles.actions}>
        <Button
          type="submit"
          className={classNames(
            styles.saveButton,
            hasChanges && styles.activeSaveButton,
          )}
          disabled={isSubmitting || isNameEmpty || !hasChanges}
        >
          ✓ 수정 완료
        </Button>
        <Button
          type="button"
          className={styles.deleteButton}
          onClick={handleDelete}
          disabled={isSubmitting}
        >
          × 삭제하기
        </Button>
      </div>
    </form>
  );
}
