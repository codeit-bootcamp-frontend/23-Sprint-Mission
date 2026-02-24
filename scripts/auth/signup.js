import {
  validateEmail,
  validateNickname,
  validatePassword,
  validatePasswordMatch,
  hasError,
} from "../validation.js";
import { checkInputField } from "../inputHandler.js";

function handlePasswordToggle(event) {
  const button = event.currentTarget;
  const inputContainer = button.parentElement;
  const input = inputContainer.querySelector("input");
  const img = button.querySelector("img");

  if (input.type === "password") {
    input.type = "text";
    img.src = "/assets/icons/btn-visibility-off.svg";
    img.alt = "숨기기";
  } else {
    input.type = "password";
    img.src = "/assets/icons/btn-visibility-on.svg";
    img.alt = "보기";
  }
}

document.querySelectorAll(".password-toggle").forEach((button) => {
  button.addEventListener("click", handlePasswordToggle);
});

//이메일이 비어있지 않을 때
//닉네임이 비어있지 않을 때
//비밀번호가 8자 이상일 때
//비밀번호 확인 === 비밀번호 일 때
//에러 메세지가 없을 떄
//모두 충족하면 버튼 활성화

const emailInput = document.getElementById("signup-email");
const emailError = document.getElementById("signup-email-error");
const nicknameInput = document.getElementById("signup-nickname");
const nicknameError = document.getElementById("signup-nickname-error");
const passwordInput = document.getElementById("signup-password");
const passwordError = document.getElementById("signup-password-error");
const passwordCheckInput = document.getElementById("signup-password-check");
const passwordCheckError = document.getElementById(
  "signup-password-check-error",
);
const signupButton = document.getElementById("signup-button");

const checkSignupButtonState = () => {
  const isEmailInputFilled = emailInput.value.trim() !== "";
  const isPasswordInputFilled = passwordInput.value.trim() !== "";
  const isNicknameInputFilled = nicknameInput.value.trim() !== "";
  const isPasswordCheckInputFilled = passwordCheckInput.value.trim() !== "";
  const hasNoErrors =
    !hasError(emailInput) &&
    !hasError(passwordInput) &&
    !hasError(nicknameInput) &&
    !hasError(passwordCheckInput);

  if (
    isEmailInputFilled &&
    isPasswordInputFilled &&
    isNicknameInputFilled &&
    isPasswordCheckInputFilled &&
    hasNoErrors
  ) {
    signupButton.disabled = false;
  } else {
    signupButton.disabled = true;
  }
};

checkInputField(emailInput, emailError, validateEmail, checkSignupButtonState);
checkInputField(
  nicknameInput,
  nicknameError,
  validateNickname,
  checkSignupButtonState,
);
checkInputField(
  passwordInput,
  passwordError,
  validatePassword,
  checkSignupButtonState,
);
checkInputField(
  passwordCheckInput,
  passwordCheckError,
  (input, error) => {
    return validatePasswordMatch(passwordInput, input, error);
  },
  checkSignupButtonState,
);
