'use client';

import Image from 'next/image';

import getItemDetail from '@/src/api/get-item-detail';
import updateItem from '@/src/api/update-item';
import deleteItem from '@/src/api/delete-item';
import uploadImage from '@/src/api/upload-image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Button from '@/src/components/button';
import UnCheckIcon from '@/public/icons/ic_unchecked.svg';
import CheckIcon from '@/public/icons/ic_checked.svg';

interface Item {
  id: number;
  tenantId: string;
  name: string;
  memo: string;
  imageUrl: string;
  isCompleted: boolean;
}

interface ItemDetailProps {
  itemId: number;
}

export default function ItemDetail({ itemId }: ItemDetailProps) {
  const router = useRouter();

  const [item, setItem] = useState<Item | null>(null);
  const [name, setName] = useState('');
  const [memo, setMemo] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      const data = await getItemDetail(itemId);

      setItem(data);
      setName(data.name);
      setMemo(data.memo ?? '');
      setImageUrl(data.imageUrl ?? '');
      setIsCompleted(data.isCompleted);
    };

    fetchItem();
  }, [itemId]);

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = await uploadImage(file);
    setImageUrl(data.url);
  };

  const handleUpdate = async () => {
    await updateItem(itemId, {
      name,
      memo,
      imageUrl,
      isCompleted,
    });

    router.push('/');
    router.refresh();
  };

  const handleDelete = async () => {
    await deleteItem(itemId);

    router.push('/');
    router.refresh();
  };

  if (!item) return null;

  const todoStyle =
    'flex h-[64px] items-center justify-center gap-4 rounded-[24px] border-2 border-slate-900';

  return (
    <main className="mx-auto mt-6 max-w-[996px] px-6">
      <div className={isCompleted ? `bg-violet-300 ${todoStyle}` : todoStyle}>
        <button
          type="button"
          onClick={() => setIsCompleted((prev) => !prev)}
          className="h-8 w-8 rounded-full"
        >
          {isCompleted ? (
            <CheckIcon className="w-8 h-8" />
          ) : (
            <UnCheckIcon className="w-8 h-8" />
          )}
        </button>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          size={Math.max(name.length, 1)}
          className="min-w-0 text-center bg-transparent text-xl font-bold underline outline-none"
        />
      </div>

      <section className="mt-6 flex gap-6">
        <div
          className={`relative flex h-[311px] min-w-[384px] items-center justify-center rounded-[24px] bg-slate-50 ${
            imageUrl ? 'border-0' : 'border-2 border-dashed border-slate-300'
          }`}
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="rounded-[24px] object-cover"
            />
          ) : (
            <Image src="/images/img.svg" alt="empty" width={64} height={64} />
          )}

          <input
            id="item-image-upload"
            type="file"
            accept="image/*"
            onChange={handleUploadImage}
            className="hidden"
          />

          <label
            htmlFor="item-image-upload"
            className={`absolute bottom-3 right-3 rounded-full px-5 py-5 text-slate-500 cursor-pointer ${
              imageUrl
                ? 'bg-slate-900/50 hover:bg-slate-900/70 border-2 border-slate-900'
                : 'bg-slate-200 hover:bg-slate-300'
            }`}
          >
            <Image
              src={imageUrl ? '/icons/ic_edit.svg' : '/icons/ic_plus.svg'}
              alt={imageUrl ? 'changeImage' : 'addImage'}
              width={24}
              height={24}
            />
          </label>
        </div>

        <div className="relative h-[311px] max-w-[588px] w-full rounded-[24px] overflow-hidden">
          <Image
            src="/images/memo.png"
            alt="memo"
            fill
            className="object-cover"
          />

          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="메모를 입력해주세요"
            className="memo-scrollbar relative z-10 h-[229px] w-full overflow-y-auto resize-none pl-8 pr-5 mt-[62px] bg-transparent text-center text-slate-950 outline-none"
          />
        </div>
      </section>

      <div className="mt-6 flex justify-end gap-4">
        <Button
          type="button"
          variant="edit"
          onClick={handleUpdate}
          className="flex items-center gap-1"
        >
          <Image src="/icons/ic_check.svg" alt="edit" width={20} height={20} />
          수정 완료
        </Button>

        <Button
          type="button"
          variant="delete"
          onClick={handleDelete}
          className="flex items-center gap-1"
        >
          <Image src="/icons/ic_x.svg" alt="delete" width={20} height={20} />
          삭제하기
        </Button>
      </div>
    </main>
  );
}
