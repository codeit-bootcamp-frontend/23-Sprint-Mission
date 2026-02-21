export default function SelectModal({ options, onSelect, setIsOpen }) {
  return (
    <>
      <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />

      <ul className="absolute right-0 mt-2 w-full min-w-30 bg-white border border-gray-100 rounded-xl shadow-lg z-20 overflow-hidden">
        {options.map((option) => (
          <li key={option.value}>
            <button
              className="w-full px-4 py-3 text-sm text-left hover:bg-gray-50 transition-colors"
              onClick={() => onSelect(option.value)}
            >
              {option.label}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
