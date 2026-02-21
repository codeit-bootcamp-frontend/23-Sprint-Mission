export const checkNickname = (nickname) => {
  return nickname.length > 0;
};

export const checkEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const checkPassword = (password) => {
  return password.length >= 8;
};

export const checkPasswordMatch = (password, passwordConfirm) => {
  return password === passwordConfirm && passwordConfirm.length > 0;
};

export const getEmailErrorMessage = (email) => {
  if (!email) return "이메일을 입력해주세요.";
  if (!checkEmail(email)) return "잘못된 이메일 형식입니다.";
  return "";
};

export const getNicknameErrorMessage = (email) => {
  if (!email) return "닉네임을 입력해주세요.";
  return "";
};

export const getPasswordErrorMessage = (password) => {
  if (!password) return "비밀번호를 입력해주세요.";
  if (!checkPassword(password)) return "비밀번호를 8자 이상 입력해주세요.";
  return "";
};

export const getPasswordConfirmErrorMessage = (password, passwordConfirm) => {
  if (!passwordConfirm) return "비밀번호 확인을 입력해주세요.";
  if (!checkPasswordMatch(password, passwordConfirm))
    return "비밀번호가 일치하지 않습니다.";
  return "";
};

export const isLoginFormValid = (values) => {
  return checkEmail(values.email) && checkPassword(values.password);
};

export const isSignupFormValid = (values) => {
  return (
    checkEmail(values.email) &&
    checkNickname(values.nickname) &&
    checkPassword(values.password) &&
    checkPasswordMatch(values.password, values.passwordConfirm)
  );
};
