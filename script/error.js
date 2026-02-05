import { emailInput, passwordInput, submitBtn } from "./dom.js";

export function showErrorMessage(inputElement, message) {
  const errorMessage = document.querySelector(`.${inputElement.id}--error_msg`);
  errorMessage.textContent = message;
  errorMessage.classList.add("visible");

  inputElement.classList.add("error_border");
  checkFormValidity();
}
export function clearErrorMessage(inputElement) {
  const errorMessage = document.querySelector(`.${inputElement.id}--error_msg`);
  errorMessage.textContent = "";
  errorMessage.classList.remove("visible");

  inputElement.classList.remove("error_border");
  checkFormValidity();
}
export function checkFormValidity() {
  const emailError = document.querySelector(".email--error_msg");
  const passwordError = document.querySelector(".password--error_msg");
  const isEmailEmpty = emailInput.value.trim() === "";
  const isPasswordEmpty = passwordInput.value.trim() === "";

  const hasEmailError = emailError.classList.contains("visible");
  const hasPasswordError = passwordError.classList.contains("visible");

  submitBtn.disabled =
    isEmailEmpty || isPasswordEmpty || hasEmailError || hasPasswordError;
}
