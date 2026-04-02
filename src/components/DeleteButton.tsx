import styled from "styled-components";
import XIcon from "../assets/images/ic_x.svg";

// 삭제 아이콘 버튼 스타일
const StyledButton = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 50%; /* 원형 버튼 */
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.gray.text};

  &:hover {
    background: ${({ theme }) => theme.colors.blue.primary};
  }
`;

interface DeleteButtonProps {
  onClick: () => void;
  label: string;
}

// 공통 삭제 버튼 컴포넌트
function DeleteButton({ onClick, label }: DeleteButtonProps) {
  return (
    <StyledButton
      onClick={onClick}
      aria-label={`${label} 삭제`} // 스크린리더용 설명
    >
      {/* aria-label이 있어 alt는 비워둠 */}
      <img src={XIcon} alt="" />
    </StyledButton>
  );
}

export default DeleteButton;