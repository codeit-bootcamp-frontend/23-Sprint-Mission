import { showError, hideError, userEmail, userPassword } from "./login.js";

const signupBtn = document.querySelector(".go-signup");
const passwordConfirm = document.getElementById("password_confirm");
const passwordConfirmText = document.querySelector(".err-password_confirm");

//회원가입page 비밀번호_확인 에러
passwordConfirm.addEventListener("focusout", () => {
  const passwordValue = userPassword.value.trim();
  const passwordConfirmValue = passwordConfirm.value.trim();

  if (passwordValue !== passwordConfirmValue) {
    showError(
      passwordConfirm,
      passwordConfirmText,
      "비밀번호가 일치하지 않습니다.",
    );
  } else {
    hideError(passwordConfirm, passwordConfirmText);
  }
});

const nickname = document.getElementById("nickname");
const nicknameText = document.querySelector(".err-nickname");

//회원가입page 닉네임 에러
nickname.addEventListener("focusout", () => {
  const nicknameValue = nickname.value.trim();
  const nicknamePattern = /^[a-zA-Z가-힣]+$/;

  if (nicknameValue === "") {
    showError(nickname, nicknameText, "닉네임을 입력해주세요.");
  } else if (!nicknamePattern.test(nicknameValue)) {
    showError(nickname, nicknameText, "닉네임을 다시 입력해주세요.");
  } else {
    hideError(nickname, nicknameText);
  }
});

const isEmail = (val) =>
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val);
const isNickname = (val) => /^[a-zA-Z가-힣]+$/.test(val);
const isPassword = (val) => val.length >= 8;

//회원가입 로그인버튼 활성화
function signupButton() {
  const isEmailValid = isEmail(userEmail.value.trim());
  const isNicknameValid = isNickname(nickname.value.trim());
  const isPasswordValid = isPassword(userPassword.value.trim());
  const isConfirmValid =
    passwordConfirm.value.trim() === userPassword.value.trim() &&
    passwordConfirm.value !== "";
  const allValid =
    isEmailValid && isNicknameValid && isPasswordValid && isConfirmValid;

  signupBtn.disabled = !allValid;
  signupBtn.classList.toggle("able-login", allValid);
}

const signupForm = document.querySelector(".signup-main");
//입력 시 항상 로그인 버튼 활성화 조건 확인
signupForm.addEventListener("input", (e) => {
  signupButton();
});
