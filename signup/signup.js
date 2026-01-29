const idInput = document.querySelectorAll(".id-input");
const passwordInput = document.querySelectorAll(".password-input");
const signupContainer = document.querySelectorAll(".signup-container");
const errorMessage = document.querySelectorAll(".error-message");
const signupButton = document.querySelector(".signup-button");
const passwordBlink = document.querySelectorAll(".password-blink");

//변수 모음집
let emailState = false;
let nicknameState = false;
let passwordState = false;
let passwordAcceptState = false;

//이메일 검증 정규식
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//회원가입 버튼 상태
const signupButtonState = () => {
  if (emailState && nicknameState && passwordState && passwordAcceptState) {
    signupButton.classList.add("signup-accept-button");
    signupButton.disabled = false;
  } else {
    signupButton.classList.remove("signup-accept-button");
    signupButton.disabled = true;
  }
};

//비밀번호 확인 로직
const checkPassword = () => {
  if (passwordInput[1].value !== "") {
    if (passwordInput[1].value !== passwordInput[0].value) {
      signupContainer[3].classList.add("error-border");
      signupContainer[3].classList.remove("accept-border");
      errorMessage[3].textContent = "비밀번호가 일치하지 않습니다.";
      passwordAcceptState = false;
    } else {
      signupContainer[3].classList.remove("error-border");
      signupContainer[3].classList.add("accept-border");

      errorMessage[3].textContent = "";
      passwordAcceptState = true;
    }
  } else {
    signupContainer[3].classList.remove("error-border");
    signupContainer[3].classList.remove("accept-border");

    errorMessage[3].textContent = "";
    passwordAcceptState = false;
  }
};

//이메일
idInput[0].addEventListener("focusout", () => {
  if (idInput[0].value === "") {
    signupContainer[0].classList.add("error-border");
    signupContainer[0].classList.remove("accept-border");
    errorMessage[0].textContent = "이메일을 입력해주세요.";
    emailState = false;
  } else if (!emailPattern.test(idInput[0].value)) {
    signupContainer[0].classList.add("error-border");
    signupContainer[0].classList.remove("accept-border");
    errorMessage[0].textContent = "잘못된 이메일 형식입니다.";
    emailState = false;
  } else {
    signupContainer[0].classList.remove("error-border");
    signupContainer[0].classList.add("accept-border");
    errorMessage[0].textContent = "";
    emailState = true;
  }
  signupButtonState();
});

//닉네임
idInput[1].addEventListener("focusout", () => {
  if (idInput[1].value === "") {
    signupContainer[1].classList.add("error-border");
    signupContainer[1].classList.remove("accept-border");
    errorMessage[1].textContent = "닉네임을 입력해주세요.";
    nicknameState = false;
  } else {
    signupContainer[1].classList.remove("error-border");
    signupContainer[1].classList.add("accept-border");
    errorMessage[1].textContent = "";
    nicknameState = true;
  }
  signupButtonState();
});

//비밀번호
passwordInput[0].addEventListener("focusout", () => {
  if (passwordInput[0].value === "") {
    signupContainer[2].classList.add("error-border");
    signupContainer[2].classList.remove("accept-border");
    errorMessage[2].textContent = "비밀번호를 입력해주세요.";
    passwordState = false;
  } else if (passwordInput[0].value.length < 8) {
    signupContainer[2].classList.add("error-border");
    signupContainer[2].classList.remove("accept-border");
    errorMessage[2].textContent = "비밀번호를 8자 이상 입력해주세요.";
    passwordState = false;
  } else {
    signupContainer[2].classList.remove("error-border");
    signupContainer[2].classList.add("accept-border");
    errorMessage[2].textContent = "";
    passwordState = true;
  }
  checkPassword();
  signupButtonState();
});

//비밀번호 확인
passwordInput[1].addEventListener("focusout", () => {
  checkPassword();
  signupButtonState();
});

//로그인 페이지로 이동
signupButton.addEventListener("click", (e) => {
  e.preventDefault();
  location.href = "../login";
});

//눈 버튼 눌렀을 때 이미지 변경
for (let i = 0; i < 2; i++) {
  passwordBlink[i].addEventListener("click", () => {
    if (passwordBlink[i].previousElementSibling.type === "password") {
      passwordBlink[i].previousElementSibling.type = "";
      passwordBlink[i].firstElementChild.src = "/images/blink.svg";
    } else {
      passwordBlink[i].previousElementSibling.type = "password";
      passwordBlink[i].firstElementChild.src = "/images/non-blink.svg";
    }
  });
}
