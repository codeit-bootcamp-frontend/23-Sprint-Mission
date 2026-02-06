const emailInput = document.querySelector("#emailInput");
const emailContainer = document.querySelector("#emailInputContainer");
const emailError = document.querySelector("#emailError");

const nameInput = document.querySelector("#nameInput");
const nameContainer = document.querySelector("#nameInputContainer");
const nameError = document.querySelector("#nicknameError");

function checkEmail(email) {
  if (!email.includes("@")) return false;
  const parts = email.split("@");
  if (parts.length !== 2) return false;
  if (!parts[1].includes(".")) return false;
  return true;
}

emailInput.addEventListener("focusout", () => {
  const value = emailInput.value;
  if (!value) {
    emailContainer.classList.add("error");
    emailError.textContent = "이메일을 입력해주세요.";
    emailError.style.display = "block";
  } else if (!checkEmail(value)) {
    emailContainer.classList.add("error");
    emailError.textContent = "잘못된 이메일 형식입니다.";
    emailError.style.display = "block";
  } else {
    emailContainer.classList.remove("error");
    emailError.style.display = "none";
  }
});

nameInput.addEventListener("focusout", () => {
  if (!nameInput.value) {
    nameContainer.classList.add("error");
    nameError.textContent = "닉네임을 입력해주세요.";
    nameError.style.display = "block";
  } else {
    nameContainer.classList.remove("error");
    nameError.style.display = "none";
  }
});
