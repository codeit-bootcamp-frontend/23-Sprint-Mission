"use client";

import Header from "@/components/layout/Header/Header";
import EmptyState from "@/components/todo/EmptyState/EmptyState";
import TodoForm from "@/components/todo/TodoForm/TodoForm";
import TodoSection from "@/components/todo/TodoSection/TodoSection";
import useTodos from "@/hooks/useTodos";
import styles from "./page.module.css";

export default function HomePage() {
  const {
    todoItems,
    doneItems,
    isLoading,
    isCreating,
    error,
    handleCreateTodo,
    handleToggleTodo,
  } = useTodos();

  return (
    <main className={styles.page}>
      <Header />

      <section className={styles.inner}>
        <TodoForm onSubmit={handleCreateTodo} isSubmitting={isCreating} />

        {error ? <p className={styles.error}>{error}</p> : null}

        {isLoading ? (
          <p className={styles.loading}>불러오는 중...</p>
        ) : (
          <div className={styles.grid}>
            <div className={styles.column}>
              {todoItems.length > 0 ? (
                <TodoSection
                  title="TO DO"
                  variant="todo"
                  items={todoItems}
                  onToggle={handleToggleTodo}
                />
              ) : (
                <>
                  <div className={styles.todoTitle}>TO DO</div>
                  <EmptyState type="todo" />
                </>
              )}
            </div>

            <div className={styles.column}>
              {doneItems.length > 0 ? (
                <TodoSection
                  title="DONE"
                  variant="done"
                  items={doneItems}
                  onToggle={handleToggleTodo}
                />
              ) : (
                <>
                  <div className={styles.doneTitle}>DONE</div>
                  <EmptyState type="done" />
                </>
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
