import KebabIcon from "../../assets/icons/ic_kebab.svg";
import ProfileIcon from "../../assets/icons/ic_profile.svg";
import HeartIcon from "../../assets/icons/ic_heart.svg";

export default function ProductMain({ productData }) {
  const {
    images,
    name: title,
    price,
    description: desc,
    tags,
    ownerNickname: nickname,
    createdAt,
    favoriteCount,
  } = productData;

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-12 p-4 pb-6 md:pb-10 border-b border-gray-200">
      <Img images={images} title={title} />

      <div className="flex flex-col flex-1 justify-between min-h-full py-1">
        <div className="space-y-6 md:space-y-8">
          <TitleAndPrice title={title} price={price} />
          <Desc desc={desc} />
          <Tags tags={tags} />
        </div>

        <Profile
          createdAt={createdAt}
          nickname={nickname}
          favoriteCount={favoriteCount}
        />
      </div>
    </div>
  );
}

const Img = ({ images, title }) => (
  <div className="w-full md:w-1/2 max-w-121.5">
    <img
      src={images[0]}
      alt={title}
      className="w-full aspect-square object-cover rounded-xl border border-gray-100"
    />
  </div>
);

const TitleAndPrice = ({ title, price }) => (
  <div className="border-b border-gray-200 pb-4 md:pb-6">
    <div className="flex justify-between items-start mb-4">
      <h1 className="text-[20px] md:text-[24px] font-semibold text-gray-800 leading-tight">
        {title}
      </h1>
      <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
        <img src={KebabIcon} alt="더보기" className="w-6 h-6" />
      </button>
    </div>
    <span className="text-[28px] md:text-[32px] font-bold text-gray-900">
      {price.toLocaleString()}원
    </span>
  </div>
);

const Desc = ({ desc }) => (
  <section className="space-y-3">
    <Label label="상품 소개" />
    <p className="text-[14px] md:text-[16px] leading-[1.6] font-medium text-gray-600 whitespace-pre-wrap">
      {desc}
    </p>
  </section>
);

const Tags = ({ tags }) => (
  <section className="space-y-3">
    <Label label="상품 태그" />
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="px-3 py-1.5 text-sm md:text-base text-gray-500 bg-gray-100 rounded-full"
        >
          #{tag}
        </span>
      ))}
    </div>
  </section>
);

const Profile = ({ createdAt, nickname, favoriteCount }) => {
  const formattedDate = new Date(createdAt)
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\s/g, "")
    .slice(0, -1);

  return (
    <div className="flex items-center justify-between mt-8 border-gray-100">
      <div className="flex items-center gap-3">
        <img
          src={ProfileIcon}
          alt="프로필"
          className="w-10 h-10 md:w-12 md:h-12"
        />
        <div className="flex flex-col">
          <span className="text-sm md:text-base font-semibold text-gray-800">
            {nickname}
          </span>
          <span className="text-xs md:text-sm text-gray-400">
            {formattedDate}
          </span>
        </div>
      </div>

      <button className="flex flex-col items-center justify-center border border-gray-200 rounded-2xl px-4 py-2 hover:bg-gray-50 transition-all min-w-16 cursor-pointer">
        <img src={HeartIcon} alt="좋아요" className="w-6 h-6 mb-1" />
        <span className="text-[12px] font-medium text-gray-400 leading-none">
          {favoriteCount.toLocaleString() || 0}
        </span>
      </button>
    </div>
  );
};

const Label = ({ label }) => (
  <h2 className="text-[14px] md:text-[16px] font-bold text-gray-800">
    {label}
  </h2>
);
