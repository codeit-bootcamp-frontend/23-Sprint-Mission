const idInput = document.querySelector(".id-input");
const passwordInput = document.querySelector(".password-input");
const idContainer = document.querySelector("#id-container");
const passwordContainer = document.querySelector("#password-container");
const errorMessage = document.querySelectorAll(".error-message");
const loginButton = document.querySelector(".login-button");
const passwordBlink = document.querySelector(".password-blink");

//이메일 검증 정규식
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//아이디, 비밀번호 상태 변수 지정
let idState = false;
let passwordState = false;

//로그인 버튼 활성화 여부
const loginButtonState = () => {
  if (idState === true && passwordState === true) {
    loginButton.classList.add("login-accept-button");
    loginButton.disabled = false;
  } else {
    loginButton.classList.remove("login-accept-button");
    loginButton.disabled = true;
  }
};

//아이디 에러 로직
idInput.addEventListener("focusout", () => {
  if (idInput.value === "") {
    idContainer.classList.add("error-border");
    idContainer.classList.remove("accept-border");
    errorMessage[0].textContent = "이메일을 입력해주세요.";
    idState = false;
  } else if (!emailPattern.test(idInput.value)) {
    idContainer.classList.add("error-border");
    idContainer.classList.remove("accept-border");
    errorMessage[0].textContent = "잘못된 이메일 형식입니다.";
    idState = false;
  } else {
    idContainer.classList.remove("error-border");
    idContainer.classList.add("accept-border");
    errorMessage[0].textContent = "";
    idState = true;
  }

  loginButtonState();
});

//패스워드 에러 로직
passwordInput.addEventListener("focusout", () => {
  if (passwordInput.value === "") {
    passwordContainer.classList.add("error-border");
    passwordContainer.classList.remove("accept-border");
    errorMessage[1].textContent = "비밀번호를 입력해주세요.";
    passwordState = false;
  } else if (passwordInput.value.length < 8) {
    passwordContainer.classList.add("error-border");
    passwordContainer.classList.remove("accept-border");
    errorMessage[1].textContent = "비밀번호를 8자 이상 입력해주세요.";
    passwordState = false;
  } else {
    passwordContainer.classList.remove("error-border");
    passwordContainer.classList.add("accept-border");
    errorMessage[1].textContent = "";
    passwordState = true;
  }

  loginButtonState();
});

//로그인 버튼 클릭 했을 떄 /items로 이동
loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  location.href = "../items";
});

//비밀번호 감추기 기능
passwordBlink.addEventListener("click", () => {
  if (passwordBlink.previousElementSibling.type === "password") {
    passwordBlink.previousElementSibling.type = "";
    passwordBlink.firstElementChild.src = "/images/blink.svg";
  } else {
    passwordBlink.previousElementSibling.type = "password";
    passwordBlink.firstElementChild.src = "/images/non-blink.svg";
  }
});
