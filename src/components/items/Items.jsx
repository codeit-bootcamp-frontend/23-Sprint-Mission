// Components
import PrimaryBtn from "../btns/PrimaryBtn";
import ItemCard from "./ItemCard";
import ItemSortBtn from "./ItemSortBtn";

export default function Items({ label, itemData }) {
  const itemList = itemData?.list || [];
  const isAllProducts = label === "전체 상품";

  return (
    <section>
      <div className="flex flex-col mb-6 md:flex-row md:items-center md:justify-between md:gap-4">
        <div className="flex justify-between items-center mb-4 md:mb-0 md:shrink-0">
          <Label label={label} />

          {isAllProducts && (
            <div className="md:hidden">
              <RegistrationBtn />
            </div>
          )}
        </div>

        {isAllProducts && (
          <div className="flex items-center gap-2.5 md:flex-1 md:justify-end md:gap-4">
            <div className="flex-1 md:max-w-100">
              <SearchInput />
            </div>

            <div className="hidden md:block">
              <RegistrationBtn />
            </div>

            <ItemSortBtn />
          </div>
        )}
      </div>

      <ItemCard itemList={itemList} label={label} />
    </section>
  );
}

const Label = ({ label }) => (
  <h2 className="text-[20px] md:text-[24px] leading-8 font-bold text-gray-900">
    {label}
  </h2>
);

const SearchInput = () => (
  <div className="relative w-full">
    <input
      type="text"
      placeholder="검색할 상품을 입력해주세요"
      className="px-4 w-full h-10.5 bg-gray-100 rounded-xl text-[16px] text-gray-800 placeholder:text-gray-400 outline-none focus:ring-1 focus:ring-primary transition-all"
    />
  </div>
);

const RegistrationBtn = () => (
  <PrimaryBtn className="w-33.25 h-10.5">상품 등록하기</PrimaryBtn>
);
