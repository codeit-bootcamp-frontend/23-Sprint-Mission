import { formElement, submitBtn, emailInput, passwordInput } from "../dom.js";
import {
  showErrorMessage,
  clearErrorMessage,
  checkFormValidity,
} from "../error.js";

/* email validation */
emailInput.addEventListener("blur", (e) => {
  const value = e.target.value.trim();
  const emailRegex = /^\S+@\S+\.\S+$/;

  if (!value) {
    showErrorMessage(emailInput, "이메일을 입력해주세요.");
  } else if (!emailRegex.test(value)) {
    showErrorMessage(emailInput, "잘못된 이메일 형식입니다.");
  } else {
    clearErrorMessage(emailInput);
  }
});

emailInput.addEventListener("focus", () => {
  clearErrorMessage(emailInput);
});

/* password validation */
const passwordToggleButton = document.querySelector(".password_icon");

passwordToggleButton.addEventListener("click", () => {
  const iconImg = passwordToggleButton.querySelector("img");

  passwordInput.type === "password"
    ? (passwordInput.type = "text")
    : (passwordInput.type = "password");

  iconImg.src =
    passwordInput.type === "password"
      ? iconImg.dataset.hidden
      : iconImg.dataset.visible;
});

passwordInput.addEventListener("focus", () => {
  clearErrorMessage(passwordInput);
});

/* form submit handler */
formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  checkFormValidity();

  if (!submitBtn.disabled) window.location.href = "./items.html";
});
