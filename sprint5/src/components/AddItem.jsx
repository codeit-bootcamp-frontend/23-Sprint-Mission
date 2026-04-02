import "../AddItem.css";

function AddItem() {
  return (
    <div className="add-item-container">
      <div className="add-item-content">
        <div className="title">상품 등록하기</div>
        <p className="description">
          아직 빈 페이지로 서비스 준비 중입니다... <br />
          조금만 기다려주세요!
        </p>
        <button className="back-button" onClick={() => window.history.back()}>
          뒤로가기
        </button>
      </div>
    </div>
  );
}

export default AddItem;
