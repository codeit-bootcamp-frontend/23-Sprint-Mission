export default function HeaderLayout({ children, maxWidth }) {
  return (
    <header className="sticky top-0 z-1000 bg-white border-b border-[#DFDFDF] h-17.5 px-4">
      <div
        className="flex justify-between items-center h-full lg:mx-auto"
        style={{ maxWidth: maxWidth }}
      >
        {children}
      </div>
    </header>
  );
}
