// 요소 선택 변수
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

const submitBtn =
  document.querySelector("#loginBtn") || document.querySelector("#signupBtn");

// login, signup 공통

function checkEmailFormat(email) {
  if (!email.includes("@")) return false;
  const parts = email.split("@");
  if (parts.length !== 2) return false;
  if (!parts[1].includes(".")) return false;
  return true;
}

function togglePasswordVisibility(input, icon) {
  if (input.type === "password") {
    input.type = "text";
    icon.src = "assets/visibility_on.svg";
  } else {
    input.type = "password";
    icon.src = "assets/visibility_off.svg";
  }
}

function updateButtonState() {
  const emailCheck =
    checkEmailFormat(emailInput.value) &&
    !emailContainer.classList.contains("error") &&
    emailInput.value !== "";
  const pwCheck =
    pwInput.value.length >= 8 && !pwContainer.classList.contains("error");

  let totalCheck = emailCheck && pwCheck;

  if (nameInput) {
    const nameCheck =
      nameInput.value.trim() !== "" &&
      !nameContainer.classList.contains("error");
    totalCheck = totalCheck && nameCheck;
  }

  if (pwconfirmInput) {
    const confirmCheck =
      pwconfirmInput.value === pwInput.value &&
      pwconfirmInput.value !== "" &&
      !pwconfirmContainer.classList.contains("error");
    totalCheck = totalCheck && confirmCheck;
  }

  submitBtn.disabled = !totalCheck;
}

const pwIcon = pwContainer.querySelector("img");
pwIcon.addEventListener("click", () =>
  togglePasswordVisibility(pwInput, pwIcon),
);

emailInput.addEventListener("input", updateButtonState);
pwInput.addEventListener("input", updateButtonState);

emailInput.addEventListener("focusout", () => {
  const value = emailInput.value;
  if (!value) {
    emailContainer.classList.add("error");
    emailError.textContent = "이메일을 입력해주세요.";
    emailError.style.display = "block";
  } else if (!checkEmailFormat(value)) {
    emailContainer.classList.add("error");
    emailError.textContent = "잘못된 이메일 형식입니다.";
    emailError.style.display = "block";
  } else {
    emailContainer.classList.remove("error");
    emailError.style.display = "none";
  }
  updateButtonState();
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
  updateButtonState();
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (submitBtn.id === "loginBtn") {
    window.location.href = "/items.html";
  } else if (submitBtn.id === "signupBtn") {
    window.location.href = "/login.html";
  }
});

// signup 한정

if (nameInput) {
  nameInput.addEventListener("input", updateButtonState);
  nameInput.addEventListener("focusout", () => {
    if (!nameInput.value) {
      nameContainer.classList.add("error");
      nameError.textContent = "닉네임을 입력해주세요.";
      nameError.style.display = "block";
    } else {
      nameContainer.classList.remove("error");
      nameError.style.display = "none";
    }
    updateButtonState();
  });
}

if (pwconfirmInput) {
  const pwconfirmIcon = pwconfirmContainer.querySelector("img");
  pwconfirmIcon.addEventListener("click", () =>
    togglePasswordVisibility(pwconfirmInput, pwconfirmIcon),
  );

  pwconfirmInput.addEventListener("input", updateButtonState);
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
    updateButtonState();
  });
}

updateButtonState();
