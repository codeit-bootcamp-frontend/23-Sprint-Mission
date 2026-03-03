const useremail = document.getElementById('email');
const userpw = document.getElementById('password');
const errorEmail = document.getElementById("email-error");
const errorPw = document.getElementById("password-error");
const loginButton = document.getElementById("login-button");
const form = document.getElementById("login-form");

//이메일 검증
function validationEmail (){
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
  const emailIsValid = emailRegex.test(useremail.value);
  const value = useremail.value.trim();

  //빈 값 먼저 검사
  if (value === "") {
    errorEmail.textContent = "";
    return false;
  }else if(!emailIsValid){//이메일 형식 검사
    useremail.classList.add('error');
    errorEmail.textContent = "유효하지 않은 이메일 입니다.";
    return false;
  }else{
    useremail.classList.remove('error');
    errorEmail.textContent = "";
    return true;
  }

}

//비밀번호 검증
function validationPw (){
  const value = userpw.value.trim();
  const pwIsValid = value.length < 8;
  //빈 값 먼저 검사
  if (value === "") {
    errorPw.textContent = "";
    return false; 
  }else if (pwIsValid){
    userpw.classList.add('error');
    errorPw.textContent = "비밀번호를 8자 이상 입력하세요.";
    return false;
  }else{
    userpw.classList.remove('error');
    errorPw.textContent = "";
    return true;
  }
}

//버튼 상태 업데이트
function updateButtonState(){
  const emailValid = validationEmail();
  const pwIsValid = validationPw();
  loginButton.disabled = !(emailValid && pwIsValid);
}

useremail.addEventListener('input', updateButtonState);
userpw.addEventListener('input', updateButtonState); 

form.addEventListener("submit", function (){
  const emailValid = validationEmail();
  const pwIsValid = validationPw();
  if (!(emailValid && pwIsValid)){
    e.preventDefault();
  }
});
