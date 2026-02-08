const emailInput = document.querySelector("#email");
const passwdInput = document.querySelector("#password");
const emailErrorMsg = document.querySelector("#email-error-message");
const passwdErrorMsg = document.querySelector("#passwd-error-message");
const loginButton = document.querySelector("#login-button");

function clearError(inputEl, errorEl) {
  errorEl.textContent = "";
  inputEl.classList.remove("isError");
}

function toggleLoginButton() {
  const eamailValue = emailInput.value.trim();
  const passwdValue = passwdInput.value.trim();

  // input에 유효한 값을 입력하면(이메일에 @포함 And 비밀번호 8자 이상) -> 로그인 버튼 활성화
  if (eamailValue.includes("@") && passwdValue.length >= 8) {
    loginButton.disabled = false;
  } else {
    // 그 외 경우(input 값이 비거나 에러 메시지) -> 로그인 버튼 비활성화
    loginButton.disabled = true;
  }
}

// 이메일 input에서 focus out 할 때
emailInput.addEventListener("focusout", () => {
  const emailValue = emailInput.value.trim();

  if (emailValue === "") {
    emailErrorMsg.textContent = "이메일을 입력해주세요.";
    emailInput.classList.add("isError");
    return;
  } else if (!emailValue.includes("@")) {
    emailErrorMsg.textContent = "잘못된 이메일 형식입니다.";
    emailInput.classList.add("isError");
    return;
  }
  clearError(emailInput, emailErrorMsg);
  toggleLoginButton();
});

// 비밀번호 input에서 focus out 할 때
passwdInput.addEventListener("focusout", () => {
  const passwdValue = passwdInput.value.trim();

  if (passwdValue === "") {
    passwdErrorMsg.textContent = "비밀번호를 입력해주세요.";
    passwdInput.classList.add("isError");
    return;
  } else if (passwdValue.length < 8) {
    passwdErrorMsg.textContent = "비밀번호 8자 이상 입력해주세요.";
    passwdInput.classList.add("isError");
    return;
  }
  clearError(passwdInput, passwdErrorMsg);
  toggleLoginButton();
});

// 동시 입력했을 때 로그인 버튼 상태 변경
emailInput.addEventListener("input", toggleLoginButton);
passwdInput.addEventListener("input", toggleLoginButton);

// 로그인 버튼 클릭 시 구경하러 가기 페이지로 이동
loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "items.html";
});
