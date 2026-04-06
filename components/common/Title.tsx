interface TitleProps {
  text: string;
}

export default function Title({ text }: TitleProps) {
  return (
    <h2 className="font-abhaya text-base-18 text-gray-800 font-bold">
      {text}
    </h2>
  );
}
