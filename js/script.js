const useremail = document.getElementById('email');
const userpw = document.getElementById('password');
const errorEmail = document.getElementById("email-error");
const errorPw = document.getElementById("password-error");

//이메일 검증
function validationEmail (){
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
  const isValid = emailRegex.test(useremail.value);
  const value = useremail.value.trim();

  //빈 값 먼저 검사
  if (value === "") {
    errorEmail.textContent = "";
    return; 
  }
  //이메일 형식 검사
  if(!isValid){
    useremail.classList.add('error');
    return errorEmail.textContent = "유효하지 않은 이메일 입니다.";
  }else{
    useremail.classList.remove('error');
    return errorEmail.textContent = "";
  }

}
useremail.addEventListener('blur', validationEmail); //함수 "밖"에서 DOM 요소를 가져온 뒤 이벤트와 연결하는 용도로 쓴다.

//비밀번호 검증
function validationPw (){
  const value = userpw.value.trim();
  //빈 값 먼저 검사
  if (value === "") {
    errorPw.textContent = "";
    return; 
  }else if (value.length < 8){
    userpw.classList.add('error');
    return errorPw.textContent = "비밀번호를 8자 이상 입력하세요.";
  }else{
    userpw.classList.remove('error');
    return errorPw.textContent = "";
  }
}
userpw.addEventListener('blur', validationPw); //함수 "밖"에서 DOM 요소를 가져온 뒤 이벤트와 연결하는 용도로 쓴다.
