import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { addFavoriteProduct } from '../apis/product/addFavoriteProduct';
import { getListProducts } from '../apis/product/getListProducts';
import { removeFavoriteProduct } from '../apis/product/removeFavoriteProduct';
import DropDown from '../components/Items/DropDown';
import Pagination from '../components/Items/Pagination';
import ProductSearch from '../components/Items/ProductSearch';
import HeartIcon from '../assets/icon/icon-heart.svg?react';
import { DEVICE, DEVICE_SIZE } from '../styles/breakpoints';

function PageItems() {
  const [bestProducts, setBestProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [orderBy, setOrderBy] = useState('recent');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const getBestPageSize = () => {
    if (window.innerWidth <= DEVICE_SIZE.mobile) return 1;
    if (window.innerWidth <= DEVICE_SIZE.tablet) return 2;
    return 4;
  };

  const getAllPageSize = () => {
    if (window.innerWidth <= DEVICE_SIZE.mobile) return 4;
    if (window.innerWidth <= DEVICE_SIZE.tablet) return 6;
    return 10;
  };

  useEffect(() => {
    const fetchBestProducts = async () => {
      try {
        const bestData = await getListProducts({
          page: 1,
          pageSize: getBestPageSize(),
          orderBy: 'favorite',
        });

        setBestProducts(bestData?.list || []);
      } catch (error) {
        console.error('베스트 상품 로딩 실패', error);
        alert(error.message);
      }
    };

    const fetchAllProducts = async () => {
      try {
        const allData = await getListProducts({
          page: currentPage,
          pageSize: getAllPageSize(),
          orderBy: orderBy,
        });

        setAllProducts(allData?.list || []);
        setTotalCount(allData?.totalCount || 0);
      } catch (error) {
        console.error('전체 상품 로딩 실패', error);
        alert(error.message);
      }
    };

    fetchBestProducts();
    fetchAllProducts();

    let timer;

    const handleResize = () => {
      clearTimeout(timer);

      timer = setTimeout(() => {
        fetchBestProducts();
        fetchAllProducts();
      }, 300);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [orderBy, currentPage]);

  const handleFavoriteClick = async (product) => {
    try {
      let updatedProduct;

      if (product.isFavorite) {
        updatedProduct = await removeFavoriteProduct(product.id);
      } else {
        updatedProduct = await addFavoriteProduct(product.id);
      }

      setBestProducts((prevProducts) =>
        prevProducts.map((item) =>
          item.id === product.id ? updatedProduct : item,
        ),
      );

      setAllProducts((prevProducts) =>
        prevProducts.map((item) =>
          item.id === product.id ? updatedProduct : item,
        ),
      );
    } catch (error) {
      console.error('좋아요 실패', error);
      alert(error.message);
    }
  };

  return (
    <>
      <PageItemsWrapper>
        <GroupProduct>
          <Inner>
            <TitleArea>
              <Title>베스트 상품</Title>
            </TitleArea>
            <ContentArea>
              <ProductList>
                {bestProducts.map((product) => (
                  <ProductItem key={product.id}>
                    <ProductThumb>
                      <ProductLink to={`/products/${product.id}`}>
                        <img
                          src={product.images?.[0] || '/noimg.jpg'}
                          alt={product.name}
                          onError={(e) => {
                            e.currentTarget.src = '/noimg.jpg';
                          }}
                        />
                      </ProductLink>
                    </ProductThumb>
                    <ProductInfo>
                      <ProductName>
                        <ProductLink to={`/products/${product.id}`}>
                          {product.name}
                        </ProductLink>
                      </ProductName>
                      <ProductPrice>
                        {product.price.toLocaleString()}원
                      </ProductPrice>
                      <ProductFavoriteCountButton
                        type="button"
                        $isFavorite={product.isFavorite}
                        onClick={() => handleFavoriteClick(product)}
                      >
                        <HeartIcon />
                        {product.favoriteCount}
                      </ProductFavoriteCountButton>
                    </ProductInfo>
                  </ProductItem>
                ))}
              </ProductList>
            </ContentArea>
          </Inner>
        </GroupProduct>

        <GroupProduct>
          <Inner>
            <TitleAllArea>
              <Title>전체 상품</Title>
              <PrdControls>
                <ProductSearch />
                <DropDown
                  orderBy={orderBy}
                  onChangeOrder={(value) => {
                    setOrderBy(value);
                    setCurrentPage(1);
                  }}
                />
              </PrdControls>
            </TitleAllArea>
            <ContentArea>
              <ProductAllList>
                {allProducts.map((product) => (
                  <ProductAllItem key={product.id}>
                    <ProductThumb>
                      <ProductLink to={`/products/${product.id}`}>
                        <img
                          src={product.images?.[0] || '/noimg.jpg'}
                          alt={product.name}
                          onError={(e) => {
                            e.currentTarget.src = '/noimg.jpg';
                          }}
                        />
                      </ProductLink>
                    </ProductThumb>
                    <ProductInfo>
                      <ProductName>
                        <ProductLink to={`/products/${product.id}`}>
                          {product.name}
                        </ProductLink>
                      </ProductName>
                      <ProductPrice>
                        {product.price.toLocaleString()}원
                      </ProductPrice>
                      <ProductFavoriteCountButton
                        type="button"
                        $isFavorite={product.isFavorite}
                        onClick={() => handleFavoriteClick(product)}
                      >
                        <HeartIcon />
                        {product.favoriteCount}
                      </ProductFavoriteCountButton>
                    </ProductInfo>
                  </ProductAllItem>
                ))}
              </ProductAllList>
              <Pagination
                currentPage={currentPage}
                totalCount={totalCount}
                pageSize={getAllPageSize()}
                onChangePage={setCurrentPage}
              />
            </ContentArea>
          </Inner>
        </GroupProduct>
      </PageItemsWrapper>
    </>
  );
}

export default PageItems;

const PageItemsWrapper = styled.div`
  padding: 30px 0 60px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const GroupProduct = styled.div``;

const Inner = styled.div`
  padding: 0 24px;
  margin: 0 auto;
  max-width: 1248px;
`;

const TitleArea = styled.div`
  margin-bottom: 16px;
`;

const TitleAllArea = styled.div`
  position: relative;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${DEVICE.mobile} {
    flex-direction: column;
    align-items: flex-start;
    gap: 13px;
  }
`;

const Title = styled.h2`
  font-size: 20px;
  line-height: 1.6;
  font-weight: 700;
  color: var(--gray-900);
`;

const ContentArea = styled.div``;

const ProductList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 40px 24px;

  @media ${DEVICE.tablet} {
    gap: 10px;
  }

  @media ${DEVICE.mobile} {
    gap: 0;
  }
`;

const ProductItem = styled.li`
  flex: 0 0 calc((100% - 72px) / 4);

  @media ${DEVICE.tablet} {
    flex: 0 0 calc((100% - 10px) / 2);
  }

  @media ${DEVICE.mobile} {
    flex: 0 0 100%;
  }
`;

const ProductAllList = styled(ProductList)`
  @media ${DEVICE.tablet} {
    gap: 40px 16px;
  }

  @media ${DEVICE.mobile} {
    gap: 32px 8px;
  }
`;

const ProductAllItem = styled(ProductItem)`
  flex: 0 0 calc((100% - 96px) / 5);

  @media ${DEVICE.tablet} {
    flex: 0 0 calc((100% - 32px) / 3);
  }

  @media ${DEVICE.mobile} {
    flex: 0 0 calc((100% - 8px) / 2);
  }
`;

const ProductLink = styled(Link)``;

const ProductThumb = styled.div`
  overflow: hidden;
  margin-bottom: 16px;
  border-radius: 16px;

  position: relative;
  padding-bottom: 100%;

  img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProductInfo = styled.div`
  display: inline-flex;
  flex-direction: column;
  gap: 6px;
`;

const ProductName = styled.strong`
  font-size: 14px;
  line-height: 1.7;
  font-weight: 500;
  color: var(--gray-800);
`;

const ProductPrice = styled.span`
  font-size: 16px;
  line-height: 1.6;
  font-weight: 700;
  color: var(--gray-800);
`;

const ProductFavoriteCountButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  line-height: 1.5;
  font-weight: 500;
  color: var(--gray-600);

  svg {
    width: 16px;
    height: 16px;

    path {
      fill: ${({ $isFavorite }) => $isFavorite && '#FF68CC'};
      stroke: ${({ $isFavorite }) => $isFavorite && '#FF68CC'};
    }
  }
`;

const PrdControls = styled.div`
  display: flex;
  gap: 12px;

  @media ${DEVICE.mobile} {
    width: 100%;
    gap: 14px;
  }
`;
