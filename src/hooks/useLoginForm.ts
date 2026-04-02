import { useMemo, useState } from "react";
import { signIn } from "../data/authApi";
import { isValidEmail, isValidPassword } from "../utils/authValidation";

interface LoginFormValues {
  email: string;
  password: string;
}

interface UseLoginFormParams {
  onSuccess: () => void;
}

export default function useLoginForm({
  onSuccess,
}: UseLoginFormParams) {
  const [formValues, setFormValues] = useState<LoginFormValues>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [touchedEmail, setTouchedEmail] = useState<boolean>(false);
  const [touchedPassword, setTouchedPassword] = useState<boolean>(false);

  const emailEmptyError = touchedEmail && !formValues.email.trim();
  const emailInvalidError =
    touchedEmail &&
    !!formValues.email.trim() &&
    !isValidEmail(formValues.email.trim());

  const passwordEmptyError =
    touchedPassword && !formValues.password.trim();

  const passwordInvalidError =
    touchedPassword &&
    !!formValues.password.trim() &&
    !isValidPassword(formValues.password);

  const isFormValid = useMemo(() => {
    return (
      isValidEmail(formValues.email.trim()) &&
      isValidPassword(formValues.password)
    );
  }, [formValues]);

  // input 값 공통 변경
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { id, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // 로그인 제출
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setTouchedEmail(true);
    setTouchedPassword(true);

    if (!isFormValid) return;

    try {
      setIsSubmitting(true);

      const result = await signIn({
        email: formValues.email.trim(),
        password: formValues.password.trim(),
      });

      localStorage.setItem("accessToken", result.accessToken);
      onSuccess();
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formValues,
    showPassword,
    isSubmitting,
    emailEmptyError,
    emailInvalidError,
    passwordEmptyError,
    passwordInvalidError,
    isFormValid,
    setShowPassword,
    setTouchedEmail,
    setTouchedPassword,
    handleChange,
    handleSubmit,
  };
}