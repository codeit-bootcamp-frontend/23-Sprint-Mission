import { useState } from "react";
import { useNavigate } from "react-router";

// Components
import AuthLayout from "../components/auth/AuthLayout";
import { AuthInput } from "../components/auth/AuthInput";
import SubmitBtn from "../components/btns/SubmitBtn";
import SocialLogin from "../components/auth/SocialLogin";
import AuthFooter from "../components/auth/AuthFooter";

// Utils
import {
  isLoginFormValid,
  getEmailErrorMessage,
  getPasswordErrorMessage,
} from "../libs/utils/auth";

export default function LoginPage() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleBlur = (e) => {
    const { id, value } = e.target;
    let errorMsg = "";

    if (id === "email") errorMsg = getEmailErrorMessage(value);
    if (id === "password") errorMsg = getPasswordErrorMessage(value);

    setErrors((prev) => ({ ...prev, [id]: errorMsg }));
  };

  const isFormValid = isLoginFormValid(values);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/items");
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
        <AuthInput
          id="email"
          label="이메일"
          type="email"
          placeholder="이메일을 입력해주세요"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
        />

        <AuthInput
          id="password"
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
        />

        <SubmitBtn disabled={!isFormValid}>로그인</SubmitBtn>

        <SocialLogin />
        <AuthFooter type="login" />
      </form>
    </AuthLayout>
  );
}
