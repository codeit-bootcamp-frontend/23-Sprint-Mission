import { useState } from 'react';

const INITIAL_FORM_VALUES = {
  productName: '',
  description: '',
  price: '',
};

export default function useProductForm(initialValues = INITIAL_FORM_VALUES) {
  const [formValues, setFormValues] = useState(initialValues);
  const [tags, setTags] = useState([]);

  const handleChangeFormValue = (e) => {
    const { name, value } = e.target;

    if (name === 'price') {
      const onlyNumber = value.replace(/[^0-9]/g, '');

      setFormValues((prev) => ({
        ...prev,
        [name]: onlyNumber,
      }));

      return;
    }

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isFormValid =
    formValues.productName.trim() !== '' &&
    formValues.description.trim() !== '' &&
    formValues.price.trim() !== '' &&
    tags.length > 0;

  const formattedPrice = formValues.price
    ? Number(formValues.price).toLocaleString()
    : '';

  return {
    formValues,
    setFormValues,
    formattedPrice,
    tags,
    setTags,
    handleChangeFormValue,
    isFormValid,
  };
}
