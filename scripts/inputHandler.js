import { removeError } from "./validation.js";

export const checkInputField = (
  inputElement,
  errorElement,
  validateInput,
  updateButtonState,
) => {
  inputElement.addEventListener("input", () => {
    if (inputElement.value.trim()) {
      removeError(inputElement, errorElement);
    }
    updateButtonState();
  });
  inputElement.addEventListener("blur", () => {
    validateInput(inputElement, errorElement);
    updateButtonState();
  });
};
