//----------- 회원가입 페이지 ------------
//닉네임 에러 처리
const nameInput = document.querySelector(".inputs.nickname");
const typeNameMsg = document.querySelector(".type-nickname-msg.err-msg");

nameInput.addEventListener("focusout", (e) => {
  const nameValue = e.target.value.trim();

  if (nameValue === "") {
    nameInput.classList.add("input-error");
    typeNameMsg.style.display = "block";
  } else {
    nameInput.classList.remove("input-error");
    typeNameMsg.style.display = "none";
  }
});

//비밀번호 확인 에러 처리
const pwdInput = document.querySelector(".inputs.password");
const pwdValidInput = document.querySelector(".inputs.pwdValid");
const pwdValidMsg = document.querySelector(".pwd-valid-msg.err-msg");

pwdValidInput.addEventListener("focusout", (e) => {
  const pwdValue = pwdInput.value.trim();
  const pwdValidValue = e.target.value.trim();

  if (pwdValue !== pwdValidValue) {
    pwdValidInput.classList.add("input-err");
    pwdValidMsg.style.display = "block";
  } else {
    pwdValidInput.classList.remove("input-err");
    pwdValidMsg.style.display = "none";
  }
});
