import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { getProductDetail } from '../../apis/product/getProductDetail';
import { deleteProduct } from '../../apis/product/deleteProduct';
import { toggleFavoriteApi } from '../../utils/favorite/favoriteApi';
import { getMyProfile } from '../../apis/user/getMyProfile';
import { createComment } from '../../apis/comment/createComment';
import { getComments } from '../../apis/comment/getComments';
import { deleteComment } from '../../apis/comment/deleteComment';
import { editComment } from '../../apis/comment/editComment';
import { formatDate } from '../../utils/formatDate';
import CommentForm from '../../components/comment/CommentForm';
import EditCommentForm from '../../components/comment/EditCommentForm';
import { Inner } from '../../styles/layout';
import { DEVICE } from '../../styles/breakpoints';
import IconHeart from '/src/assets/icon/icon-heart-lg.svg?react';
import IconKebab from '/src/assets/icon/icon-kebab.svg?react';
import IconBack from '/src/assets/icon/icon-back.svg?react';

function PageItemDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [isKebabOpen, setIsKebabOpen] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [openedCommentKebabId, setOpenedCommentKebabId] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentInput, setEditingCommentInput] = useState('');

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductDetail(productId),
  });

  const { data: myProfile } = useQuery({
    queryKey: ['myProfile'],
    queryFn: () => getMyProfile(),
  });

  const { data: commentsData } = useQuery({
    queryKey: ['comments', productId],
    queryFn: () => getComments(productId),
  });

  const commentList = commentsData?.list ?? [];

  useEffect(() => {
    const handleClickOutside = () => {
      setIsKebabOpen(false);
      setOpenedCommentKebabId(null);
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>상품 정보를 불러오지 못했습니다.</div>;
  if (!product) return <div>상품이 없습니다.</div>;

  const isOwner = product.ownerId === myProfile?.id;

  const { mutate: deleteProductMutate } = useMutation({
    mutationFn: () => deleteProduct(productId),
    onSuccess: () => {
      navigate('/items');
    },
    onError: (error) => {
      alert(error.response?.data?.message || '상품 삭제에 실패했습니다.');
    },
  });

  const handleDeleteClick = () => {
    const isConfirmed = confirm('정말 삭제하시겠습니까?');
    if (!isConfirmed) return;
    deleteProductMutate();
  };

  const handleCommentDeleteClick = async (commentId) => {
    const isConfirmed = confirm('정말 삭제하시겠습니까?');

    if (!isConfirmed) return;

    try {
      await deleteComment(commentId);

      setCommentList((prev) =>
        prev.filter((comment) => comment.id !== commentId),
      );
    } catch (error) {
      console.error('댓글 삭제 실패', error);
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

      const commentsData = await getComments(productId);
      setCommentList(commentsData.list);

      setCommentInput('');
    } catch (error) {
      console.error('댓글 등록 실패', error);

      alert(error.response?.data?.message || '댓글 등록에 실패했습니다.');
    }
  };

  const handleCommentEdit = async (e) => {
    e.preventDefault();
    try {
      await editComment(editingCommentId, editingCommentInput);

      const commentsData = await getComments(productId);
      setCommentList(commentsData.list);

      setEditingCommentInput('');
      setEditingCommentId(null);
    } catch (error) {
      console.error('댓글 수정 실패', error);
    }
  };

  const commentEmpty = (
    <CommentEmpty>
      <EmptyImage
        src="/src/assets/images/comment-empty.png"
        alt="empty 이미지"
      ></EmptyImage>
      <EmptyText>아직 문의가 없어요</EmptyText>
    </CommentEmpty>
  );

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
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsKebabOpen((prev) => !prev);
                      setOpenedCommentKebabId(null);
                    }}
                  >
                    <IconKebab />
                  </KebabButton>
                  {isKebabOpen && (
                    <KebabList onClick={(e) => e.stopPropagation()}>
                      <KebabItemButton
                        type="button"
                        onClick={() => navigate(`/items/${productId}/edit`)}
                      >
                        수정하기
                      </KebabItemButton>
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
                  <ProfileDate>{formatDate(product.createdAt)}</ProfileDate>
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
          <CommentForm
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            onSubmit={handleCommentSubmit}
          />

          {commentList.length > 0 ? (
            <CommentList>
              {commentList.map((comment) => {
                const isCommentOwner = comment.writer.id === myProfile?.id;

                return (
                  <CommentItem key={comment.id}>
                    {editingCommentId === comment.id ? (
                      <EditCommentForm
                        value={editingCommentInput}
                        onChange={(e) => setEditingCommentInput(e.target.value)}
                        onSubmit={handleCommentEdit}
                        onCancel={() => {
                          setEditingCommentId(null);
                          setEditingCommentInput('');
                        }}
                      />
                    ) : (
                      <CommentContent>{comment.content}</CommentContent>
                    )}

                    <CommentProfileBox>
                      <CommentProfileImage
                        src="/profile-default.png"
                        alt="프로필 이미지"
                      />
                      <CommentProfileText>
                        <CommentProfileName>
                          {comment.writer.nickname}
                        </CommentProfileName>
                        <CommentProfileDate>
                          {formatDate(comment.createdAt)}
                        </CommentProfileDate>
                      </CommentProfileText>
                    </CommentProfileBox>

                    {isCommentOwner && editingCommentId !== comment.id && (
                      <CommentKebabBox>
                        <KebabButton
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsKebabOpen(false);
                            setOpenedCommentKebabId((prev) =>
                              prev === comment.id ? null : comment.id,
                            );
                          }}
                        >
                          <IconKebab />
                        </KebabButton>

                        {openedCommentKebabId === comment.id && (
                          <KebabList onClick={(e) => e.stopPropagation()}>
                            <KebabItemButton
                              type="button"
                              onClick={() => {
                                setEditingCommentId(comment.id);
                                setEditingCommentInput(comment.content);
                                setOpenedCommentKebabId(null);
                              }}
                            >
                              수정하기
                            </KebabItemButton>

                            <KebabItemButton
                              type="button"
                              onClick={() =>
                                handleCommentDeleteClick(comment.id)
                              }
                            >
                              삭제하기
                            </KebabItemButton>
                          </KebabList>
                        )}
                      </CommentKebabBox>
                    )}
                  </CommentItem>
                );
              })}
            </CommentList>
          ) : (
            commentEmpty
          )}
        </CommentGroup>

        <BackToListLink to="/items">
          목록으로 돌아가기
          <IconBack />
        </BackToListLink>
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
  aspect-ratio: 1 / 1;
  border-radius: 16px;
  overflow: hidden;

  @media ${DEVICE.tablet} {
    width: 340px;
  }

  @media ${DEVICE.mobile} {
    width: 100%;
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
  color: var(--gray-500);

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
  min-width: 20px;
  font-size: 16px;
  font-weight: 500;
  color: var(--gray-500);
`;

const CommentGroup = styled.div``;

const CommentList = styled.ul`
  margin-top: 24px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media ${DEVICE.mobile} {
    gap: 16px;
  }
`;

const CommentItem = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--gray-200);

  @media ${DEVICE.mobile} {
    padding-bottom: 8px;
  }
`;

const CommentContent = styled.p`
  white-space: pre-wrap;
  font-size: 14px;
  color: var(--gray-800);
  line-height: 1.7;
`;

const CommentProfileBox = styled(ProfileBox)`
  gap: 8px;
`;

const CommentProfileImage = styled(ProfileImage)`
  width: 32px;
  height: 32px;
`;

const CommentProfileText = styled(ProfileText)`
  gap: 4px;
`;

const CommentProfileName = styled(ProfileName)`
  font-size: 12px;
  font-weight: 400;
  line-height: 1.5;
`;

const CommentProfileDate = styled(ProfileDate)`
  font-size: 12px;
  line-height: 1.5;
`;

const CommentKebabBox = styled(KebabBox)``;

const BackToListLink = styled(Link)`
  margin: 64px auto 0;
  display: flex;
  width: fit-content;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 12px 40px;
  font-size: 18px;
  line-height: 1.4;
  font-weight: 600;
  color: var(--gray-100);
  background: var(--primary-100);
  border-radius: 40px;
  transition: background 0.3s;

  &:hover {
    background: rgba(54, 146, 255, 0.9);
  }

  @media ${DEVICE.tablet} {
    margin-top: 48px;
  }

  @media ${DEVICE.mobile} {
    margin-top: 40px;
  }
`;

const CommentEmpty = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  @media ${DEVICE.tablet} {
    margin-top: 40px;
  }
`;

const EmptyImage = styled.img`
  width: 196px;

  @media ${DEVICE.tablet} {
    width: 140px;
  }
`;

const EmptyText = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: var(--gray-400);
`;
