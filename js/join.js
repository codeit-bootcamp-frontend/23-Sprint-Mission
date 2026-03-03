const useremail = document.getElementById('email');
const userNickname = document.getElementById('nickName')
const userpw = document.getElementById('password');
const userPwCheck = document.getElementById('passwordCheck')
const errorEmail = document.getElementById("email-error");
const errorNick = document.getElementById('nickname-error');
const errorPw = document.getElementById("password-error");
const errorPwCheck = document.getElementById('passwordCheckError');
const joinButton = document.getElementById("join-button");
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
//닉네임 빈칸인지 확인

function validationNickname(showError = false){
  const value = userNickname.value.trim();
  if (value === ""){
    if(showError){
      userNickname.classList.add('error');
      errorNick.textContent = "닉네임을 입력하세요";
      }
    return false;
  }else{
    userNickname.classList.remove('error');
    errorNick.textContent ="";
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
//비밀번호 일치 확인
function validationPwCheck(){
  const value = userPwCheck.value.trim();
  const password = userpw.value.trim();
  const passwordCheck = userPwCheck.value.trim();
  if(value === ""){
    userPwCheck.classList.add('error');
    errorPwCheck.textContent = "비밀번호가 일치하지 않습니다."
    return false;
  }else{
    if(password === passwordCheck){
      userPwCheck.classList.remove('error');
      errorPwCheck.textContent = "";
    }
  } return true;
}

//버튼 상태 업데이트
function updateButtonState(){
  const emailValid = validationEmail();
  const nicknameValid = validationNickname(); //showError = false (기본값)
  const pwIsValid = validationPw();
  const pwCheckIsValid = validationPwCheck();
  joinButton.disabled = !(emailValid && nicknameValid && pwIsValid && pwCheckIsValid);
}

useremail.addEventListener('input', updateButtonState);
userNickname.addEventListener('input', updateButtonState);
userpw.addEventListener('input', updateButtonState);
userPwCheck.addEventListener('input', updateButtonState);


form.addEventListener("submit", function (){
  const emailValid = validationEmail();
  const nicknameValid = validationNickname();
  const pwIsValid = validationPw();
  const pwCheckIsValid = validationPwCheck();
  if (!(emailValid && nicknameValid && pwIsValid && pwCheckIsValid)){
    e.preventDefault();
  }
});