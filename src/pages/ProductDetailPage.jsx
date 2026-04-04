import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from '../components/NavBar';
import kebab from '../assets/kebab.svg';
import myPageLogo from '../assets/myPageLogo.svg';
import LikeButton from '../components/ProductDetail/LikeButton';
import AddItemInput from '../components/AddItemInput';
import Button from '../components/Button';
import ReplyList from '../components/ReplyList';
import TagList from '../components/ProductDetail/TagList';
import useProduct from '../hooks/useProduct';
import useProductComments from '../hooks/useProductComments';
import { formatDate } from '../util/date';
import { BREAKPOINT } from '../util/breakpoint';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { productData, isProductLoading, handleFavoriteButtonClick } =
    useProduct(productId);
  const {
    commentData,
    isCommentLoading,
    value,
    handleSubmit,
    handleChange,
    handleLoadMore,
    handlePatch,
    handleDelete,
  } = useProductComments(productId);

  const formattedDate = formatDate(productData?.createdAt);

  return (
    <Container>
      <NavBar />
      {isProductLoading ? (
        <div>상품 정보를 불러오는 중입니다</div>
      ) : (
        <TopContainer>
          <Image src={productData.images[0]} alt="상품 이미지" />
          <TopContentContainer>
            <TopContent>
              <TopLeft>
                <Title>{productData.name}</Title>
                <Price>{productData.price}원</Price>
              </TopLeft>
              <button type="button">
                <img src={kebab} alt="더보기" />
              </button>
            </TopContent>
            <MiddleContent>
              <Production>
                <ProductionSpan>상품 소개</ProductionSpan>
                <ProductionP>{productData.description}</ProductionP>
              </Production>
              <Production>
                <ProductionSpan>상품 태그</ProductionSpan>
                <TagList tags={productData.tags} />
              </Production>
            </MiddleContent>
            <BottomContent>
              <BottomLeft>
                <img src={myPageLogo} alt="프로필" />
                <BottomLeftContent>
                  <Name>{productData.ownerNickname}</Name>
                  <Date>{formattedDate}</Date>
                </BottomLeftContent>
              </BottomLeft>
              <BottomRight>
                <LikeButton
                  favoriteCount={productData.favoriteCount}
                  onClick={handleFavoriteButtonClick}
                  isFavorite={productData.isFavorite}
                />
              </BottomRight>
            </BottomContent>
          </TopContentContainer>
        </TopContainer>
      )}
      <MiddleContainer onSubmit={handleSubmit}>
        <MiddleTitle>문의하기</MiddleTitle>
        <CustomAddItemInput
          value={value}
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          variant="textarea"
          height="medium"
          onChange={handleChange}
        />
        <ButtonWrapper>
          <Button type="submit" isActive={value.length > 0}>
            등록
          </Button>
        </ButtonWrapper>
      </MiddleContainer>
      {isCommentLoading ? (
        <div>댓글을 불러오는 중입니다...</div>
      ) : (
        <ReplyList
          commentData={commentData}
          handleDelete={handleDelete}
          handlePatch={handlePatch}
        />
      )}
      <ButtonWrapper>
        {commentData.length === 0 ? null : (
          <Button type="button" isActive={true} onClick={handleLoadMore}>
            더보기
          </Button>
        )}
      </ButtonWrapper>
      <GotoListButtonWrapper>
        <GotoListButton to="/items">목록으로 돌아가기</GotoListButton>
      </GotoListButtonWrapper>
    </Container>
  );
};

export default ProductDetailPage;

const Container = styled.div`
  max-width: 1200px;
  padding-top: 70px;
  margin: 0 auto;
  padding-right: 24px;
  padding-left: 24px;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 24px;
  margin-bottom: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid var(--coolGray-200);

  @media (max-width: ${BREAKPOINT.TABLET}) {
    flex-direction: column;
  }
`;

const Image = styled.img`
  border-radius: 16px;
  width: 100%;
  max-width: 486px;
  height: auto;
  aspect-ratio: 1 / 1;

  @media (max-width: ${BREAKPOINT.TABLET}) {
    max-width: 340px;
  }
`;

const TopContentContainer = styled.div`
  flex: 1;
  min-width: 0;
`;

//TopContent

const TopContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  border-bottom: 1px solid var(--coolGray-200);
  padding-bottom: 16px;
`;

const TopLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: var(--secondary-800);
`;

const Price = styled.span`
  font-weight: 600;
  font-size: 40px;
  line-height: 100%;
`;

//MiddleContent
const MiddleContent = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
`;

const Production = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
`;

const ProductionSpan = styled.span`
  font-weight: 600;
  line-height: 26px;
  color: var(--secondary-600);
`;

const ProductionP = styled.p`
  font-weight: 400;
  line-height: 26px;
  color: var(--secondary-600);
`;

//BottomContent
const BottomContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 62px;
`;

const BottomLeft = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const BottomLeftContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
`;

const BottomRight = styled.div`
  padding-left: 24px;
  border-left: 1px solid var(--coolGray-200);
`;

const Name = styled.span`
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: var(--secondary-600);
`;

const Date = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: var(--coolGray-400);
`;

const MiddleContainer = styled.form`
  margin-bottom: 24px;
`;

const MiddleTitle = styled.h2`
  color: var(--coolGray-900);
  font-weight: 600;
  line-height: 26px;
`;

const CustomAddItemInput = styled(AddItemInput)`
  margin-top: 9px;
  margin-bottom: 24px;
  gap: 0;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const GotoListButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GotoListButton = styled(Link)`
  background-color: var(--primary-100);
  color: var(--coolGray-100);
  font-weight: 600;
  font-size: 18px;
  line-height: 26px;
  padding: 12px 64px;
  border-radius: 40px;
  margin-top: 40px;
  margin-bottom: 100px;

  &:hover {
    background-color: var(--primary-200);
  }
`;
