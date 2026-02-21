export default function SubmitBtn({ children, disabled }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="w-full py-3 bg-primary text-gray-100 rounded-[40px] font-semibold text-xl leading-8 disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
}
