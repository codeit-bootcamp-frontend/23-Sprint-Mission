export default function MainLayout({ children }) {
  return (
    <main className="px-6 py-12 flex flex-col items-center justify-center space-y-20 lg:space-y-40">
      {children}
    </main>
  );
}
