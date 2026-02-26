// Imges
import HeartIcon from "../../assets/icons/ic_heart.svg";

export default function ItemCard({ itemList, label }) {
  const isBest = label === "베스트 상품";

  return (
    <section className="w-full">
      <div
        className={`grid gap-y-6 md:gap-y-10 gap-x-2 md:gap-x-4 ${
          isBest
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
            : "grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
        }`}
      >
        {itemList.map((item) => (
          <div key={item.id} className="w-full">
            <Item {...item} isBest={isBest} />
          </div>
        ))}
      </div>
    </section>
  );
}

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
