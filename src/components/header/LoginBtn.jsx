import LinkBtn from "../btns/LinkBtn";

const INDEX_BTN_STYLE = {
  width: "128px",
  height: "48px",
};

const OTHER_BTN_STYLE = {
  width: "88px",
  height: "42px",
};

export default function LoginBtn({ isMainPage }) {
  const currentStyle = isMainPage ? INDEX_BTN_STYLE : OTHER_BTN_STYLE;

  return (
    <LinkBtn
      href="/login"
      className="bg-primary flex items-center justify-center rounded-lg text-white font-semibold"
      style={{
        width: currentStyle.width,
        height: currentStyle.height,
      }}
    >
      로그인
    </LinkBtn>
  );
}
