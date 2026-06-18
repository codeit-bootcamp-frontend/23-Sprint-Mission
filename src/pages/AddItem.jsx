import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { createProduct } from '../apis/product/createProduct';
import { uploadImage } from '../apis/image/uploadImage';
import useProductForm from '../hooks/useProductForm';
import ProductForm from '../components/form/ProductForm';
import styled from 'styled-components';
import { Inner } from '../styles/layout';

function AddItem() {
  const navigate = useNavigate();

  const {
    formValues,
    formattedPrice,
    tags,
    setTags,
    handleChangeFormValue,
    isFormValid,
  } = useProductForm();

  const [imageFile, setImageFile] = useState(null);

  const { mutate: submitProduct, isPending } = useMutation({
    mutationFn: async () => {
      let imageUrl = '';

      if (imageFile) {
        const uploadedImage = await uploadImage(imageFile);
        imageUrl = uploadedImage.url;
      }

      return createProduct({
        images: imageUrl ? [imageUrl] : [],
        tags,
        price: Number(formValues.price),
        description: formValues.description,
        name: formValues.productName,
      });
    },
    onSuccess: (createdProduct) => {
      alert('상품이 등록되었습니다.');
      navigate(`/items/${createdProduct.id}`);
    },
    onError: (error) => {
      alert(error.response?.data?.message || '상품 등록에 실패했습니다.');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    submitProduct();
  };

  return (
    <PageWrapper>
      <Inner>
        <FormHeader>
          <FormTitle>상품 등록하기</FormTitle>
        </FormHeader>
        <FormContent>
          <ProductForm
            formValues={formValues}
            formattedPrice={formattedPrice}
            tags={tags}
            setTags={setTags}
            handleChangeFormValue={handleChangeFormValue}
            onSubmit={handleSubmit}
            submitText="등록"
            isFormValid={isFormValid}
            onChangeImage={setImageFile}
          />
        </FormContent>
      </Inner>
    </PageWrapper>
  );
}

export default AddItem;

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
