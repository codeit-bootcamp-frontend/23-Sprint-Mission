'use client';
import { useEffect, useState } from 'react';
import TodoItem from './todo-item';
import updateItem from '@/src/api/update-item';
import Image from 'next/image';
import Empty from './empty';

interface ItemListProps {
  initialItems: {
    isCompleted: boolean;
    name: string;
    id: number;
  }[];
}

export default function ItemList({ initialItems }: ItemListProps) {
  const [items, setItems] = useState(initialItems);

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const doneItems = items.filter((item) => {
    return item.isCompleted;
  });

  const todoItems = items.filter((item) => {
    return !item.isCompleted;
  });

  async function handleToggle(id: number, isCompleted: boolean) {
    setItems((_items) => {
      return _items.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            isCompleted: !isCompleted,
          };
        }
        return item;
      });
    });
    const res = await updateItem(id, { isCompleted: !isCompleted });
    console.log(res);
  }

  return (
    <div className="flex gap-6 mt-10">
      <div className="flex-1">
        <Image
          className="mb-4"
          alt="todo"
          src="/images/todo.svg"
          width="101"
          height="36"
        />
        <div className="flex flex-col gap-4">
          {todoItems.map(({ isCompleted, name, id }) => {
            return (
              <TodoItem
                key={id}
                isCompleted={isCompleted}
                name={name}
                id={id}
                onClick={handleToggle}
              />
            );
          })}
        </div>
      </div>
      <div className="flex-1">
        <Image
          className="mb-4"
          alt="done"
          src="/images/done.svg"
          width="97"
          height="36"
        />
        <div className="flex flex-col gap-4">
          {doneItems.map(({ isCompleted, name, id }) => {
            return (
              <TodoItem
                key={id}
                isCompleted={isCompleted}
                name={name}
                id={id}
                onClick={handleToggle}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
