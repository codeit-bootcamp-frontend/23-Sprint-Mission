//-------- 로그인 페이지 ---------
//focusout 되었을 때 위치를 확인하는 함수
//불필요한 경우에는 에러를 무효화 하기 위함
function shouldSkipValidation(relatedTarget) {
  return (
    relatedTarget?.closest(".easy-login") ||
    relatedTarget?.closest(".logo-link") ||
    relatedTarget?.closest(".footer-wrapper")
  );
}

//이메일 에러처리
const emailInput = document.querySelector(".inputs.email");
const typeEmailMsg = document.querySelector(".type-email-msg.err-msg");
const wrongEmailMsg = document.querySelector(".wrong-email-msg.err-msg");

emailInput.addEventListener("focusout", (e) => {
  if (shouldSkipValidation(e.relatedTarget)) return;

  const emailValue = e.target.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailValue === "") {
    //input이 비어져 있는 경우
    emailInput.classList.add("input-error");
    typeEmailMsg.style.display = "block";
    wrongEmailMsg.style.display = "none";
  } else if (!emailRegex.test(emailValue)) {
    //내용이 있지만 틀린 경우
    emailInput.classList.add("input-error");
    wrongEmailMsg.style.display = "block";
    typeEmailMsg.style.display = "none";
  } else {
    emailInput.classList.remove("input-error");
    typeEmailMsg.style.display = "none";
    wrongEmailMsg.style.display = "none";
  }
});

//비밀번호 에러처리
const pwdInput = document.querySelector(".inputs.password");
const typePwdMsg = document.querySelector(".type-pwd-msg.err-msg");
const moreThan8 = document.querySelector(".more-than-8.err-msg");

pwdInput.addEventListener("focusout", (e) => {
  if (shouldSkipValidation(e.relatedTarget)) return;

  const pwdValue = e.target.value.trim();
  const isOkay = e.target.value.split("").length >= 8;

  if (pwdValue === "") {
    pwdInput.classList.add("input-error");
    typePwdMsg.style.display = "block";
    moreThan8.style.display = "none";
  } else if (!isOkay) {
    pwdInput.classList.add("input-error");
    moreThan8.style.display = "block";
    typePwdMsg.style.display = "none";
  } else {
    pwdInput.classList.remove("input-error");
    moreThan8.style.display = "none";
    typePwdMsg.style.display = "none";
  }
});

//------------ 버튼 비활성화 처리 -----------//
const mainButton = document.querySelector(".main-button");

function updateButtonState() {
  const emailValue = emailInput.value.trim();
  const pwdValue = pwdInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isEmailValid = emailRegex.test(emailValue);
  const isPwdValid = pwdValue.length >= 8;

  mainButton.disabled = !(isEmailValid && isPwdValid);
}

emailInput.addEventListener("input", updateButtonState);
pwdInput.addEventListener("input", updateButtonState);

//form 완성 후 버튼 클릭시 iems로 이동
mainButton.addEventListener("click", () => {
  window.location.href = "../items";
});
