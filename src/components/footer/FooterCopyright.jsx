export default function FooterCopyright({ children, className }) {
  return (
    <span
      className={`text-gray-400 font-pretendard text-base leading-4.75 ${className}`}
    >
      {children}
    </span>
  );
}
