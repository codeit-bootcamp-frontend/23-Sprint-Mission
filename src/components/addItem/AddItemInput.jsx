export default function AddItemInput({
  id,
  label,
  type = "text",
  className,
  ...props
}) {
  const isTextArea = type === "textarea";

  return (
    <section className="flex flex-col gap-4">
      <label
        htmlFor={id}
        className="text-[18px] leading-[100%] font-bold text-gray-800 w-fit"
      >
        {label}
      </label>
      {isTextArea ? (
        <textarea
          id={id}
          name={id}
          {...props}
          className={`
          px-6 py-4 bg-gray-100 rounded-xl outline-none 
          text-[16px] leading-6.5 text-gray-800 resize-none ${className}
        `}
        />
      ) : (
        <input
          type={type}
          name={id}
          id={id}
          {...props}
          className={`px-6 py-4 bg-gray-100 rounded-xl outline-none text-[16px] leading-6.5 text-gray-800 ${className}`}
        />
      )}
    </section>
  );
}
