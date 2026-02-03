import * as form from "./form.js";

const loginForm = document.querySelector(".form-login");
const loginButton = document.querySelector(".form-login button");

// 포커스 아웃일 떄 이메일 에러
form.emailInput.addEventListener("focusout", () => {
  const emailValue = form.emailInput.value.trim();

  form.deleteError(form.emailInput);

  if (emailValue === "") {
    // 값이 없을 경우
    form.showError(form.emailInput, "이메일을 입력해주세요.");
  } else if (!form.emailRegex.test(emailValue)) {
    // 이메일 형식이 틀릴 경우
    form.showError(form.emailInput, "잘못된 이메일 형식입니다.");
  }

  form.checkButton(loginButton);
});

// 포커스 아웃일 떄 비밀번호 에러
form.passwordInput.addEventListener("focusout", () => {
  const passwordValue = form.passwordInput.value.trim();

  form.deleteError(form.passwordInput);

  if (passwordValue === "") {
    // 값이 없을 경우
    form.showError(form.passwordInput, "비밀번호를 입력해주세요.");
  } else if (passwordValue.length < 8) {
    // 비밀번호가 8자 미만일 경우
    form.showError(form.passwordInput, "비밀번호를 8자 이상 입력해주세요.");
  }

  form.checkButton(loginButton);
});

// 눈 모양 아이콘 클릭시 비밀번호 보이기/가리기
form.passwordIcon.addEventListener("click", function () {
  form.togglePassword(form.passwordInput, form.passwordIcon);
});

// 로그인 버튼 클릭시 링크 이동
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!loginButton.disabled) {
    location.href = "items.html";
  }
});
