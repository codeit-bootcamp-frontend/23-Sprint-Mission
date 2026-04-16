import { IconProps } from "@/libs/types/icon";

const CheckBoxDefault = ({
  size = 32,
  className = "",
  strokeColor = "#0F172A",
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle
      cx="16"
      cy="16"
      r="15"
      fill="#FEFCE8"
      stroke={strokeColor}
      strokeWidth="2"
    />
  </svg>
);

const CheckBoxChecked = ({
  size = 32,
  className = "",
  strokeColor = "#FEFCE8",
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="16" cy="16" r="16" fill="#7C3AED" />

    <path
      d="M23 11L14 20L9 15"
      stroke={strokeColor}
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export { CheckBoxDefault, CheckBoxChecked };
