import Header from "@/components/layout/Header/Header";
import { notFound } from "next/navigation";
import styles from "./page.module.css";

interface ItemDetailPageProps {
  params: Promise<{
    itemId: string;
  }>;
}

export default async function ItemDetailPage({ params }: ItemDetailPageProps) {
  const { itemId } = await params;

  if (!/^\d+$/.test(itemId)) {
    notFound();
  }

  return (
    <main className={styles.page}>
      <Header />

      <section className={styles.inner}>
        <p className={styles.status}>할 일 상세 페이지를 준비 중입니다.</p>
      </section>
    </main>
  );
}
