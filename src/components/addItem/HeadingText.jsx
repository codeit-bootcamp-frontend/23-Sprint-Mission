const baseStyles = {
  1: "text-[20px] leading-[100%] font-bold text-gray-800",
  2: "text-[18px] font-bold text-gray-800",
};

export default function HeadingText({ level = 2, children, className = "" }) {
  const Tag = `h${level}`;

  return <Tag className={`${baseStyles[level]} ${className}`}>{children}</Tag>;
}
