// Components
import LinkBtn from "../btns/LinkBtn";
import ItemCard from "./ItemCard";
import ItemSearchInput from "./ItemSearchInput";
import ItemSortBtn from "./ItemSortBtn";

export default function Items({ label, itemData }) {
  const itemList = itemData?.list || [];
  const isAllProducts = label === "전체 상품";

  return (
    <section>
      <div className="flex flex-col mb-6 md:flex-row md:items-center md:justify-between md:gap-4">
        <div className="flex justify-between items-center mb-4 md:mb-0 md:shrink-0">
          <Label label={label} />

          {isAllProducts && <RegistrationBtn className="md:hidden" />}
        </div>

        {isAllProducts && (
          <div className="flex items-center gap-2.5 md:flex-1 md:justify-end md:gap-4">
            <ItemSearchInput />

            <RegistrationBtn className="hidden md:flex" />

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

const RegistrationBtn = ({ className }) => (
  <LinkBtn
    href="/additem"
    className={`w-33.25 h-10.5 bg-primary rounded-lg text-[16px] ${className}`}
  >
    상품 등록하기
  </LinkBtn>
);
