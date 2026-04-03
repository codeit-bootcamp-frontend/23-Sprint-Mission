function shouldSkipValidation(relatedTarget) {
  return (
    relatedTarget?.closest(".easy-login") ||
    relatedTarget?.closest(".logo-link") ||
    relatedTarget?.closest(".footer-wrapper")
  );
}

export default shouldSkipValidation;
