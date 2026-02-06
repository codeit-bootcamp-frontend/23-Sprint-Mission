import * as form from "./form.js";

const signupForm = document.querySelector(".form-signup");
const signupButton = document.querySelector(".form-signup button");
const nicknameInput = document.querySelector("#nickname");
const passwordCheckInput = document.querySelector("#password-check");
const passwordIcons = document.querySelectorAll(".input-password img");

// 포커스 아웃일 떄 이메일 에러
form.emailInput.addEventListener("focusout", () => {
  const emailValue = form.emailInput.value.trim();

  form.deleteError(form.emailInput);

  if (emailValue === "") {
    form.showError(form.emailInput, "이메일을 입력해주세요.");
  } else if (!form.emailRegex.test(emailValue)) {
    form.showError(form.emailInput, "잘못된 이메일 형식입니다.");
  }

  checkSignupButton(signupButton);
});

// 포커스 아웃일 떄 닉네임 에러
nicknameInput.addEventListener("focusout", () => {
  const nicknameValue = nicknameInput.value.trim();

  form.deleteError(nicknameInput);

  if (nicknameValue === "") {
    form.showError(nicknameInput, "닉네임을 입력해주세요.");
  }

  checkSignupButton(signupButton);
});

// 포커스 아웃일 떄 비밀번호 에러
form.passwordInput.addEventListener("focusout", () => {
  const passwordValue = form.passwordInput.value.trim();

  form.deleteError(form.passwordInput);

  if (passwordValue === "") {
    form.showError(form.passwordInput, "비밀번호를 입력해주세요.");
  } else if (passwordValue.length < 8) {
    form.showError(form.passwordInput, "비밀번호를 8자 이상 입력해주세요.");
  }

  checkSignupButton(signupButton);
});

// 포커스 아웃일 떄 비밀번호 확인 에러
passwordCheckInput.addEventListener("focusout", () => {
  const passwordValue = form.passwordInput.value.trim();
  const passwordCheckValue = passwordCheckInput.value.trim();

  form.deleteError(passwordCheckInput);

  if (passwordCheckValue === "") {
    form.showError(passwordCheckInput, "비밀번호 확인을 입력해주세요.");
  } else if (passwordValue !== passwordCheckValue) {
    form.showError(passwordCheckInput, "비밀번호가 일치하지 않습니다.");
  }

  checkSignupButton(signupButton);
});

// 눈 모양 아이콘 클릭시 비밀번호 보이기/가리기
passwordIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    const input = icon.closest(".input-password").querySelector("input");
    form.togglePassword(input, icon);
  });
});

// 로그인 버튼 클릭시 링크 이동
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!signupButton.disabled) {
    location.href = "login.html";
  }
});

// 회원가입 버튼을 활성화하기 위해 검증하는 함수
function checkSignupButton(btn) {
  const emailValue = form.emailInput.value.trim();
  const emailErrorText = form.emailInput.parentElement.querySelector(".error-txt");
  const nicknameValue = nicknameInput.value.trim();
  const nicknameErrorText = nicknameInput.parentElement.querySelector(".error-txt");
  const passwordValue = form.passwordInput.value.trim();
  const passwordErrorText = form.passwordInput.parentElement.querySelector(".error-txt");
  const passwordCheckValue = passwordCheckInput.value.trim();
  const passwordCheckErrorText = passwordCheckInput.parentElement.querySelector(".error-txt");

  if (
    emailValue !== "" && // 값이 없을 경우
    form.emailRegex.test(emailValue) && // 이메일 형식이 맞을 경우
    nicknameValue !== "" &&
    passwordValue !== "" &&
    passwordValue.length >= 8 && // 비밀번호가 8자 이상일 경우
    passwordValue === passwordCheckValue && // 비밀번호와 비밀번호 확인이 같을 경우
    !emailErrorText && // 오류 메세지가 없을 경우
    !nicknameErrorText &&
    !passwordErrorText &&
    !passwordCheckErrorText
  ) {
    btn.disabled = false; // 회원가입 버튼 활성화
  } else {
    btn.disabled = true; // 회원가입 버튼 비활성화
  }
}
