import styled from 'styled-components';
import IconArrowLeft from '../../assets/icon/icon-arrow-left.svg?react';

const MAX_VISIBLE_PAGE = 5;

export default function Pagination({
  currentPage,
  totalCount,
  pageSize,
  onChangePage,
}) {
  const totalPage = Math.ceil(totalCount / pageSize);
  const startPage =
    Math.floor((currentPage - 1) / MAX_VISIBLE_PAGE) * MAX_VISIBLE_PAGE + 1;
  const endPage = Math.min(startPage + MAX_VISIBLE_PAGE - 1, totalPage);

  const pages = [];

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (totalPage <= 1) return null;

  return (
    <PaginationBox>
      <MoveButton
        type="button"
        disabled={currentPage === 1}
        onClick={() => onChangePage(currentPage - 1)}
      >
        <IconArrowLeft />
      </MoveButton>
      <PageList>
        {pages.map((page) => (
          <PageItem key={page} $isSelected={currentPage === page}>
            <PageButton type="button" onClick={() => onChangePage(page)}>
              {page}
            </PageButton>
          </PageItem>
        ))}
      </PageList>
      <NextMoveButton
        type="button"
        disabled={currentPage === totalPage}
        onClick={() => onChangePage(currentPage + 1)}
      >
        <IconArrowLeft />
      </NextMoveButton>
    </PaginationBox>
  );
}

const PaginationBox = styled.div`
  margin-top: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;
const MoveButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: #fff;
  border: 1px solid var(--gray-200);
  border-radius: 50%;
`;
const PageList = styled.ul`
  display: flex;
  gap: 4px;
`;
const PageItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border: 1px solid var(--gray-200);
  border-radius: 50%;
  font-size: 16px;
  font-weight: 600;

  background: ${({ $isSelected }) => ($isSelected ? '#2f80ed' : '#fff')};
  color: ${({ $isSelected }) => ($isSelected ? '#fff' : 'var(--gray-500)')};
`;
const PageButton = styled.button`
  display: block;
  width: 100%;
  height: 100%;
`;
const NextMoveButton = styled(MoveButton)`
  transform: rotate(180deg);
`;
