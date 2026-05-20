import Image from 'next/image';

interface EmptyProps {
  variant: 'todo' | 'done';
}

export default function Empty({ variant }: EmptyProps) {
  const textClass = 'text-16-bold text-slate-400 text-center';

  if (variant === 'todo')
    return (
      <div className="mt-16">
        <Image
          src="/images/empty_todo.svg"
          width={240}
          height={240}
          className="mx-auto"
          alt="emptyTodo"
        />
        <p className={textClass}>
          할 일이 없어요.
          <br />
          TODO를 새롭게 추가해주세요!
        </p>
      </div>
    );

  return (
    <div className="mt-16">
      <Image
        src="/images/empty_done.svg"
        width={240}
        height={240}
        className="mx-auto"
        alt="emptyDone"
      />
      <p className={textClass}>
        아직 다 한 일이 없어요.
        <br />
        해야 할 일을 체크해보세요!
      </p>
    </div>
  );
}
