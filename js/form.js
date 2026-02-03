export const emailInput = document.querySelector("#email");
export const passwordInput = document.querySelector("#password");
export const passwordIcon = document.querySelector(".input-password img");
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 이메일 정규표현식

// 에러 메세지가 누적되는 것을 막아주기 위한 함수
export function deleteError(input) {
  const inputParent = input.parentElement;
  const deleteError = inputParent.querySelector(".error-txt");

  input.classList.remove("error");

  if (deleteError) {
    deleteError.remove();
  }
}

// 에러 종류에 따라 메세지가 다르게 보여지기 위한 함수
export function showError(input, message) {
  const inputParent = input.parentElement;
  const errorTxt = document.createElement("p");

  input.classList.add("error");

  errorTxt.className = "error-txt";
  errorTxt.innerText = message;
  inputParent.appendChild(errorTxt);
}

// 비밀번호 보이기/가리기 위한 함수
export function togglePassword(input, icon) {
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

// 버튼을 활성화하기 위해 검증하는 함수
export function checkButton(btn) {
  const emailValue = emailInput.value.trim(); // 입력값에서 앞뒤 공백을 제거한 문자열
  const emailErrorText = emailInput.parentElement.querySelector(".error-txt");
  const passwordValue = passwordInput.value.trim();
  const passwordErrorText = passwordInput.parentElement.querySelector(".error-txt");

  if (
    emailValue !== "" && // 값이 있을 경우
    emailRegex.test(emailValue) && // 이메일 형식이 맞을 경우
    passwordValue !== "" && // 값이 있을 경우
    passwordValue.length >= 8 && // password가 8자 이상일 경우
    !emailErrorText && // 이메일 오류 메세지가 없을 경우
    !passwordErrorText // 비밀번호 오류 메세지가 없을 경우
  ) {
    btn.disabled = false; // 로그인 버튼 활성화
  } else {
    btn.disabled = true; // 로그인 버튼 비활성화
  }
}
