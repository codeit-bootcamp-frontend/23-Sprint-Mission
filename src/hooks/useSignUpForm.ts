import { useMemo, useState } from "react";
import { signUp } from "../data/authApi";
import { isValidEmail, isValidPassword } from "../utils/authValidation";

interface SignUpFormValues {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

interface UseSignUpFormParams {
  onSuccess: () => void;
}

export default function useSignUpForm({
  onSuccess,
}: UseSignUpFormParams) {
  const [formValues, setFormValues] = useState<SignUpFormValues>({
    email: "",
    nickname: "",
    password: "",
    passwordConfirmation: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [touchedEmail, setTouchedEmail] = useState<boolean>(false);
  const [touchedNickname, setTouchedNickname] = useState<boolean>(false);
  const [touchedPassword, setTouchedPassword] = useState<boolean>(false);
  const [touchedPasswordConfirmation, setTouchedPasswordConfirmation] =
    useState<boolean>(false);

  const emailEmptyError = touchedEmail && !formValues.email.trim();
  const emailInvalidError =
    touchedEmail &&
    !!formValues.email.trim() &&
    !isValidEmail(formValues.email.trim());

  const nicknameEmptyError =
    touchedNickname && !formValues.nickname.trim();

  const passwordEmptyError =
    touchedPassword && !formValues.password.trim();

  const passwordInvalidError =
    touchedPassword &&
    !!formValues.password.trim() &&
    !isValidPassword(formValues.password);

  const passwordConfirmationInitError =
    touchedPasswordConfirmation &&
    !isValidPassword(formValues.password);

  const passwordConfirmationError =
    touchedPasswordConfirmation &&
    isValidPassword(formValues.password) &&
    formValues.passwordConfirmation.trim() !==
      formValues.password.trim();

  const isFormValid = useMemo(() => {
    return (
      isValidEmail(formValues.email.trim()) &&
      !!formValues.nickname.trim() &&
      isValidPassword(formValues.password) &&
      formValues.passwordConfirmation.trim() ===
        formValues.password.trim()
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

  // 회원가입 제출
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setTouchedEmail(true);
    setTouchedNickname(true);
    setTouchedPassword(true);
    setTouchedPasswordConfirmation(true);

    if (!isFormValid) return;

    try {
      setIsSubmitting(true);

      await signUp({
        email: formValues.email.trim(),
        nickname: formValues.nickname.trim(),
        password: formValues.password.trim(),
        passwordConfirmation: formValues.passwordConfirmation.trim(),
      });

      alert("회원가입이 완료되었습니다.");
      onSuccess();
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formValues,
    showPassword,
    showPasswordConfirmation,
    isSubmitting,
    emailEmptyError,
    emailInvalidError,
    nicknameEmptyError,
    passwordEmptyError,
    passwordInvalidError,
    passwordConfirmationInitError,
    passwordConfirmationError,
    isFormValid,
    setShowPassword,
    setShowPasswordConfirmation,
    setTouchedEmail,
    setTouchedNickname,
    setTouchedPassword,
    setTouchedPasswordConfirmation,
    handleChange,
    handleSubmit,
  };
}