const authForm = document.querySelector(".auth-form");
const loginBtn = document.querySelector(".auth-submit-btn");
const visibilityIcons = document.querySelectorAll(".auth-visibility-icon");

const handleInputFocusOut = (e) => {
  const target = e.target;
  if (target.tagName !== "INPUT") return;

  const container = target.closest(".auth-input-container");
  const errMsgElement = container.querySelector(".auth-error-msg");
  const value = target.value.trim();

  const passwordInput = authForm.querySelector("#password");
  const originalPassword = passwordInput ? passwordInput.value : "";

  const msg = generateErrMsg(value, target.id, originalPassword);

  if (msg) {
    errMsgElement.textContent = msg;
    errMsgElement.classList.remove("hidden");
  } else {
    errMsgElement.classList.add("hidden");
  }
};

const handleAuthSubmit = (e) => {
  e.preventDefault();
  const href = e.target.id === "loginForm" ? "./items.html" : "./login.html";
  window.location.href = href;
};

const updateButtonStatus = () => {
  const emailInput = authForm.querySelector("#email");
  const nicknameInput = authForm.querySelector("#nickname");
  const passwordInput = authForm.querySelector("#password");
  const passwordCheckInput = authForm.querySelector("#passwordCheck");

  const isEmailValid = validateEmail(emailInput.value);
  const isPasswordValid = passwordInput.value.length >= 8;

  const isNicknameValid = nicknameInput
    ? nicknameInput.value.trim() !== ""
    : true;
  const isPasswordMatch = passwordCheckInput
    ? passwordCheckInput.value.length > 0 &&
      passwordCheckInput.value === passwordInput.value
    : true;

  const isFormValid =
    isEmailValid && isNicknameValid && isPasswordValid && isPasswordMatch;
  loginBtn.disabled = !isFormValid;
};

const togglePasswordVisibility = (icon) => {
  const wrapper = icon.closest(".auth-password-wrapper");
  const input = wrapper.querySelector("input");

  const isPassword = input.type === "password";
  input.type = isPassword ? "text" : "password";

  icon.src = isPassword
    ? "./img/btn/btn_visibility_on_24px.svg"
    : "./img/btn/btn_visibility_off_24px.svg";

  icon.alt = isPassword ? "비밀번호 숨기기" : "비밀번호 보이기";
};

const generateErrMsg = (value, id, originalPassword = "") => {
  const blankErr = {
    email: "이메일을 입력해주세요.",
    nickname: "닉네임을 입력해주세요.",
    password: "비밀번호를 입력해주세요.",
  };

  if (!value) return blankErr[id];

  if (id === "email" && !validateEmail(value))
    return "올바른 이메일 주소가 아닙니다.";

  if (id === "password" && value.length < 8) {
    return "비밀번호를 8자 이상 입력해주세요.";
  }

  if (id === "passwordCheck" && value !== originalPassword) {
    return "비밀번호가 일치하지 않습니다.";
  }
};

const validateEmail = (email) => {
  const parts = email.split("@");
  return parts.length === 2 && parts[0] !== "" && parts[1] !== "";
};

authForm.addEventListener("focusout", handleInputFocusOut);
authForm.addEventListener("input", updateButtonStatus);
authForm.addEventListener("submit", handleAuthSubmit);

for (const icon of visibilityIcons) {
  icon.addEventListener("click", (e) => togglePasswordVisibility(e.target));
}
