interface Article {
  id: number;
  title: string;
  content: string;
  image: string;
  likeCount: number;
  writer: { id: number; nickname: string };
  createdAt: string;
  updatedAt: string;
}

interface ArticleData {
  list: Article[];
  totalCount: number;
}
