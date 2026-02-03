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

  form.checkButton(signupButton);
});

// 포커스 아웃일 떄 닉네임 에러
nicknameInput.addEventListener("focusout", () => {
  const nicknameValue = nicknameInput.value.trim();

  form.deleteError(nicknameInput);

  if (nicknameValue === "") {
    form.showError(nicknameInput, "닉네임을 입력해주세요.");
  }

  form.checkButton(signupButton);
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

  form.checkButton(signupButton);
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

  form.checkButton(signupButton);
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
