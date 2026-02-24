import { validateEmail, validatePassword, hasError } from "../validation.js";
import { checkInputField } from "../inputHandler.js";
//이메일이 비어있지 않을 때
//비밀번호가 비어있지 않을 때
//에러 메세지가 없을 때
//모두 충족하면 버튼 활성화

const emailInput = document.getElementById("login-email");
const emailError = document.getElementById("login-email-error");
const passwordInput = document.getElementById("login-password");
const passwordError = document.getElementById("login-password-error");
const loginButton = document.getElementById("login-button");

function handlePasswordToggle(event) {
  const button = event.currentTarget;
  const inputContainer = button.parentElement;
  const input = inputContainer.querySelector("input");
  const img = button.querySelector("img");

  if (input.type === "password") {
    input.type = "text";
    img.src = "/assets/icons/btn-visibility-off.svg";
    img.alt = "숨기기";
    button.setAttribute("aria-label", "비밀번호 숨기기");
  } else {
    input.type = "password";
    img.src = "/assets/icons/btn-visibility-on.svg";
    img.alt = "보기";
    button.setAttribute("aria-label", "비밀번호 보기");
  }
}

document.querySelectorAll(".password-toggle").forEach((button) => {
  button.addEventListener("click", handlePasswordToggle);
});

const checkLoginButtonState = () => {
  const isEmailInputFilled = emailInput.value.trim() !== "";
  const isPasswordInputFilled = passwordInput.value.trim() !== "";
  const hasNoErrors = !hasError(emailInput) && !hasError(passwordInput);

  if (isEmailInputFilled && isPasswordInputFilled && hasNoErrors) {
    loginButton.disabled = false;
  } else {
    loginButton.disabled = true;
  }
};

checkInputField(emailInput, emailError, validateEmail, checkLoginButtonState);
checkInputField(
  passwordInput,
  passwordError,
  validatePassword,
  checkLoginButtonState,
);
