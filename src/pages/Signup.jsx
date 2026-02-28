import { useState } from "react";
import { useNavigate } from "react-router";

// Components
import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import SubmitBtn from "../components/btns/SubmitBtn";
import SocialLogin from "../components/auth/SocialLogin";
import AuthFooter from "../components/auth/AuthFooter";

// Utils
import {
  isSignupFormValid,
  getEmailErrorMessage,
  getNicknameErrorMessage,
  getPasswordErrorMessage,
  getPasswordConfirmErrorMessage,
} from "../libs/utils/auth";

export default function SignupPage() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordConfirm: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordConfirm: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleInputBlur = (e) => {
    const { id, value } = e.target;
    let errorMsg = "";

    if (id === "email") errorMsg = getEmailErrorMessage(value);
    if (id === "nickname") errorMsg = getNicknameErrorMessage(value);
    if (id === "password") errorMsg = getPasswordErrorMessage(value);
    if (id === "passwordConfirm") {
      errorMsg = getPasswordConfirmErrorMessage(values.password, value);
    }

    setErrors((prev) => ({ ...prev, [id]: errorMsg }));
  };

  const isFormValid = isSignupFormValid(values);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("회원가입이 완료되었습니다!");
    navigate("/login");
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
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          error={errors.email}
        />

        <AuthInput
          id="nickname"
          label="닉네임"
          placeholder="닉네임을 입력해주세요"
          value={values.nickname}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          error={errors.nickname}
        />

        <AuthInput
          id="password"
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={values.password}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          error={errors.password}
        />

        <AuthInput
          id="passwordConfirm"
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 다시 입력해주세요"
          value={values.passwordConfirm}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          error={errors.passwordConfirm}
        />

        <SubmitBtn
          disabled={!isFormValid}
          className="w-full py-3 bg-primary text-gray-100 rounded-[40px] font-semibold text-xl leading-8 "
        >
          회원가입
        </SubmitBtn>

        <SocialLogin />
        <AuthFooter type="signup" />
      </form>
    </AuthLayout>
  );
}
