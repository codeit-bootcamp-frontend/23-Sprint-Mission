import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductDetail } from '../../apis/product/getProductDetail';
import { editProduct } from '../../apis/product/editProduct';
import { uploadImage } from '../../apis/image/uploadImage';
import useProductForm from '../../hooks/useProductForm';
import ProductForm from '../../components/form/ProductForm';
import styled from 'styled-components';
import { Inner } from '../../styles/layout';

function EditItem() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [previewImageUrl, setPreviewImageUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const {
    formValues,
    setFormValues,
    formattedPrice,
    tags,
    setTags,
    handleChangeFormValue,
    isFormValid,
  } = useProductForm();

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const productData = await getProductDetail(productId);

        setFormValues({
          productName: productData.name,
          description: productData.description,
          price: String(productData.price),
        });

        setTags(productData.tags);
        setPreviewImageUrl(productData.images?.[0] || '');
      } catch (error) {
        console.error('상품 정보 불러오기 실패', error);
      }
    };

    fetchProductDetail();
  }, [productId, setFormValues, setTags]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = previewImageUrl;

    if (imageFile) {
      const uploadedImage = await uploadImage(imageFile);
      imageUrl = uploadedImage.url;
    }

    const productData = {
      images: imageUrl ? [imageUrl] : [],
      tags,
      price: Number(formValues.price),
      description: formValues.description,
      name: formValues.productName,
    };

    try {
      const updatedProduct = await editProduct(productId, productData);

      alert('상품이 수정되었습니다.');
      navigate(`/items/${updatedProduct.id}`);
    } catch (error) {
      console.error('상품 수정 실패', error);
      alert(error.response?.data?.message || '상품 수정에 실패했습니다.');
    }
  };

  return (
    <PageWrapper>
      <Inner>
        <FormHeader>
          <FormTitle>상품 수정하기{productId}</FormTitle>
        </FormHeader>
        <FormContent>
          <ProductForm
            formValues={formValues}
            formattedPrice={formattedPrice}
            tags={tags}
            setTags={setTags}
            handleChangeFormValue={handleChangeFormValue}
            onSubmit={handleSubmit}
            submitText="수정 완료"
            isFormValid={isFormValid}
            previewImageUrl={previewImageUrl}
            onChangeImage={setImageFile}
          />
        </FormContent>
      </Inner>
    </PageWrapper>
  );
}

export default EditItem;

const PageWrapper = styled.div`
  padding: 24px 0 70px;
`;
const FormHeader = styled.div`
  margin-bottom: 30px;
`;
const FormTitle = styled.h2`
  font-size: 20px;
  line-height: 1.6;
  font-weight: 700;
  color: var(--gray-800);
`;
const FormContent = styled.div`
  position: relative;
`;
