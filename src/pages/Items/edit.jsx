import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
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

  const { data: productData } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductDetail(productId),
  });

  useEffect(() => {
    if (!productData) return;

    setFormValues({
      productName: productData.name,
      description: productData.description,
      price: String(productData.price),
    });

    setTags(productData.tags);
    setPreviewImageUrl(productData.images?.[0] || '');
  }, [productData]);

  const { mutate: submitEdit, isPending } = useMutation({
    mutationFn: async () => {
      let imageUrl = previewImageUrl;

      if (imageFile) {
        const uploadedImage = await uploadImage(imageFile);
        imageUrl = uploadedImage.url;
      }

      return editProduct(productId, {
        images: imageUrl ? [imageUrl] : [],
        tags,
        price: Number(formValues.price),
        description: formValues.description,
        name: formValues.productName,
      });
    },
    onSuccess: (updatedProduct) => {
      alert('상품이 수정되었습니다.');
      navigate(`/items/${updatedProduct.id}`);
    },
    onError: (error) => {
      alert(error.response?.data?.message || '상품 수정에 실패했습니다.');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    submitEdit();
  };

  return (
    <PageWrapper>
      <Inner>
        <FormHeader>
          <FormTitle>상품 수정하기</FormTitle>
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
