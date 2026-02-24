//에러 상태 확인
export const hasError = (inputElement) => {
  return inputElement.classList.contains("error");
};
//에러 표시
export const showError = (inputElement, errorElement, message) => {
  inputElement.classList.add("error");
  errorElement.textContent = message;
};
//에러 제거
export const removeError = (inputElement, errorElement) => {
  inputElement.classList.remove("error");
  errorElement.textContent = "";
};

//이메일 형식 검증
export const isValidEmail = (email) => {
  return email.includes("@") && email.includes(".");
};
//이메일 검증
export const validateEmail = (inputElement, errorElement) => {
  const value = inputElement.value.trim();

  if (!value) {
    showError(inputElement, errorElement, "이메일을 입력해주세요.");
    return false;
  }
  if (!isValidEmail(value)) {
    showError(inputElement, errorElement, "잘못된 이메일 형식입니다.");
    return false;
  }
  removeError(inputElement, errorElement);
  return true;
};

//닉네임 검증
export const validateNickname = (inputElement, errorElement) => {
  const value = inputElement.value.trim();

  if (!value) {
    showError(inputElement, errorElement, "닉네임을 입력해주세요.");
    return false;
  }
  removeError(inputElement, errorElement);
  return true;
};

//비밀번호 8자 이상 검증
export const isValidPassword = (password) => {
  const minLength = 8;
  return password.length >= minLength;
};
//비밀번호 검증
export const validatePassword = (inputElement, errorElement) => {
  const value = inputElement.value.trim();

  if (!value) {
    showError(inputElement, errorElement, "비밀번호를 입력해주세요.");
    return false;
  }
  if (!isValidPassword(value)) {
    showError(inputElement, errorElement, "비밀번호를 8자 이상 입력해주세요.");
    return false;
  }
  removeError(inputElement, errorElement);
  return true;
};

//비밀번호 확인 input 칸 === 비밀번호 input 칸 검증
export const validatePasswordMatch = (
  passwordInput,
  inputElement,
  errorElement,
) => {
  const password = passwordInput.value.trim();
  const passwordDoubleCheck = inputElement.value.trim();
  if (password !== passwordDoubleCheck) {
    showError(inputElement, errorElement, "비밀번호가 일치하지 않습니다.");
    return false;
  }
  removeError(inputElement, errorElement);
  return true;
};
