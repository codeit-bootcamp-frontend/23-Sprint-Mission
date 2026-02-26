export default function SubmitBtn({ children, disabled, className }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`disabled:bg-gray-400 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}
