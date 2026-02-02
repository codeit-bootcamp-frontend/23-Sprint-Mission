const emailInput = document.getElementById('user-email');
const pwInput = document.getElementById('user-pw');
const emailError = document.getElementById('email-error');
const pwError = document.getElementById('pw-error');
const loginBtn = document.querySelector('.login-login-btn');
const pwToggleBtn = document.querySelector('.login-toggle');
const pwToggleImg = pwToggleBtn.querySelector('img');

const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/;

function updateButtonState() { 
    const emailValue = emailInput.value.trim();
    const pwValue = pwInput.value.trim();

    const isEmailValid = emailRegex.test(emailValue);
    const isPwValid = pwValue.length >= 8;

    loginBtn.classList.toggle('active', isEmailValid && isPwValid);
};

emailInput.addEventListener('input', updateButtonState);
pwInput.addEventListener('input', updateButtonState);

emailInput.addEventListener('blur', () => {
    const value = emailInput.value.trim();

    emailError.textContent = '';
    emailError.style.display = 'none';
    emailInput.classList.remove('input-error');

    if (!value) {
        emailError.textContent = '이메일을 입력해주세요.';
    } else if (!emailRegex.test(value)) {
        emailError.textContent = '잘못된 이메일입니다.';
    }

    if (emailError.textContent) {
        emailError.style.display = 'block';
        emailInput.classList.add('input-error');
    }
});

pwInput.addEventListener('blur', () => {
    const value = pwInput.value.trim();

    pwError.textContent = '';
    pwError.style.display = 'none';

    if (!value) {
        pwError.textContent = '비밀번호를 입력해주세요.';
    } else if (value.length < 8) {
        pwError.textContent = '비밀번호를 8자 이상 입력해주세요';
    }

    if (pwError.textContent) {
        pwError.style.display = 'block';
        pwInput.classList.add('input-error');
    }

    updateButtonState();
});

pwInput.addEventListener('input', () => {
    pwInput.classList.remove('input-error');
    pwError.style.display = 'none';

    updateButtonState();
});

pwToggleBtn.addEventListener('click', () => {
    const isHidden = pwInput.type === 'password';

    pwInput.type = isHidden ? 'text' : 'password';

    pwToggleImg.src = isHidden
        ? 'images/sign_images/password-show.svg'
        : 'images/sign_images/password-hidden.svg';
});

loginBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if (!loginBtn.classList.contains('active')) return;

    window.location.href = 'items.html';
});