// Components
import AddItemImg from "../components/addItem/AddItemImg";
import HeadingText from "../components/addItem/HeadingText";
import SubmitBtn from "../components/btns/SubmitBtn";

export default function AddItem() {
  return (
    <AddItemLayout>
      <AddItemBtnContainer />
      <AddItemImg />
    </AddItemLayout>
  );
}

const AddItemLayout = ({ children }) => (
  <form className="px-3.75 py-6 space-y-6">{children}</form>
);

const AddItemBtnContainer = () => (
  <div className="flex items-center justify-between">
    <HeadingText level={1}>상품 등록하기</HeadingText>

    <SubmitBtn disabled={true} className="px-5.75 h-10.5 rounded-lg text-white">
      등록
    </SubmitBtn>
  </div>
);
