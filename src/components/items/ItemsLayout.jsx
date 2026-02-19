export default function ItemsLayout({ children }) {
  return (
    <main className="py-6 px-4 md:py-10 md:px-6 lg:px-0 lg:py-10 max-w-300 mx-auto space-y-6 lg:space-y-10">
      {children}
    </main>
  );
}
