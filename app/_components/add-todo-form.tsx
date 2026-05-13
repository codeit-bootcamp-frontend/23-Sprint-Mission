import Button from "@/src/components/button";
import Search from "./search";
import PlusIcon from "@/public/icons/ic_plus.svg";
import createItem from "@/src/api/create-item";
import { revalidatePath } from "next/cache";

export default function AddTodoForm({ className }: {
  className: string
}) {
  async function addTodo(formData: FormData) {
    'use server';

    const name = formData.get('name') as string;

    if (!name.trim()) {
      throw new Error('값이 존재하지 않습니다');
    }

    const res = await createItem({ name });
    console.log(res);
    
    revalidatePath("/");
  }

  return (
    <form className={className} action={addTodo}>
      <Search
        className="w-full flex-1"
        type="text"
        placeholder="할 일을 입력해주세요"
        name="name"
      />
      <Button variant="add" className="flex items-center">
        <PlusIcon />
        추가하기
      </Button>
    </form>
  )
}