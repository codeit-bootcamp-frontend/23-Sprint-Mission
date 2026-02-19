export default function FooterContainer({ children }) {
  return (
    <div className="flex flex-wrap items-center justify-between w-full max-w-280 px-8 md:justify-around lg:justify-between lg:px-6">
      {children}
    </div>
  );
}
