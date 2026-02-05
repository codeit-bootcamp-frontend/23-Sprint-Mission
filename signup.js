const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const loginBtn = document.querySelector(".login-button");

const emailError = document.createElement("p");
const passwordError = document.createElement("p");

emailError.classList.add("error-text");
passwordError.classList.add("error-text");

emailInput.parentNode.appendChild(emailError);
passwordInput.parentNode.appendChild(passwordError);

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let isEmail = false;
let isPassword = false;
let isRePassword = false;
let isNickname = false;

function validateEmail() {
  const emailValue = emailInput.value.trim();

  if (emailValue === "") {
    emailError.textContent = "이메일을 입력해주세요";
    emailInput.classList.add("error");
    isEmail = false;
  } else if (!emailRegex.test(emailValue)) {
    emailError.textContent = "잘못된 이메일 형식입니다.";
    emailInput.classList.add("error");
    isEmail = false;
  } else {
    emailError.textContent = "";
    emailInput.classList.remove("error");
    isEmail = true;
  }
  updateButtonState();

}

function validatePassword() {
  const passwordValue = passwordInput.value.trim();

  if (passwordValue === "") {
    passwordError.textContent = "비밀번호를 입력해주세요.";
    passwordInput.classList.add("error");
    isPassword = false;
  } else if (passwordValue.length < 8) {
    passwordError.textContent = "비밀번호를 8자 이상 입력해주세요";
    passwordInput.classList.add("error");
    isPassword = false;
  } else {
    passwordError.textContent = "";
    passwordInput.classList.remove("error");
    isPassword = true;
  }
  updateButtonState();
}

function updateButtonState() {
  loginBtn.disabled = !(isEmail && isPassword);

  if (loginBtn.disabled == true) {
    loginBtn.classList.add("disabled");
  } else {
    loginBtn.classList.remove("disabled");
  }
}

emailInput.addEventListener("focusout", validateEmail);
emailInput.addEventListener("input", validateEmail);

passwordInput.addEventListener("focusout", validatePassword);
passwordInput.addEventListener("input", validatePassword);

loginBtn.addEventListener("click", (e) => {
  if (loginBtn.disabled) return;

  window.location.href = "/items";
});

const eyeBtn = document.querySelector(".toggle-eye");
eyeBtn.classList.add("eyeBtn");

eyeBtn.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    eyeBtn.src = "images/login_page/eyes-open.svg";
  } else {
    passwordInput.type = "password";
    eyeBtn.src = "images/login_page/eyes-close.svg";
  }
});
