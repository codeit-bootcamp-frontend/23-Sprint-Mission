export default function PrimaryBtn({ children, className }) {
  return (
    <button
      className={`bg-primary text-white rounded-lg text-[16px] leading-6.5 font-semibold ${className}`}
    >
      {children}
    </button>
  );
}
