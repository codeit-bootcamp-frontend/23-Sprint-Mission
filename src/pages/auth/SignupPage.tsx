import { ChangeEvent, FocusEvent, useEffect, useState } from "react";
import logo from "../../assets/logo/logo.svg";
import useDebounce from "../../hooks/useDebounce";
import { getErrorMessage, SignupInputId } from "./authUtils";
import { AuthContainer, AuthSwitch, Form, LogoHomeLink, SubmitButton } from "./AuthStyle";
import InputItem from "../../components/ItemUI/InputItem";
import PasswordInput from "./components/PasswordInput";
import SocialLogin from "./components/SocialLogin";
import { Link } from "react-router-dom";

interface FormState {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

interface ErrorState {
  email?: string;
  nickname?: string;
  password?: string;
  passwordConfirmation?: string;
}

const SignupPage: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    email: "",
    nickname: "",
    password: "",
    passwordConfirmation: "",
  });

  const [errors, setErrors] = useState<ErrorState>({});

  const debouncedPassword = useDebounce(formState.password, 500);
  const debouncedPasswordConfirmation = useDebounce(
    formState.passwordConfirmation,
    500
  );

  useEffect(() => { 
    if (debouncedPassword || debouncedPasswordConfirmation) {
      const passwordError = getErrorMessage("password", debouncedPassword);
      const passwordConfirmationError = getErrorMessage(
        "passwordConfirmation",
        debouncedPasswordConfirmation,
        debouncedPassword
      );

      setErrors((prevErrors) => ({
        ...prevErrors,
        password: passwordError,
        passwordConfirmation: passwordConfirmationError,
      }));
    }
  }, [debouncedPassword, debouncedPasswordConfirmation]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [id]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
  };

  const handleBlur = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    const errorMessage = getErrorMessage(
      id as SignupInputId,
      value,
      formState.password
    );
    setErrors((prevErrors) => ({ ...prevErrors, [id]: errorMessage }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      email: getErrorMessage("email", formState.email),
      nickname: getErrorMessage("nickname", formState.nickname),
      password: getErrorMessage("password", formState.password),
      passwordConfirmation: getErrorMessage(
        "passwordConfirmation",
        formState.passwordConfirmation,
        formState.password
      ),
    };

    setErrors(newErrors);

    const isValid = Object.values(newErrors).every((error) => !error);

    if (isValid) {

    }
  };

  return (
    <AuthContainer>
      <LogoHomeLink href="/" aria-label="홈으로 이동">
        <img src={logo} alt="판다마켓 로고" />
      </LogoHomeLink>

      <Form id="signupForm" method="post" onSubmit={handleSubmit}>
        <InputItem
          id="email"
          label="이메일"
          value={formState.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="이메일을 입력해 주세요"
          errorMessage={errors.email}
        />

        <InputItem
          id="nickname"
          label="닉네임"
          value={formState.nickname}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="닉네임을 입력해 주세요"
          errorMessage={errors.nickname}
        />

        <PasswordInput
          id="password"
          label="비밀번호"
          value={formState.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="비밀번호를 입력해 주세요"
          errorMessage={errors.password}
        />

        <PasswordInput
          id="passwordConfirmation"
          label="비밀번호 확인"
          value={formState.passwordConfirmation}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="비밀번호를 다시 한 번 입력해 주세요"
          errorMessage={errors.passwordConfirmation}
        />

        <SubmitButton type="submit">회원가입</SubmitButton>
      </Form>

      <SocialLogin />

      <AuthSwitch>
        이미 회원이신가요? <Link to="/login">로그인</Link>
      </AuthSwitch>
    </AuthContainer>
  )
}

export default SignupPage;