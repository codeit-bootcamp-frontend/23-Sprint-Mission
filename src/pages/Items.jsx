import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getListProducts } from '../apis/product/getListProducts';
import { toggleFavoriteApi } from '../utils/favorite/favoriteApi';
import { updateProductList } from '../utils/favorite/updateProductList';
import DropDown from '../components/Items/DropDown';
import Pagination from '../components/Items/Pagination';
import ProductSearch from '../components/Items/ProductSearch';
import ProductCard from '../components/Items/ProductCard';
import { DEVICE, DEVICE_SIZE } from '../styles/breakpoints';
import { Inner } from '../styles/layout';

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

function PageItems() {
  const [bestProducts, setBestProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [orderBy, setOrderBy] = useState('recent');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [bestPageSize, setBestPageSize] = useState(() => getBestPageSize());
  const [allPageSize, setAllPageSize] = useState(() => getAllPageSize());

  useEffect(() => {
    const fetchBestProducts = async () => {
      try {
        const bestData = await getListProducts({
          page: 1,
          pageSize: bestPageSize,
          orderBy: 'favorite',
        });

        setBestProducts(bestData?.list || []);
      } catch (error) {
        console.error('베스트 상품 로딩 실패', error);
        alert(error.message);
      }
    };

    fetchBestProducts();
  }, [bestPageSize]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const allData = await getListProducts({
          page: currentPage,
          pageSize: allPageSize,
          orderBy: orderBy,
        });

        setAllProducts(allData?.list || []);
        setTotalCount(allData?.totalCount || 0);
      } catch (error) {
        console.error('전체 상품 로딩 실패', error);
        alert(error.message);
      }
    };

    fetchAllProducts();
  }, [orderBy, currentPage, allPageSize]);

  useEffect(() => {
    const handleResize = () => {
      const nextBestPageSize = getBestPageSize();
      const nextAllPageSize = getAllPageSize();

      setBestPageSize((prev) => {
        if (prev !== nextBestPageSize) {
          return nextBestPageSize;
        }

        return prev;
      });

      setAllPageSize((prev) => {
        if (prev !== nextAllPageSize) {
          return nextAllPageSize;
        }

        return prev;
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleFavoriteClick = async (product) => {
    try {
      const updatedProduct = await toggleFavoriteApi(product);

      const updateList = (prev) =>
        updateProductList(prev, product.id, updatedProduct);

      setBestProducts(updateList);
      setAllProducts(updateList);
    } catch (error) {
      console.error('좋아요 실패', error);
      alert(error.message);
    }
  };

  return (
    <>
      <PageWrapper>
        <GroupProduct>
          <Inner>
            <TitleArea>
              <Title>베스트 상품</Title>
            </TitleArea>
            <ContentArea>
              <ProductList>
                {bestProducts.map((product) => (
                  <ProductItem key={product.id}>
                    <ProductCard
                      product={product}
                      onFavoriteClick={handleFavoriteClick}
                    />
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
              <ProductControls>
                <ProductSearch />
                <DropDown
                  orderBy={orderBy}
                  onChangeOrder={(value) => {
                    setOrderBy(value);
                  }}
                />
              </ProductControls>
            </TitleAllArea>
            <ContentArea>
              <ProductAllList>
                {allProducts.map((product) => (
                  <ProductAllItem key={product.id}>
                    <ProductCard
                      product={product}
                      onFavoriteClick={handleFavoriteClick}
                    />
                  </ProductAllItem>
                ))}
              </ProductAllList>
              <Pagination
                currentPage={currentPage}
                totalCount={totalCount}
                pageSize={allPageSize}
                onChangePage={setCurrentPage}
              />
            </ContentArea>
          </Inner>
        </GroupProduct>
      </PageWrapper>
    </>
  );
}

export default PageItems;

const PageWrapper = styled.div`
  padding: 30px 0 60px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const GroupProduct = styled.div``;

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

const ProductControls = styled.div`
  display: flex;
  gap: 12px;

  @media ${DEVICE.mobile} {
    width: 100%;
    gap: 14px;
  }
`;
