import Header from "@/components/layout/Header/Header";
import TodoDetailForm from "@/components/todo/TodoDetailForm/TodoDetailForm";
import { getTodo } from "@/lib/api/todo";
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

  const todo = await getTodo(Number(itemId)).catch(() => null);

  if (!todo) {
    notFound();
  }

  return (
    <main className={styles.page}>
      <Header />

      <section className={styles.inner}>
        <TodoDetailForm todo={todo} />
      </section>
    </main>
  );
}
