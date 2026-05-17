import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getProductDetail } from '../../apis/product/getProductDetail';
import { Inner } from '../../styles/layout';
import { DEVICE } from '../../styles/breakpoints';
import IconHeart from '/src/assets/icon/icon-heart-lg.svg?react';
import IconKebab from '/src/assets/icon/icon-kebab.svg?react';

function PageItemDetail() {
  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        setIsLoading(true);

        const data = await getProductDetail(productId);
        setProduct(data);
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

  return (
    <PageWrapper>
      <Inner>
        <ItemGroup>
          <ThumbArea>
            <ThumbImage src="/noimg.jpg" alt="상품 이미지" />
          </ThumbArea>
          <InfoArea>
            <TopWrap>
              <Subject>아이패드 미니 팔아요</Subject>
              <Price>500,000원</Price>
              <KebabBox>
                <KebabButton type="button">
                  <IconKebab />
                </KebabButton>
                <KebabList>
                  <KebabItemButton type="button">수정하기</KebabItemButton>
                  <KebabItemButton type="button">삭제하기</KebabItemButton>
                </KebabList>
              </KebabBox>
            </TopWrap>
            <ContentWrap>
              <ContentBox>
                <Title>상품 소개</Title>
                <Description>
                  액정에 잔기스랑 주변부 스크래치있습니다만 예민하신분아니면
                  전혀 신경쓰이지않을정도입니다.
                  <br />
                  박스 보관중입니다.
                  <br />
                  메모용과 넷플릭스용으로만쓰던거라 뭘 해보질 않아 기능이나
                  문제점을 못느꼈네요
                  <br />잘 안써서 싸게넘깁니다! 택배거래안합니다.
                </Description>
              </ContentBox>
              <ContentBox>
                <Title>상품 태그</Title>
                <TagList>
                  <TagItem>#아이패드미니</TagItem>
                  <TagItem>#애플</TagItem>
                  <TagItem>#가성비</TagItem>
                </TagList>
              </ContentBox>
            </ContentWrap>
            <BottomWrap>
              <ProfileBox>
                <ProfileImage src="/profile-default.png" alt="프로필 이미지" />
                <ProfileText>
                  <ProfileName>총명한판다</ProfileName>
                  <ProfileDate>2024. 01. 02</ProfileDate>
                </ProfileText>
              </ProfileBox>
              <FavoriteButton type="button">
                <IconHeart />
                <FavoriteCount>123</FavoriteCount>
              </FavoriteButton>
            </BottomWrap>
          </InfoArea>
        </ItemGroup>
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
