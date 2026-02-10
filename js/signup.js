const emailInput = document.querySelector('#signup-email');
const nicknameInput = document.querySelector('#signup-nickname');
const passwordInput = document.querySelector('#signup-password');
const passwordConfirmInput = document.querySelector('#signup-password-confirm');
const visibilityButtons = document.querySelectorAll('.visibility-button');
const signupButton = document.querySelector('.signup-button');

let isCorrectEmail = false;
let isCorrectNickname = false;
let isCorrectPassword = false;
let isCorrectPasswordConfirm = false;

function updateButtonState() {
  if(isCorrectEmail && isCorrectNickname && isCorrectPassword && isCorrectPasswordConfirm){
    signupButton.disabled = false;
  } else {
    signupButton.disabled = true;
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

function checkNickname(e) {
  const REQUIRED_MESSAGE = "닉네임을 입력해주세요.";

  const inputValue = e.target.value.trim();

  const inputWrapper = e.target.closest('.input');
  const errorInput = inputWrapper.querySelector('.input-main');
  const errorText = inputWrapper.querySelector('.error-message');

  if (inputValue === ""){
    errorText.classList.add('wrong-input');
    errorInput.classList.add('wrong-input');
    errorText.textContent = REQUIRED_MESSAGE;
    isCorrectNickname = false;
    updateButtonState();
    return;
  }

  errorText.classList.remove('wrong-input');
  errorInput.classList.remove('wrong-input');
  errorText.textContent = '';
  isCorrectNickname = true;
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

function checkPasswordConfirm(e) {
  const WRONG_MESSAGE = "비밀번호가 일치하지 않습니다.";
  
  const inputValue = e.target.value.trim();

  const inputWrapper = e.target.closest('.input');
  const errorInput = inputWrapper.querySelector('.input-main');
  const errorText = inputWrapper.querySelector('.error-message');
  const passwordValue = passwordInput.value.trim();

  if(inputValue !== passwordValue){
    errorText.classList.add('wrong-input');
    errorInput.classList.add('wrong-input');
    errorText.textContent = WRONG_MESSAGE;
    isCorrectPasswordConfirm = false;
    updateButtonState();
    return;
  }

  errorText.classList.remove('wrong-input');
  errorInput.classList.remove('wrong-input');
  errorText.textContent = '';
  isCorrectPasswordConfirm = true;
  updateButtonState();
}

function changePasswordVisibility(e) {
  const visibilityOnImage = './img/ic_visibility_on.svg';
  const visibilityOffImage = './img/ic_visibility_off.svg';

  const visibilityButton = e.target;
  const input = visibilityButton.previousElementSibling;
  const inputType = input.type;

  if(inputType === 'password'){
    visibilityButton.src = visibilityOnImage;
    input.type = 'text';
  } else {
    visibilityButton.src = visibilityOffImage;
    input.type = 'password';    
  }
}

signupButton.addEventListener('click', () => {
  window.location.href = './login.html';
})

emailInput.addEventListener('focusout', checkEmail);
nicknameInput.addEventListener('focusout', checkNickname);
passwordInput.addEventListener('focusout', checkPassword);
passwordConfirmInput.addEventListener('focusout', checkPasswordConfirm);
visibilityButtons.forEach(button => button.addEventListener('click', changePasswordVisibility));
updateButtonState();