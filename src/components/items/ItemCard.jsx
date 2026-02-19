// Imges
import HeartIcon from "../../assets/icons/ic_heart.svg";

const ITEM_WIDTHS = {
  ALL: "shrink-0 w-[calc(46%-8px)] md:w-[calc(30%-10.7px)] lg:w-[calc(20%-12.8px)]",
  BEST: "shrink-0 w-[90%] md:w-[calc(47%-10.7px)] lg:w-[calc(25%-12.8px)]",
};

export default function ItemCard({ itemList, label }) {
  const isAllProducts = label === "전체 상품";
  const itemWidth = isAllProducts ? ITEM_WIDTHS.ALL : ITEM_WIDTHS.BEST;

  const half = Math.ceil(itemList.length / 2);
  const rows = isAllProducts
    ? [itemList.slice(0, half), itemList.slice(half)]
    : [itemList];

  return (
    <div className="overflow-x-auto no-scrollbar">
      <div className="flex flex-col gap-y-6">
        {rows.map((rowItems, i) => (
          <ProductRow key={i} items={rowItems} widthClass={itemWidth} />
        ))}
      </div>
    </div>
  );
}

const ProductRow = ({ items, widthClass }) => (
  <div className="flex gap-x-4">
    {items.map((item) => (
      <div key={item.id} className={widthClass}>
        <Item {...item} />
      </div>
    ))}
  </div>
);

const Item = ({ images, name, price, favoriteCount }) => (
  <div className="group cursor-pointer flex flex-col h-full">
    <ProductImage src={images?.[0]} alt={name} />
    <div className="flex flex-col grow">
      <ProductInfo name={name} price={price} />
      <ProductStats count={favoriteCount} />
    </div>
  </div>
);

const ProductImage = ({ src, alt }) => (
  <div className="aspect-square overflow-hidden rounded-xl border border-gray-100">
    <img src={src} alt={alt} className="w-full h-full object-cover" />
  </div>
);

const ProductInfo = ({ name, price }) => (
  <div className="flex flex-col gap-1 mt-1">
    <h3 className="text-[14px] leading-6 font-medium text-gray-800 truncate">
      {name}
    </h3>
    <p className="text-gray-800 text-[16px] leading-6 font-bold">
      {price?.toLocaleString()}원
    </p>
  </div>
);

const ProductStats = ({ count }) => (
  <div className="flex items-center gap-1 text-[12px] text-gray-500 mt-1">
    <img src={HeartIcon} alt="좋아요 아이콘" />
    <span>{count}</span>
  </div>
);
