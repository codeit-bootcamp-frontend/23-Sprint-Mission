document.addEventListener("DOMContentLoaded", () => {
  // 각 필드의 유효성 검사 상태를 저장하는 전역 변수
  let isEmailValid = false;
  let isPasswordValid = false;
  let isNicknameValid = false;
  let isPasswordConfirmationValid = false;

  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");
  const emailInput = document.getElementById("email");
  const nicknameInput = document.getElementById("nickname");
  const passwordInput = document.getElementById("password");
  const passwordConfirmationInput = document.getElementById("password-check");
  const submitButton = document.querySelector(
    '.login-page form button[type="submit"]',
  );
  console.log(emailInput);

  // 에러 메시지를 보여주고 잘못 입력된 input을 빨간 테두리로 표시하는 폼 유효성 검사용 에러 표시 함수
  function showError(input, errorId) {
    const errorElement = document.getElementById(errorId);
    errorElement.style.display = "block";
    input.style.border = "1px solid #f74747";
  }
  // 에러 메시지를 숨기고 input을 정상 상태처럼 보이게 만드는 에러 해제(리셋) 함수
  function hideError(input, errorId) {
    const errorElement = document.getElementById(errorId);
    errorElement.style.display = "none";
    input.style.border = "none";
  }
  //이메일 형식을 검사하는 정규식
  function EmailString(email) {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  }

  // 이메일 칸 emailInput 쪽 속성 trim 활용 (값 가져오기), 위에 만들어 놓은 ShowError 함수, hideError 함수를 if문에 활용
  function checkEmail() {
    const emailValue = emailInput.value.trim();

    //검사 시작 전에 ✔ 이메일 상태를 무조건 false로 초기화 ✔ 모든 에러 메시지 숨김
    isEmailValid = false;
    hideError(emailInput, "emailEmptyError");
    hideError(emailInput, "emailInvalidError");

    //아무것도 입력 안 했으면 → “이메일을 입력해주세요” 에러 표시
    if (!emailValue) {
      showError(emailInput, "emailEmptyError");
      //(else if) 값은 있지만 이메일 형식이 아니면 → “이메일 형식이 올바르지 않습니다” 에러 표시
    } else if (!EmailString(emailValue)) {
      showError(emailInput, "emailInvalidError");
      //모든 조건 통과 유효 상태 true 에러 완전 제거
    } else {
      isEmailValid = true;
      hideError(emailInput, "emailEmptyError");
      hideError(emailInput, "emailInvalidError");
    }

    updateButtonState();
  }

  // 닉네임 유효성 검사
  function checkNicknameValidity() {
    const nicknameValue = nicknameInput.value.trim();
    isNicknameValid = false;
    hideError(nicknameInput, "nicknameEmptyError");

    if (!nicknameValue) {
      showError(nicknameInput, "nicknameEmptyError");
    } else {
      isNicknameValid = true;
      hideError(emailInput, "nicknameEmptyError");
    }
    updateButtonState();
  }
  // 비밀번호 유효성 검사
  function checkPassword() {
    const passwordValue = passwordInput.value.trim();

    isPasswordValid = false;

    hideError(passwordInput, "passwordEmptyError");
    hideError(passwordInput, "passwordInvalidError");

    if (!passwordValue) {
      showError(passwordInput, "passwordEmptyError");
    } else if (passwordValue.length < 8) {
      showError(passwordInput, "passwordInvalidError");
    } else {
      isPasswordValid = true;
    }

    updateButtonState();

    if (signupForm) {
      checkPasswordConfirmation();
    }
  }
  // 비밀번호 확인 필드의 유효성 검사
  function checkPasswordConfirmation() {
    const confirmValue = passwordConfirmationInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    isPasswordConfirmationValid = false;

    // 에러 초기화
    hideError(passwordConfirmationInput, "passwordConfirmationError");
    hideError(passwordConfirmationInput, "passwordConfirmationInitError");

    if (!isPasswordValid) {
      showError(passwordConfirmationInput, "passwordConfirmationInitError");
      return;
    } else if (!confirmValue || confirmValue !== passwordValue) {
      showError(passwordConfirmationInput, "passwordConfirmationError");
      return;
    }

    // 정상
    isPasswordConfirmationValid = true;

    updateButtonState();
  }

  function updateButtonState() {
    // 기본 조건: 이메일 + 비밀번호가 유효해야 함
    let isFormValid = isEmailValid && isPasswordValid;

    // 회원가입 페이지인 경우
    // 닉네임 + 비밀번호 확인까지 추가 검사
    if (signupForm) {
      isFormValid =
        isFormValid && isNicknameValid && isPasswordConfirmationValid;
    }

    // 모든 조건이 true일 때만 버튼 활성화
    submitButton.disabled = !isFormValid;
  }

  // 이메일 입력 필드
  // 포커스를 벗어날 때 유효성 검사
  if (emailInput) {
    emailInput.addEventListener("focusout", checkEmail);
  }

  // 비밀번호 입력 필드
  // 입력 중 실시간으로 유효성 검사
  if (passwordInput) {
    passwordInput.addEventListener("input", checkPassword);
  }

  // 닉네임 입력 필드
  // 입력 완료 후 유효성 검사
  if (nicknameInput) {
    nicknameInput.addEventListener("focusout", checkNicknameValidity);
  }

  // 비밀번호 확인 입력 필드
  // 입력 중 비밀번호와 일치 여부 검사
  if (passwordConfirmationInput) {
    passwordConfirmationInput.addEventListener(
      "input",
      checkPasswordConfirmation,
    );
  }

  // 페이지 최초 로드 시
  // 초기 상태에 맞게 버튼 비활성화
  updateButtonState();

  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault(); 
      window.location.href = "../html/item.html";
    });
  }

  if (signupForm) {
    signupForm.addEventListener("submit", function (event) {
      event.preventDefault();
      window.location.href = "../html/login.html";
    });
  }

  // 비밀번호 보이기 / 숨기기 토글 함수
  function togglePasswordVisibility(event) {
    // 클릭한 눈 아이콘(img)
    const toggleIcon = event.currentTarget;

    // 같은 영역의 비밀번호 input 찾기
    const inputField = toggleIcon
      .closest(".input-group-password")
      .querySelector("input");

    // 현재 비밀번호 표시 상태 확인
    const isPasswordVisible = inputField.type === "text";

    // 비밀번호 타입 토글
    inputField.type = isPasswordVisible ? "password" : "text";

    // 아이콘 이미지 변경
    toggleIcon.src = isPasswordVisible
      ? "../images/icon-close-eye.png" // 다시 가리기
      : "../images/icon-open-eye.png"; // 보이기

    toggleIcon.alt = isPasswordVisible ? "비밀번호 가림" : "비밀번호 보임";
  }

  //   페이지 내 모든 비밀번호 토글 버튼에 이벤트 연결
  // - 회원가입 / 로그인 페이지처럼
  //   동일한 기능의 버튼이 여러 개 있을 수 있으므로 class 선택자 사용
  const toggleButtons = document.querySelectorAll(".password-image");

  toggleButtons.forEach((icon) => {
    icon.addEventListener("click", togglePasswordVisibility);
  });
});
