import { useSearchParams, useNavigate } from "react-router";

// Imges
import SearchIcon from "../../assets/icons/ic_search.svg";

export default function ItemSearchInput() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentOrderBy = searchParams.get("orderBy") || "recent";

  const handleSearchAction = (formData) => {
    const keyword = formData.get("keyword");

    navigate(`/items?keyword=${keyword || ""}&orderBy=${currentOrderBy}`);
  };

  return (
    <form
      action={handleSearchAction}
      className="relative w-full md:w-60.5 lg:w-81.25"
    >
      <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <img src={SearchIcon} alt="검색" />
      </div>

      <input
        type="text"
        name="keyword"
        placeholder="검색할 상품을 입력해주세요"
        className="pl-11 pr-4 w-full h-10.5 bg-gray-100 rounded-xl text-[16px] text-gray-800 outline-none"
      />
    </form>
  );
}
