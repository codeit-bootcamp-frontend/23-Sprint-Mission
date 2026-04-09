import { getArticles } from "@/libs/apis/boards";
import BestBoards from "@/components/boards/BestBoards";

export default async function BoardPage() {
  const [bestData, recentData] = await Promise.all([
    getArticles({ pageSize: 3, orderBy: "like" }),
    getArticles({ pageSize: 10, orderBy: "recent" }),
  ]);

  return (
    <>
      <BestBoards bestData={bestData} />
    </>
  );
}
