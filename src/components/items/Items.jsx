import ItemCard from "./ItemCard";

export default function Items({ label, itemData }) {
  const itemList = itemData?.list || [];

  return (
    <section>
      <Label label={label} />
      <ItemCard itemList={itemList} label={label} />
    </section>
  );
}

const Label = ({ label }) => {
  return (
    <h2 className="text-[20px] leading-8 font-bold mb-6 text-gray-900">
      {label}
    </h2>
  );
};
