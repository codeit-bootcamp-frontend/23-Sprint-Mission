// import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Inner } from '../../styles/layout';
import IconHeart from '/src/assets/icon/icon-heart-lg.svg?react';
import IconKebab from '/src/assets/icon/icon-kebab.svg?react';

function PageItemDetail() {
  // const { productId } = useParams();

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
            <ContentBox>
              <Title>상품 소개</Title>
              <Description>
                액정에 잔기스랑 주변부 스크래치있습니다만 예민하신분아니면 전혀
                신경쓰이지않을정도입니다. 박스 보관중입니다.
                <br />
                메모용과 넷플릭스용으로만쓰던거라 뭘 해보질 않아 기능이나
                문제점을 못느꼈네요 잘 안써서 싸게넘깁니다! 택배거래안합니다.
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
            <BottomWrap>
              <ProfileBox>
                <ProfileImage src="/profile-default.png" alt="프로필 이미지" />
                <ProfileText>
                  <ProfileName>총명한판다</ProfileName>
                  <ProfileDate>2024. 01. 02</ProfileDate>
                </ProfileText>
              </ProfileBox>
              <FovoriteBox>
                <FavoriteButton type="button">
                  <IconHeart />
                </FavoriteButton>
                <FavoriteCount>123</FavoriteCount>
              </FovoriteBox>
            </BottomWrap>
          </InfoArea>
        </ItemGroup>
      </Inner>
    </PageWrapper>
  );
}

export default PageItemDetail;

const PageWrapper = styled.div``;
const ItemGroup = styled.div``;
const ThumbArea = styled.div``;
const ThumbImage = styled.img``;
const InfoArea = styled.div``;
const TopWrap = styled.div``;
const Subject = styled.h2``;
const Price = styled.div``;
const KebabBox = styled.div``;
const KebabButton = styled.button``;
const KebabList = styled.div``;
const KebabItemButton = styled.button``;
const ContentBox = styled.div``;
const Title = styled.h3``;
const Description = styled.p``;
const TagList = styled.ul``;
const TagItem = styled.li``;
const BottomWrap = styled.div``;
const ProfileBox = styled.div``;
const ProfileImage = styled.img``;
const ProfileText = styled.div``;
const ProfileName = styled.span``;
const ProfileDate = styled.span``;
const FovoriteBox = styled.div``;
const FavoriteButton = styled.button``;
const FavoriteCount = styled.span``;
