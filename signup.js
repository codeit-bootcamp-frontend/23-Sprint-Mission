const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const signBtn = document.querySelector(".signup-button");
const nicknameInput = document.querySelector("#nickname");
const rePasswordInput = document.querySelector("#re-password");

const emailError = document.createElement("p");
const passwordError = document.createElement("p");
const nicknameError = document.createElement("p");
const rePasswordError = document.createElement("p");

emailError.classList.add("error-text");
passwordError.classList.add("error-text");
nicknameError.classList.add("error-text");
rePasswordError.classList.add("error-text");

emailInput.parentNode.appendChild(emailError);
passwordInput.parentNode.appendChild(passwordError);
nicknameInput.parentNode.appendChild(nicknameError);
rePasswordInput.parentNode.appendChild(rePasswordError);

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

function validateNickname() {
  const nicknameValue = nicknameInput.value.trim();

  if (nicknameValue === "") {
    nicknameError.textContent = "닉네임을 입력해주세요";
    nicknameInput.classList.add("error");
    isNickname = false;
  } else {
    nicknameError.textContent = "";
    nicknameInput.classList.remove("error");
    isNickname = true;
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

function validateRepassword() {
  const passwordValue = passwordInput.value.trim();
  const rePasswordValue = rePasswordInput.value.trim();
if (rePasswordValue !== passwordValue) {
    rePasswordError.textContent = "비밀번호가 일치하지 않습니다.";
    rePasswordInput.classList.add("error");
    isRePassword = false;
  } else {
    rePasswordError.textContent = "";
    rePasswordInput.classList.remove("error");
    isRePassword = true;
  }
  updateButtonState();
}

function updateButtonState() {
  signBtn.disabled = !(isEmail && isPassword && isNickname && isRePassword);

  if (signBtn.disabled == true) {
    signBtn.classList.add("disabled");
  } else {
    signBtn.classList.remove("disabled");
  }
}

emailInput.addEventListener("focusout", validateEmail);
emailInput.addEventListener("input", validateEmail);

nicknameInput.addEventListener("focusout", validateNickname);
nicknameInput.addEventListener("input", validateNickname);

passwordInput.addEventListener("focusout", validatePassword);
passwordInput.addEventListener("input", validatePassword);

rePasswordInput.addEventListener("focusout",validateRepassword);
rePasswordInput.addEventListener("input",validateRepassword);

signBtn.addEventListener("click", (e) => {
  if (signBtn.disabled) return;

  window.location.href = "login.html";
});

const eyeBtn = document.querySelectorAll(".toggle-eye");


eyeBtn.forEach((eye) => {
  eye.classList.add("eyeBtn");

  eye.addEventListener("click", () => {
    const input = eye.previousElementSibling;
    input.type = input.type === "password" ? "text" : "password";
    if (input.type === "password") {
    eye.src = "images/login_page/eyes-close.svg";
  } else {
    eye.src = "images/login_page/eyes-open.svg";
  }
  });
});