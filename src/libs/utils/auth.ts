import { LoginValues, SignupValues } from "@/libs/types/auth";

const AUTH_ERROR_MESSAGES = {
  EMAIL_EMPTY: "이메일을 입력해주세요.",
  EMAIL_INVALID: "잘못된 이메일 형식입니다.",
  NICKNAME_EMPTY: "닉네임을 입력해주세요.",
  PASSWORD_EMPTY: "비밀번호를 입력해주세요.",
  PASSWORD_SHORT: "비밀번호를 8자 이상 입력해주세요.",
  PASSWORD_CONFIRM_EMPTY: "비밀번호 확인을 입력해주세요.",
  PASSWORD_MISMATCH: "비밀번호가 일치하지 않습니다.",
} as const;

export const checkEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const checkPassword = (password: string) => password.length >= 8;
export const checkNickname = (nickname: string) => nickname.trim().length > 0;
export const checkPasswordMatch = (p1: string, p2: string) =>
  p1 === p2 && p2.length > 0;

export const getEmailErrorMessage = (email: string) => {
  if (!email) return AUTH_ERROR_MESSAGES.EMAIL_EMPTY;
  return checkEmail(email) ? "" : AUTH_ERROR_MESSAGES.EMAIL_INVALID;
};

export const getNicknameErrorMessage = (nickname: string) => {
  return checkNickname(nickname) ? "" : AUTH_ERROR_MESSAGES.NICKNAME_EMPTY;
};

export const getPasswordErrorMessage = (password: string) => {
  if (!password) return AUTH_ERROR_MESSAGES.PASSWORD_EMPTY;
  return checkPassword(password) ? "" : AUTH_ERROR_MESSAGES.PASSWORD_SHORT;
};

export const getPasswordConfirmErrorMessage = (
  password: string,
  passwordConfirm: string,
) => {
  if (!passwordConfirm) return AUTH_ERROR_MESSAGES.PASSWORD_CONFIRM_EMPTY;
  return checkPasswordMatch(password, passwordConfirm)
    ? ""
    : AUTH_ERROR_MESSAGES.PASSWORD_MISMATCH;
};

export const isLoginFormValid = (values: LoginValues) =>
  !getEmailErrorMessage(values.email) &&
  !getPasswordErrorMessage(values.password);

export const isSignupFormValid = (values: SignupValues) =>
  !getEmailErrorMessage(values.email) &&
  !getNicknameErrorMessage(values.nickname) &&
  !getPasswordErrorMessage(values.password) &&
  !getPasswordConfirmErrorMessage(values.password, values.passwordConfirm);
