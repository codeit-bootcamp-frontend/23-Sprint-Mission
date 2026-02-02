const emailInput = document.getElementById('user-email');
const nameInput = document.getElementById('user-name');
const pwInput = document.getElementById('user-pw-check');
const pwConfirmInput = document.getElementById('user-pw');

const emailError = document.getElementById('email-error');
const nameError = document.getElementById('name-error');
const pwError = document.getElementById('pw-error');
const pwConfirmError = document.getElementById('pw-confirm-error');
const toggleButtons = document.querySelectorAll('.signup-toggle');

const signupBtn = document.querySelector('.signup-btn');

const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/;

function updateButtonState() {
    const hasError =
        emailInput.classList.contains('input-error') ||
        nameInput.classList.contains('input-error') ||
        pwInput.classList.contains('input-error') ||
        pwConfirmInput.classList.contains('input-error');

    const hasEmptyValue =
        emailInput.value.trim() === '' ||
        nameInput.value.trim() === '' ||
        pwInput.value.trim() === '' ||
        pwConfirmInput.value.trim() === '';

    if (!hasError && !hasEmptyValue) {
        signupBtn.classList.add('active');
    } else {
        signupBtn.classList.remove('active');
    }
};

emailInput.addEventListener('blur', () => {
    const value = emailInput.value.trim();

    if (!value) {
        emailError.textContent = '이메일을 입력해주세요.';
        emailInput.classList.add('input-error');
    } else if (!emailRegex.test(value)) {
        emailError.textContent = '잘못된 이메일입니다.';
        emailInput.classList.add('input-error');
    } else {
        emailError.style.visibility = 'hidden';
        emailInput.classList.remove('input-error');
    }

    updateButtonState();
});

nameInput.addEventListener('blur', () => {
    if (!nameInput.value.trim()) {
        nameError.textContent = '닉네임을 입력해주세요.';
        nameInput.classList.add('input-error');
    } else {
        nameError.textContent = '';
        nameInput.classList.remove('input-error');
    }

    updateButtonState();
});

pwInput.addEventListener('blur', () => {
    if (!pwInput.value) {
        pwError.textContent = '비밀번호를 입력해주세요.';
        pwInput.classList.add('input-error');
    } else if (pwInput.value.length < 8) {
        pwError.textContent = '비밀번호를 8자 이상 입력해주세요.';
        pwInput.classList.add('input-error');
    } else {
        pwError.textContent = '';
        pwInput.classList.remove('input-error');
    }

    updateButtonState();
});

pwConfirmInput.addEventListener('blur', () => {
    if (!pwConfirmInput.value) {
        pwConfirmError.textContent = '비밀번호를 다시 입력해주세요';
        pwConfirmInput.classList.add('input-error');
    } else if (pwConfirmInput.value !== pwInput.value) {
        pwConfirmError.textContent = '비밀번호가 일치하지 않습니다.';
        pwConfirmInput.classList.add('input-error');
    } else {
        pwConfirmError.textContent = '';
        pwConfirmInput.classList.remove('input-error');
    }

    updateButtonState();
});

toggleButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        const input = btn.previousElementSibling;
        const img = btn.querySelector('img');

        if (input.type === 'password') {
            input.type = 'text';
            img.src = 'images/sign_images/password-show.svg';
        } else {
            input.type = 'password';
            img.src = 'images/sign_images/password-hidden.svg';
        }
    });
});

signupBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if (!signupBtn.classList.contains('active')) return;

    window.location.href = 'login.html';
});