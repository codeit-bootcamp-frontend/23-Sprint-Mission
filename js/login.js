const emailInput = document.querySelector('#login-email');
const passwordInput = document.querySelector('#login-password');
const visibilityButton = document.querySelector('.visibility-button');
const loginButton = document.querySelector('.login-button');

let isCorrectEmail = false;
let isCorrectPassword = false;

function updateButtonState() {
  if(isCorrectEmail && isCorrectPassword){
    loginButton.disabled = false;
  } else {
    loginButton.disabled = true;
  }
}

function checkEmail(e) {
  const REQUIRED_MESSAGE = "이메일을 입력해주세요.";
  const WRONG_MESSAGE = "잘못된 이메일 형식입니다.";
  
  const inputValue = e.target.value.trim();

  const inputWrapper = e.target.closest('.input');
  const errorInput = inputWrapper.querySelector('.input-main');
  const errorText = inputWrapper.querySelector('.error-message');

  if(inputValue === ""){
    errorText.classList.add('wrong-input');
    errorInput.classList.add('wrong-input');
    errorText.textContent = REQUIRED_MESSAGE;
    isCorrectEmail = false;
    updateButtonState();
    return;
  }

  if(!inputValue.includes('@')){
    errorText.classList.add('wrong-input');
    errorInput.classList.add('wrong-input');
    errorText.textContent = WRONG_MESSAGE;
    isCorrectEmail = false;
    updateButtonState();
    return;
  }

  errorText.classList.remove('wrong-input');
  errorInput.classList.remove('wrong-input');
  errorText.textContent = '';
  isCorrectEmail = true;
  updateButtonState();
}

function checkPassword(e) {
  const REQUIRED_MESSAGE = "비밀번호를 입력해주세요.";
  const WRONG_MESSAGE = "비밀번호를 8자 이상 입력해주세요.";
  
  const inputValue = e.target.value.trim();

  const inputWrapper = e.target.closest('.input');
  const errorInput = inputWrapper.querySelector('.input-main');
  const errorText = inputWrapper.querySelector('.error-message');

  if(inputValue === ""){
    errorText.classList.add('wrong-input');
    errorInput.classList.add('wrong-input');
    errorText.textContent = REQUIRED_MESSAGE;
    isCorrectPassword = false;
    updateButtonState();
    return;
  }

  if(inputValue.length < 8){
    errorText.classList.add('wrong-input');
    errorInput.classList.add('wrong-input');
    errorText.textContent = WRONG_MESSAGE;
    isCorrectPassword = false;
    updateButtonState();
    return;
  }

  errorText.classList.remove('wrong-input');
  errorInput.classList.remove('wrong-input');
  errorText.textContent = '';
  isCorrectPassword = true;
  updateButtonState();
}

function changePasswordVisibility(e) {
  const visibilityOnImage = './img/ic_visibility_on.svg';
  const visibilityOffImage = './img/ic_visibility_off.svg';

  const inputWrapper = e.target.previousElementSibling;
  const inputType = inputWrapper.type;

  if(inputType === 'password'){
    visibilityButton.src = visibilityOnImage;
    inputWrapper.type = 'text';
  } else {
    visibilityButton.src = visibilityOffImage;
    inputWrapper.type = 'password';    
  }
}

loginButton.addEventListener('click', () => {
  window.location.href = './items.html';
})

emailInput.addEventListener('focusout', checkEmail);
passwordInput.addEventListener('focusout', checkPassword);
visibilityButton.addEventListener('click', changePasswordVisibility);
updateButtonState();