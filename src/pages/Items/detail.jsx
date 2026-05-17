import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getProductDetail } from '../../apis/product/getProductDetail';
import { deleteProduct } from '../../apis/product/deleteProduct';
import { toggleFavoriteApi } from '../../utils/favorite/favoriteApi';
import { getMyProfile } from '../../apis/user/getMyProfile';
import { createComment } from '../../apis/comment/createComment';
import FormField from '../../components/form/FormField';
import TextareaBox from '../../components/form/TextareaBox';
import { Inner } from '../../styles/layout';
import { DEVICE } from '../../styles/breakpoints';
import SubmitButton from '../../components/form/SubmitButton';
import IconHeart from '/src/assets/icon/icon-heart-lg.svg?react';
import IconKebab from '/src/assets/icon/icon-kebab.svg?react';

function PageItemDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isKebabOpen, setIsKebabOpen] = useState(false);
  const [myProfile, setMyProfile] = useState(null);
  const [commentInput, setCommentInput] = useState('');

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        setIsLoading(true);

        const productData = await getProductDetail(productId);
        setProduct(productData);

        const myProfileData = await getMyProfile();
        setMyProfile(myProfileData);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetail();
  }, [productId]);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>상품 정보를 불러오지 못했습니다.</div>;
  if (!product) return <div>상품이 없습니다.</div>;

  const isOwner = product.ownerId === myProfile?.id;

  const handleDeleteClick = async () => {
    const isConfirmed = confirm('정말 삭제하시겠습니까?');

    if (!isConfirmed) return;

    try {
      await deleteProduct(productId);
      navigate('/items');
    } catch (error) {
      console.error('상품 삭제 실패', error);
      alert(error.response?.data?.message || '상품 삭제에 실패했습니다.');
    }
  };

  const handleFavoriteClick = async () => {
    try {
      const updatedProduct = await toggleFavoriteApi(product);
      setProduct((prevProduct) => ({
        ...prevProduct,
        ...updatedProduct,
      }));
    } catch (error) {
      console.error('좋아요 실패', error);
      alert(error.message);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await createComment(productId, commentInput);

      setCommentInput('');
    } catch (error) {
      console.error('댓글 등록 실패', error);

      alert(error.response?.data?.message || '댓글 등록에 실패했습니다.');
    }
  };

  return (
    <PageWrapper>
      <Inner>
        <ItemGroup>
          <ThumbArea>
            <ThumbImage
              src={product.images?.[0] || '/noimg.jpg'}
              onError={(e) => {
                e.target.src = '/noimg.jpg';
              }}
              alt={product.name}
            />
          </ThumbArea>
          <InfoArea>
            <TopWrap>
              <Subject>{product.name}</Subject>
              <Price>{product.price.toLocaleString()}원</Price>
              {isOwner && (
                <KebabBox>
                  <KebabButton
                    type="button"
                    onClick={() => setIsKebabOpen((prev) => !prev)}
                  >
                    <IconKebab />
                  </KebabButton>
                  {isKebabOpen && (
                    <KebabList>
                      <KebabItemButton type="button">수정하기</KebabItemButton>
                      <KebabItemButton
                        type="button"
                        onClick={handleDeleteClick}
                      >
                        삭제하기
                      </KebabItemButton>
                    </KebabList>
                  )}
                </KebabBox>
              )}
            </TopWrap>
            <ContentWrap>
              <ContentBox>
                <Title>상품 소개</Title>
                <Description>{product.description}</Description>
              </ContentBox>
              <ContentBox>
                <Title>상품 태그</Title>
                <TagList>
                  {product.tags.map((tag) => (
                    <TagItem key={tag}>#{tag}</TagItem>
                  ))}
                </TagList>
              </ContentBox>
            </ContentWrap>
            <BottomWrap>
              <ProfileBox>
                <ProfileImage src="/profile-default.png" alt="프로필 이미지" />
                <ProfileText>
                  <ProfileName>{product.ownerNickname}</ProfileName>
                  <ProfileDate>
                    {new Date(product.createdAt).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}
                  </ProfileDate>
                </ProfileText>
              </ProfileBox>
              <FavoriteButton
                type="button"
                onClick={handleFavoriteClick}
                $isFavorite={product.isFavorite}
              >
                <IconHeart />
                <FavoriteCount>{product.favoriteCount}</FavoriteCount>
              </FavoriteButton>
            </BottomWrap>
          </InfoArea>
        </ItemGroup>

        <CommentGroup>
          <CommentForm onSubmit={handleCommentSubmit}>
            <FormField label="문의하기" id="comment">
              <CommentTextarea
                id="comment"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
              />
            </FormField>
            <CommentSubmitButton type="submit" disabled={!commentInput.trim()}>
              등록
            </CommentSubmitButton>
          </CommentForm>
        </CommentGroup>
      </Inner>
    </PageWrapper>
  );
}

export default PageItemDetail;

const PageWrapper = styled.div`
  padding: 30px 0 220px;
`;
const ItemGroup = styled.div`
  display: flex;
  gap: 24px;
  padding-bottom: 40px;
  margin-bottom: 40px;
  border-bottom: 1px solid var(--gray-200);

  @media ${DEVICE.tablet} {
    gap: 16px;
    padding-bottom: 32px;
    margin-bottom: 32px;
  }

  @media ${DEVICE.mobile} {
    flex-direction: column;
    gap: 16px;
    padding-bottom: 24px;
    margin-bottom: 24px;
  }
`;
const ThumbArea = styled.div`
  width: 486px;
  height: 486px;
  border-radius: 16px;
  overflow: hidden;

  @media ${DEVICE.tablet} {
    width: 340px;
    height: 340px;
  }

  @media ${DEVICE.mobile} {
    width: 100%;
    height: 100%;
  }
`;
const ThumbImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const InfoArea = styled.div`
  flex: 1;
`;
const TopWrap = styled.div`
  position: relative;
  padding-bottom: 16px;
  margin-bottom: 24px;
  border-bottom: 1px solid var(--gray-200);

  @media ${DEVICE.tablet} {
    margin-bottom: 16px;
  }
`;
const Subject = styled.h2`
  margin-bottom: 16px;
  font-size: 24px;
  line-height: 1.3;
  font-weight: 600;
  color: var(--gray-800);

  @media ${DEVICE.tablet} {
    margin-bottom: 8px;
    font-size: 20px;
    line-height: 1.6;
  }

  @media ${DEVICE.mobile} {
    font-size: 16px;
  }
`;
const Price = styled.span`
  font-size: 40px;
  font-weight: 600;
  color: var(--gray-800);

  @media ${DEVICE.tablet} {
    font-size: 32px;
  }

  @media ${DEVICE.mobile} {
    font-size: 24px;
  }
`;
const KebabBox = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`;
const KebabButton = styled.button``;
const KebabList = styled.div`
  z-index: 1;
  position: absolute;
  right: 0;
  top: calc(100% + 10px);
  display: flex;
  flex-direction: column;
  width: 140px;
  border-radius: 8px;
  border: 1px solid #d1d5d8;
  background: #fff;
  overflow: hidden;

  @media ${DEVICE.mobile} {
    width: 102px;
  }
`;
const KebabItemButton = styled.button`
  padding: 10px 0;
  font-size: 16px;
  line-height: 1.6;

  &:hover {
    background: var(--gray-100);
  }

  @media ${DEVICE.mobile} {
    padding: 12px 0;
    font-size: 14px;
  }
`;
const ContentWrap = styled.div`
  margin-bottom: 60px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media ${DEVICE.tablet} {
    margin-bottom: 40px;
  }
`;
const ContentBox = styled.div``;
const Title = styled.h3`
  margin-bottom: 16px;
  font-size: 16px;
  line-height: 1.6;
  font-weight: 600;
  color: var(--gray-600);

  @media ${DEVICE.tablet} {
    margin-bottom: 8px;
  }
`;
const Description = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: var(--gray-600);
  white-space: pre-wrap;
`;
const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;
const TagItem = styled.li`
  padding: 6px 16px;
  font-size: 16px;
  line-height: 1.6;
  color: var(--gray-800);
  background: var(--gray-100);
  border-radius: 26px;
`;
const BottomWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ProfileBox = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;
const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
`;
const ProfileText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;
const ProfileName = styled.span`
  font-size: 14px;
  line-height: 1.7;
  font-weight: 500;
  color: var(--gray-600);
`;
const ProfileDate = styled.span`
  font-size: 14px;
  line-height: 1.7;
  color: var(--gray-400);
`;
const FavoriteButton = styled.button`
  position: relative;
  padding: 4px 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  border: 1px solid var(--gray-200);
  border-radius: 35px;

  &::before {
    content: '';
    position: absolute;
    left: -24px;
    top: 50%;
    transform: translateY(-50%);
    width: 1px;
    height: 34px;
    background: var(--gray-200);
  }

  svg {
    path {
      fill: ${({ $isFavorite }) => $isFavorite && '#FF68CC'};
      stroke: ${({ $isFavorite }) => $isFavorite && '#FF68CC'};
    }
  }

  @media ${DEVICE.tablet} {
    svg {
      width: 24px;
      height: 24px;
    }
  }
`;
const FavoriteCount = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: var(--gray-500);
`;

const CommentGroup = styled.div``;
const CommentForm = styled.form``;
const CommentTextarea = styled(TextareaBox)`
  height: 104px;
`;
const CommentSubmitButton = styled(SubmitButton)`
  margin-top: 16px;
  margin-left: auto;
`;
