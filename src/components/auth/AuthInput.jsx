import { useState } from "react";

// Imges
import openedEye from "../../assets/btn/btn_visibility_on_24px.svg";
import closedEye from "../../assets/btn/btn_visibility_off_24px.svg";

export default function AuthInput({
  id,
  label,
  type = "text",
  error,
  ...props
}) {
  const [isVisible, setIsVisible] = useState(false);
  const isPasswordType = type === "password";

  return (
    <div className="flex flex-col w-full">
      <label
        htmlFor={id}
        className="font-bold text-lg leading-6.5 text-gray-800 mb-4 text-left"
      >
        {label}
      </label>

      <div className="relative w-full flex flex-col">
        <div className="relative w-full flex">
          <input
            id={id}
            type={isPasswordType ? (isVisible ? "text" : "password") : type}
            className={`w-full px-6 py-3.75 rounded-xl bg-gray-100 text-base leading-6.5 text-gray-800 outline-none transition-all
              ${isPasswordType ? "pr-14" : ""} 
              ${error ? "outline-1 outline-[#f74747] ring-1 ring-[#f74747]" : "focus:ring-2 focus:ring-primary/50"}`}
            {...props}
          />

          {isPasswordType && (
            <PasswordEye isVisible={isVisible} setIsVisible={setIsVisible} />
          )}
        </div>

        {error && <ErrMsg message={error} />}
      </div>
    </div>
  );
}

const PasswordEye = ({ isVisible, setIsVisible }) => {
  return (
    <button
      type="button"
      onClick={() => setIsVisible(!isVisible)}
      className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer z-10"
    >
      <img
        src={isVisible ? openedEye : closedEye}
        alt={isVisible ? "비밀번호 숨기기" : "비밀번호 보이기"}
      />
    </button>
  );
};

const ErrMsg = ({ message }) => {
  return (
    <span className="font-semibold text-sm leading-6 mt-2.5 pl-4 text-[#f74747] text-left">
      {message}
    </span>
  );
};
