export const userEmail = document.getElementById("useremail");
export const emailText = document.querySelector(".err-email");
export const userPassword = document.getElementById("password");
export const passwordText = document.querySelector(".err-password");
const loginBtn = document.querySelector(".go-login");

// 에러 나타내기 (이메일、 비밀번호)
export function showError(inputElement, textElement, message) {
  inputElement.classList.add("err-inputbox");
  textElement.textContent = message;
  textElement.style.display = "block";
}

// 에러 없애기 (이메일、 비밀번호)
export function hideError(inputElement, textElement) {
  inputElement.classList.remove("err-inputbox");
  textElement.style.display = "none";
}

//로그인,회원가입page  이메일 에러
userEmail.addEventListener("focusout", () => {
  const emailValue = userEmail.value.trim();
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (emailValue === "") {
    showError(userEmail, emailText, "이메일을 입력해주세요.");
  } else if (!emailPattern.test(emailValue)) {
    showError(userEmail, emailText, "잘못된 이메일입니다.");
  } else {
    hideError(userEmail, emailText);
  }
});
//로그인,회원가입page 비밀번호 에러
userPassword.addEventListener("focusout", () => {
  const passwordValue = userPassword.value.trim();
  const passwordLength = passwordValue.length;
  if (passwordValue === "") {
    showError(userPassword, passwordText, "비밀번호를 입력해주세요.");
  } else if (passwordLength < 8) {
    showError(userPassword, passwordText, "비밀번호를 8자 이상 입력해주세요.");
  } else {
    hideError(userPassword, passwordText);
  }
});

const validateEmail = (email) =>
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
const validatePassword = (pw) => pw.length >= 8;

// 로그인page 로그인 버튼 활성화
function loginButton() {
  const isEmailValid = validateEmail(userEmail.value.trim());
  const isPasswordValid = validatePassword(userPassword.value.trim());

  if (isEmailValid && isPasswordValid) {
    loginBtn.classList.add("able-login");
    loginBtn.disabled = false;
  } else {
    loginBtn.classList.remove("able-login");
    loginBtn.disabled = true;
  }
}

// //비밀번호 눈 감고 뜨기
export const eyeImgs = document.querySelectorAll(".eye-image");

eyeImgs.forEach((btn) => {
  btn.addEventListener("click", () => {
    const isClosed = btn.getAttribute("src").includes("password_close");
    const targetInput = btn.previousElementSibling;

    if (isClosed) {
      btn.setAttribute("src", "./images/login/password_open_eye_btn.svg");
      targetInput.setAttribute("type", "text");
    } else {
      btn.setAttribute("src", "./images/login/password_close_eye_btn.svg");
      targetInput.setAttribute("type", "password");
    }
  });
});

const loginForm = document.querySelector(".login-main");

//입력 시 항상 로그인 버튼 활성화 조건 확인
if (loginForm) {
  loginForm.addEventListener("input", (e) => {
    loginButton();
  });
}
if (loginBtn) {
  loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (!loginBtn.disabled) {
      location.href = "/items";
    }
  });
}
