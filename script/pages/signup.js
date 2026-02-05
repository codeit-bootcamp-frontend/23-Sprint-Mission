import {
  formElement,
  submitBtn,
  emailInput,
  nicknameInput,
  passwordInput,
  passwordConfirmInput,
} from "../dom.js";
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

/* nickname validation */
nicknameInput.addEventListener("blur", (e) => {
  const value = e.target.value.trim();
  if (!value) {
    showErrorMessage(nicknameInput, "닉네임을 입력해주세요.");
  } else {
    clearErrorMessage(nicknameInput);
  }
});

nicknameInput.addEventListener("focus", () => {
  clearErrorMessage(nicknameInput);
});

/* password validation */
passwordInput.addEventListener("blur", (e) => {
  const value = e.target.value.trim();
  if (!value) {
    showErrorMessage(passwordInput, "비밀번호를 입력해주세요.");
  } else if (value.length < 8) {
    showErrorMessage(passwordInput, "비밀번호를 8자 이상 입력해주세요.");
  } else {
    clearErrorMessage(passwordInput);
  }
});

passwordInput.addEventListener("focus", () => {
  clearErrorMessage(passwordInput);
});

/* password confirmation validation */
passwordConfirmInput.addEventListener("blur", (e) => {
  const value = e.target.value.trim();
  if (!value) {
    showErrorMessage(passwordConfirmInput, "비밀번호를 입력해주세요.");
  } else if (value !== passwordInput.value.trim()) {
    showErrorMessage(passwordConfirmInput, "비밀번호가 일치하지 않습니다.");
  } else {
    clearErrorMessage(passwordConfirmInput);
  }
});

passwordConfirmInput.addEventListener("focus", () => {
  clearErrorMessage(passwordConfirmInput);
});

/* password visibility toggle */
const passwordToggleButtons = document.querySelectorAll(".password_icon");

passwordToggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.dataset.target;
    const passwordInput = document.querySelector(`#${targetId}`);

    const iconImg = button.querySelector("img");

    passwordInput.type === "password"
      ? (passwordInput.type = "text")
      : (passwordInput.type = "password");

    iconImg.src =
      passwordInput.type === "password"
        ? iconImg.dataset.hidden
        : iconImg.dataset.visible;
  });
});

/* form submit handler */
formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  checkFormValidity();
  if (!submitBtn.disabled) window.location.href = "./login.html";
});
