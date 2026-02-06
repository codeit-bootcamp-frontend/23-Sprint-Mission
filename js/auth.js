const emailInput = document.querySelector("#emailInput");
const emailContainer = document.querySelector("#emailInputContainer");
const emailError = document.querySelector("#emailError");

const pwInput = document.querySelector("#pwInput");
const pwContainer = document.querySelector("#pwInputContainer");
const pwError = document.querySelector("#passwordError");

const nameInput = document.querySelector("#nameInput");
const nameContainer = document.querySelector("#nameInputContainer");
const nameError = document.querySelector("#nicknameError");

const pwconfirmInput = document.querySelector("#pwconfirmInput");
const pwconfirmContainer = document.querySelector("#pwconfirmInputContainer");
const pwconfirmError = document.querySelector("#pwconfirmError");

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

pwInput.addEventListener("focusout", () => {
  const value = pwInput.value;
  if (!value) {
    pwContainer.classList.add("error");
    pwError.textContent = "비밀번호를 입력해주세요.";
    pwError.style.display = "block";
  } else if (value.length < 8) {
    pwContainer.classList.add("error");
    pwError.textContent = "비밀번호를 8자 이상 입력해주세요.";
    pwError.style.display = "block";
  } else {
    pwContainer.classList.remove("error");
    pwError.style.display = "none";
  }
});

if (nameInput) {
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
}

if (pwconfirmInput) {
  pwconfirmInput.addEventListener("focusout", () => {
    const value = pwconfirmInput.value;
    const passwordValue = pwInput.value;
    if (!value) {
      pwconfirmContainer.classList.add("error");
      pwconfirmError.textContent = "비밀번호를 입력해주세요.";
      pwconfirmError.style.display = "block";
    } else if (value !== passwordValue) {
      pwconfirmContainer.classList.add("error");
      pwconfirmError.textContent = "비밀번호가 일치하지 않습니다.";
      pwconfirmError.style.display = "block";
    } else {
      pwconfirmContainer.classList.remove("error");
      pwconfirmError.style.display = "none";
    }
  });
}
