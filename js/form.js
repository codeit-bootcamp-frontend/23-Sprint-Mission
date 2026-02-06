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
