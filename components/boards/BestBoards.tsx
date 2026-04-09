import Image from "next/image";
import MedalIcon from "@/assets/icons/MedalIcon";
import Title from "@/components/common/Title";
import HeartIcon from "@/assets/icons/HeartIcon";

type BestContentProps = Pick<Article, "title" | "image">;
type BestInfoProps = Pick<Article, "writer" | "likeCount" | "createdAt">;

interface BestArticleCardProps {
  article: Article;
  index: number;
}

export default function BestBoards({ bestData }: { bestData: ArticleData }) {
  return (
    <section className="space-y-4 md:space-y-6">
      <Title text="베스트 게시글" />

      <BestArticle bestData={bestData} />
    </section>
  );
}

const BestArticle = ({ bestData }: { bestData: ArticleData }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
    {bestData.list.map((article, index) => (
      <BestArticleCard key={article.id} article={article} index={index} />
    ))}
  </div>
);

const BestArticleCard = ({ article, index }: BestArticleCardProps) => (
  <div
    className={`
      flex-col gap-3 bg-gray-50 p-4 rounded-2xl
      ${index >= 1 ? "hidden md:flex" : "flex"} 
      ${index >= 2 ? "md:hidden lg:flex" : ""}   
    `}
  >
    <BestBadge />
    <BestContent title={article.title} image={article.image} />
    <BestInfo
      writer={article.writer}
      likeCount={article.likeCount}
      createdAt={article.createdAt}
    />
  </div>
);

const BestBadge = () => (
  <div className="flex items-center gap-1 bg-primary/10 w-fit px-2 py-1 rounded-full">
    <MedalIcon size={16} />
    <span className="text-xs font-bold text-primary">Best</span>
  </div>
);

const BestContent = ({ title, image }: BestContentProps) => (
  <div className="flex justify-between gap-4">
    <p className="text-base-20 text-gray-800 font-semibold">{title}</p>
    {image && <Image src={image} alt={title} width={72} height={72} />}
  </div>
);

const BestInfo = ({ writer, likeCount, createdAt }: BestInfoProps) => (
  <div className="flex justify-between items-center text-base-14 text-gray-600">
    <div className="flex items-center">
      <span className="font-medium text-gray-700 mr-2">{writer.nickname}</span>
      <HeartIcon className="mr-1" />
      <span>{likeCount >= 9999 ? "9999+" : likeCount}</span>
    </div>

    <span className="text-gray-400">
      {createdAt.split("T")[0].replace(/-/g, ".")}
    </span>
  </div>
);
