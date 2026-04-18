import AddTodoForm from "./_components/add-todo-form";
import getItems from "@/src/api/get-items";
import ItemList from "./_components/item-list";

export default async function Home() {
  const items = await getItems({ pageSize: 100 });

  return (
    <main className="container">
      <div className="mt-6">
        <AddTodoForm className="flex gap-4" />
      </div>
      <ItemList initialItems={items} />
    </main>
  )
}