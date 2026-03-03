// Components
import AddItemForm from "../components/addItem/AddItemForm";

export default function AddItem() {
  return (
    <AddItemLayout>
      <AddItemForm />
    </AddItemLayout>
  );
}

const AddItemLayout = ({ children }) => (
  <div className="max-w-300 mx-auto">{children}</div>
);
