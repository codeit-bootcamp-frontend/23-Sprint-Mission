import { useSearchParams } from "react-router";

// Imges
import SearchIcon from "../../assets/icons/ic_search.svg";

export default function ItemSearchInput() {
  const [searchParams, _] = useSearchParams();
  const currentOrderBy = searchParams.get("orderBy");

  return (
    <form action="/items" className="relative w-full md:w-60.5 lg:w-81.25">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <img src={SearchIcon} alt="검색" />
      </div>

      <input
        type="text"
        name="keyword"
        placeholder="검색할 상품을 입력해주세요"
        className="pl-11 pr-4 w-full h-10.5 bg-gray-100 rounded-xl text-[16px] text-gray-800 placeholder:text-gray-400 outline-none focus:ring-1 focus:ring-primary transition-all"
      />

      {currentOrderBy && <HiddenInput currentOrderBy={currentOrderBy} />}
    </form>
  );
}

const HiddenInput = ({ currentOrderBy }) => (
  <input type="hidden" name="orderBy" value={currentOrderBy} />
);
