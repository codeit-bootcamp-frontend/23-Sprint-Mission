const emailInput = document.querySelector(".inputs.email");
const typeEmailMsg = document.querySelector(".type-email-msg");
const wrongEmailMsg = document.querySelector(".wrong-email-msg");

emailInput.addEventListener("focusout", (e) => {
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
