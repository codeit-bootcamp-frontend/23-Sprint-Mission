import { cva, VariantProps } from "class-variance-authority";

const BadgeStyle = cva(
  "font-santokki w-fit rounded-2xl px-6.5 py-1.5 text-lg font-normal",
  {
    variants: {
      type: {
        todo: "bg-lime-300 text-green-700",
        done: "bg-green-700 text-amber-300",
      },
    },
  }
);

export type BadgeType = NonNullable<VariantProps<typeof BadgeStyle>["type"]>;

const MAP_TEXT: Record<BadgeType, string> = {
  todo: "TO DO",
  done: "DONE",
};

type BadgeProps = {
  type: BadgeType;
};

export function Badge({ type }: BadgeProps) {
  return <div className={BadgeStyle({ type })}>{MAP_TEXT[type]}</div>;
}
