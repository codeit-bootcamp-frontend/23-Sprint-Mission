export default function SubmitBtn({ children, disabled, className }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={` bg-primary disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}
