export default function HeaderLayout({ children }) {
  return (
    <header className="sticky top-0 z-1000 bg-white border-b border-[#DFDFDF] h-17.5">
      <div className="flex justify-between items-center h-full px-4 md:px-6 max-w-280 mx-auto">
        {children}
      </div>
    </header>
  );
}
