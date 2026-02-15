export default function HeaderLayout({ children }) {
  return (
    <header className="border-b border-[#DFDFDF] h-17.5">
      <div className="flex justify-between items-center pt-2.5 px-4 md:px-6 max-w-280 mx-auto">
        {children}
      </div>
    </header>
  );
}
