import { ChangeEvent, FocusEvent, useEffect, useState } from "react";
import logo from "../../assets/logo/logo.svg";
import useDebounce from "../../hooks/useDebounce";
import { getErrorMessage, LoginInputId } from "./authUtils";
import { AuthContainer, AuthSwitch, Form, LogoHomeLink, SubmitButton } from "./AuthStyle";
import { Link } from "react-router-dom";
import SocialLogin from "./components/SocialLogin";
import InputItem from "../../components/ItemUI/InputItem";
import PasswordInput from "./components/PasswordInput";

interface FormState {
  email: string;
  password: string;
}

interface ErrorState {
  email?: string;
  password?: string;
}

const LoginPage: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<ErrorState>({});

  const debouncedPassword = useDebounce(formState.password, 500);

  useEffect(() => {
    if (debouncedPassword) {
      const passwordError = getErrorMessage("password", debouncedPassword);

      setErrors((prevErrors) => ({
        ...prevErrors,
        password: passwordError,
      }));
    }
  }, [debouncedPassword]);

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
    const errorMessage = getErrorMessage(id as LoginInputId, value);
    setErrors((prevErrors) => ({ ...prevErrors, [id]: errorMessage }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      email: getErrorMessage("email", formState.email),
      password: getErrorMessage("password", formState.password),
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

      <Form id="loginForm" method="post" onSubmit={handleSubmit}>
        <InputItem
          id="email"
          label="이메일"
          value={formState.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="이메일을 입력해 주세요"
          errorMessage={errors.email}
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

        <SubmitButton type="submit">로그인</SubmitButton>
      </Form>

      <SocialLogin />

      <AuthSwitch>
        판다마켓이 처음이신가요? <Link to="/signup">회원가입</Link>
      </AuthSwitch>
    </AuthContainer>
  )
}

export default LoginPage;