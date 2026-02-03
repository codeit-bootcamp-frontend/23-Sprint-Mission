const loginForm = document.querySelector(".form-login");
const loginButton = document.querySelector(".form-login button");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const passwordIcon = document.querySelector(".input-password img");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 이메일 정규표현식

// 에러 메세지가 누적되는 것을 막아주기 위한 함수
function deleteError(input) {
  const inputParent = input.parentElement;
  const deleteError = inputParent.querySelector(".error-txt");

  input.classList.remove("error");

  if (deleteError) {
    deleteError.remove();
  }
}

// 에러 종류에 따라 메세지가 다르게 보여지기 위한 함수
function showError(input, message) {
  const inputParent = input.parentElement;
  const errorTxt = document.createElement("p");

  input.classList.add("error");

  errorTxt.className = "error-txt";
  errorTxt.innerText = message;
  inputParent.appendChild(errorTxt);
}

// 포커스 아웃일 떄 이메일 에러
emailInput.addEventListener("focusout", () => {
  const emailValue = emailInput.value.trim();

  deleteError(emailInput);

  if (emailValue === "") {
    // 값이 없을 경우
    showError(emailInput, "이메일을 입력해주세요.");
  } else if (!emailRegex.test(emailValue)) {
    // 이메일 형식이 틀릴 경우
    showError(emailInput, "잘못된 이메일 형식입니다.");
  }

  checButton();
});

// 포커스 아웃일 떄 비밀번호 에러
passwordInput.addEventListener("focusout", () => {
  const passwordValue = passwordInput.value.trim();

  deleteError(passwordInput);

  if (passwordValue === "") {
    // 값이 없을 경우
    showError(passwordInput, "비밀번호를 입력해주세요.");
  } else if (passwordValue.length < 8) {
    // 비밀번호가 8자 미만일 경우
    showError(passwordInput, "비밀번호를 8자 이상 입력해주세요.");
  }

  checButton();
});

// 비밀번호 보이기/가리기 위한 함수
function togglePassword(input, icon) {
  if (input.type === "password") {
    input.type = "text";
    icon.src = "./images/password-on.svg";
    icon.alt = "비밀번호 보이기 아이콘";
  } else {
    input.type = "password";
    icon.src = "./images/password-off.svg";
    icon.alt = "비밀번호 가리기 아이콘";
  }
}

// 눈 모양 아이콘 클릭시 비밀번호 보이기/가리기
passwordIcon.addEventListener("click", function () {
  togglePassword(passwordInput, passwordIcon);
});

// 로그인 버튼을 활성화하기 위해 검증하는 함수
function checButton() {
  const emailValue = emailInput.value.trim(); // 입력값에서 앞뒤 공백을 제거한 문자열
  const emailErrorText = emailInput.parentElement.querySelector(".error-txt");
  const passwordValue = passwordInput.value.trim();
  const passwordErrorText =
    passwordInput.parentElement.querySelector(".error-txt");

  if (
    emailValue !== "" && // 값이 있을 경우
    emailRegex.test(emailValue) && // 이메일 형식이 맞을 경우
    passwordValue !== "" && // 값이 있을 경우
    passwordValue.length >= 8 && // password가 8자 이상일 경우
    !emailErrorText && // 이메일 오류 메세지가 없을 경우
    !passwordErrorText // 비밀번호 오류 메세지가 없을 경우
  ) {
    loginButton.disabled = false; // 로그인 버튼 활성화
  } else {
    loginButton.disabled = true; // 로그인 버튼 비활성화
  }
}

// 로그인 버튼 클릭시 링크 이동
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!loginButton.disabled) {
    location.href = "items.html";
  }
});
