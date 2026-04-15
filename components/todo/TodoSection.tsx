import Image from "next/image";
import TodoImg from "@/assets/img/todoImg.svg";
import DoneImg from "@/assets/img/doneImg.svg";

interface TodoSectionProps {
  type: "todo" | "done";
  className?: string;
  children: React.ReactNode;
}

const SECTION_CONFIG = {
  todo: { img: TodoImg, width: 101, alt: "TO DO" },
  done: { img: DoneImg, width: 97, alt: "DONE" },
} as const;

export default function TodoSection({
  type,
  className,
  children,
}: TodoSectionProps) {
  const config = SECTION_CONFIG[type];

  return (
    <section className={`space-y-4 ${className}`}>
      <Image
        src={config.img}
        width={config.width}
        height={36}
        priority
        alt={config.alt}
      />
      <>{children}</>
    </section>
  );
}
