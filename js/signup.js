const emailInput = document.querySelector("#email");
const nicknameInput = document.querySelector("#nickname");
const passwdInput = document.querySelector("#password");
const passwdcheckInput = document.querySelector("#passwdcheck");
const emailErrorMsg = document.querySelector("#email-error-message");
const nickErrorMsg = document.querySelector("#nickname-error-message");
const passwdErrorMsg = document.querySelector("#passwd-error-message");
const passwdcheckErrorMsg = document.querySelector(
  "#passwdcheck-error-message",
);
const signupButton = document.querySelector("#signup-button");

function clearError(inputEl, errorEl) {
  errorEl.textContent = "";
  inputEl.classList.remove("isError");
}

function toggleSignupButton() {
  const emailValue = emailInput.value.trim();
  const nicknameValue = nicknameInput.value.trim();
  const passwdValue = passwdInput.value.trim();
  const passwdcheckValue = passwdcheckInput.value.trim();

  if (
    /*
    input에 유효한 값을 입력하면
    (이메일에 @포함 And 
    닉네임 존재 And 
    비밀번호 8자 이상 
    And 비번=비번 재입력) -> 로그인 버튼 활성화
    */
    emailValue.includes("@") &&
    nicknameValue !== "" &&
    passwdValue.length >= 8 &&
    passwdValue === passwdcheckValue
  ) {
    signupButton.disabled = false;
  } else {
    // 그 외 경우(input 값이 비거나 에러 메시지) -> 로그인 버튼 비활성화
    signupButton.disabled = true;
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
  toggleSignupButton();
});

// 닉네임 input에서 focus out 할 때
nicknameInput.addEventListener("focusout", () => {
  const nicknameValue = nicknameInput.value.trim();

  if (nicknameValue === "") {
    nickErrorMsg.textContent = "닉네임을 입력해주세요.";
    nicknameInput.classList.add("isError");
    return;
  }
  clearError(nicknameInput, nickErrorMsg);
  toggleSignupButton();
});

// 비밀번호 input에서 focus out 할 때
passwdInput.addEventListener("focusout", () => {
  const passwdValue = passwdInput.value.trim();
  const passwdcheckValue = passwdcheckInput.value.trim();

  if (passwdValue === "") {
    passwdErrorMsg.textContent = "비밀번호를 입력해주세요.";
    passwdInput.classList.add("isError");
    return;
  } else if (passwdValue.length < 8) {
    passwdErrorMsg.textContent = "비밀번호를 8자 이상 입력해주세요.";
    passwdInput.classList.add("isError");
    return;
  }
  clearError(passwdInput, passwdErrorMsg);

  if (passwdcheckValue === "") {
    // 비번 재입력 칸이 비었을 때
    passwdcheckErrorMsg.textContent = "비밀번호를 한 번 더 입력해주세요.";
    passwdcheckInput.classList.add("isError");
    passwdcheckErrorMsg.classList.remove("isCorrect");
    passwdcheckInput.classList.remove("isCorrect");
  } else if (passwdValue !== passwdcheckValue) {
    // 비밀번호 != 비밀번호 재입력 (비번 불일치)
    passwdcheckErrorMsg.textContent = "비밀번호가 일치하지 않습니다.";
    passwdcheckErrorMsg.classList.remove("isCorrect");
    passwdcheckInput.classList.remove("isCorrect");
    passwdcheckInput.classList.add("isError");
  } else {
    // 비밀번호 = 비밀번호 재입력 (비번 일치)
    passwdcheckErrorMsg.textContent = "비밀번호가 일치합니다.";
    passwdcheckErrorMsg.classList.add("isCorrect");
    passwdcheckInput.classList.add("isCorrect");
    passwdcheckInput.classList.remove("isError");
  }
  toggleSignupButton();
});

// 비밀번호 재입력 input에서 focus out 할 때
passwdcheckInput.addEventListener("focusout", () => {
  const passwdValue = passwdInput.value.trim();
  const passwdcheckValue = passwdcheckInput.value.trim();

  // 비번 재입력 칸이 비었을 때
  if (passwdcheckValue === "") {
    passwdcheckErrorMsg.textContent = "비밀번호를 한 번 더 입력해주세요.";
    passwdcheckInput.classList.add("isError");
    passwdcheckErrorMsg.classList.remove("isCorrect");
    return;
  }

  // 비밀번호 != 비밀번호 재입력 (비번 불일치)
  if (passwdValue !== passwdcheckValue) {
    passwdcheckErrorMsg.textContent = "비밀번호가 일치하지 않습니다.";
    passwdcheckErrorMsg.classList.remove("isCorrect");
    passwdcheckInput.classList.remove("isCorrect");
    passwdcheckInput.classList.add("isError");
  } else {
    // 비밀번호 = 비밀번호 재입력 (비번 일치)
    passwdcheckErrorMsg.textContent = "비밀번호가 일치합니다.";
    passwdcheckInput.classList.add("isCorrect");
    passwdcheckErrorMsg.classList.add("isCorrect");
    passwdcheckInput.classList.remove("isError");
    passwdcheckInput.classList.add("isError");
  }
});

// 동시 입력했을 때 회원가입 버튼 상태 변경
emailInput.addEventListener("input", toggleSignupButton);
nicknameInput.addEventListener("input", toggleSignupButton);
passwdInput.addEventListener("input", toggleSignupButton);
passwdcheckInput.addEventListener("input", toggleSignupButton);

// 회원가입 버튼 클릭 시 로그인 페이지로 이동
signupButton.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "login.html";
});
