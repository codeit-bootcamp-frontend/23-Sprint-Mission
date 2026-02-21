// Imges
import GoogleIcon from "../../assets/icons/ic_google.svg";
import kakaoIcon from "../../assets/icons/ic_kakao.svg";

export default function SocialLogin() {
  return (
    <div className="flex items-center justify-between px-5.75 py-3.5 bg-[#E6F2FF] rounded-lg">
      <span className="font-medium text-base leading-6.5 text-gray-800">
        간편 로그인하기
      </span>
      <div className="flex gap-4">
        <a href="https://google.com">
          <img src={GoogleIcon} alt="구글" className="w-10.5 h-10.5" />
        </a>
        <a href="https://kakao.com">
          <img src={kakaoIcon} alt="카카오" className="w-10.5 h-10.5" />
        </a>
      </div>
    </div>
  );
}
