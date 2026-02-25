import { useState } from "react";
import { useSearchParams } from "react-router";

// Imges
import sortBtn from "../../assets/btn/btn_sort.svg";
import arrowDown from "../../assets/icons/ic_arrow_down.svg";

// Components
import SelectModal from "./SelectModal";

const OPTIONS = [
  { label: "최신순", value: "recent" },
  { label: "좋아요순", value: "favorite" },
];

export default function ItemSortBtn() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentOrder = searchParams.get("orderBy") || "recent";

  const selectedLabel =
    OPTIONS.find((option) => option.value === currentOrder)?.label || "최신순";

  const handleSortChange = (newOrder) => {
    searchParams.set("orderBy", newOrder);
    searchParams.set("page", "1");
    setSearchParams(searchParams);
    setIsOpen(false);
  };

  return (
    <div className="shrink-0 relative">
      <MobileSortBtn onClick={() => setIsOpen(!isOpen)} />

      <LargeSortBtn
        onClick={() => setIsOpen(!isOpen)}
        selected={selectedLabel}
      />

      {isOpen && (
        <SelectModal
          options={OPTIONS}
          selected={currentOrder}
          onSelect={handleSortChange}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
}

const MobileSortBtn = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="md:hidden flex items-center justify-center"
    >
      <img src={sortBtn} alt="정렬 아이콘" />
    </button>
  );
};

const LargeSortBtn = ({ onClick, selected }) => {
  return (
    <button
      onClick={onClick}
      className="hidden md:flex items-center justify-between gap-2 h-10.5 px-4 bg-white border border-gray-200 rounded-xl min-w-30 transition-all hover:bg-gray-50 cursor-pointer"
    >
      <span className="hidden md:block text-[14px] font-medium text-gray-800">
        {selected}
      </span>
      <img src={arrowDown} alt="" className="hidden md:block w-4 h-4" />
    </button>
  );
};
