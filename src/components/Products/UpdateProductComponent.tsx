import React, { useState, useEffect, FormEvent } from 'react';
import styles from '../../styles/scss/components/products/UpdateProduct.module.scss';
import Select from 'react-select';
import { fetchProducts, updateProduct } from '../../redux/slices/productSlice';
import { useAppSelector, useAppDispatch } from '@/src/redux/hooks';
import { notification } from 'antd'; // Import notification component from Ant Design

interface Product {
  productid: string;
  productname: string;
  price: string;
  category: string;
}

interface FormData {
  [key: string]: Partial<Product>;
}

const categoriesOptions = [
  { value: 'Adidas', label: 'Adidas' },
  { value: 'Nike', label: 'Nike' },
  { value: 'Puma', label: 'Puma' },
];

const UpdateProducts: React.FC = () => {
  const [updateFormData, setUpdateFormData] = useState<FormData>({});
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
  const status = useAppSelector((state) => state.products.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]); // Dispatch only when status changes

  const handleToggleUpdateForm = (productid: string | null) => {
    setUpdateFormData((prevFormData) => {
      if (selectedProductId !== productid) {
        const productToUpdate = products.find((product) => product.productid === productid);

        // Convert productid to string and handle null case
        const productIdString = productid || '';

        return {
          ...prevFormData,
          [productIdString]: { ...productToUpdate } || {},
        };
      }

      return prevFormData;
    });

    setSelectedProductId((prevProductId) =>
      prevProductId === productid ? null : productid,
    );
  };

  const handleUpdateFormDataChange = (productid: string, field: keyof Partial<Product>, value: string) => {
    setUpdateFormData((prevFormData) => ({
      ...prevFormData,
      [productid]: { ...prevFormData[productid], [field]: value },
    }));
  };

  const handleUpdateProduct = async (e: FormEvent<HTMLFormElement>, productid: string) => {
    e.preventDefault();
    const { productname, price, category } = updateFormData[productid] || {};

    try {
      await dispatch(
        updateProduct({
          productid,
          updatedData: { productname, price, category },
        }),
      );
      notification.success({
        message: 'Update Successful',
        description: 'Your product has been updated successfully.',
        duration: 3,
      });
      setSelectedProductId(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className={styles.updateContainer}>
      <h2 className={styles['update-request-heading']}>Update Products</h2>
      {status === 'loading' ? (
        <p className={styles.loading}>Loading...</p>
      ) : (
        <div>
          {products.length > 0 ? (
            <div>
              {products.map((product) => (
                <div
                  key={product.productid}
                  className={`${styles['product-container']} ${selectedProductId === product.productid ? styles.open : ''
                    }`}
                >
                  <div className={styles['product-info']}>
                    <span className={styles['product-name']}>
                      {product.productname}
                    </span>
                    <button
                      className={`${styles['toggle-button']} ${selectedProductId === product.productid
                          ? styles.red
                          : ''
                        }`}
                      onClick={() => handleToggleUpdateForm(product.productid)}
                    >
                      {selectedProductId === product.productid
                        ? 'Close'
                        : 'Open Profile'}
                    </button>
                  </div>
                  {selectedProductId === product.productid && (
                    <form
                      onSubmit={(e) =>
                        handleUpdateProduct(e, product.productid)
                      }
                      className={styles.updateForm}
                    >
                      <div className={styles.formFields}>
                        <label htmlFor={`newName_${product.productid}`}>
                          Product ID:
                        </label>
                        <input
                          type="number"
                          id={`newName_${product.productid}`}
                          placeholder="Product ID"
                          value={
                            updateFormData[product.productid]?.productid || ''
                          }
                          onChange={(e) =>
                            handleUpdateFormDataChange(
                              product.productid,
                              'productid',
                              e.target.value,
                            )
                          }
                          disabled
                          className={styles.inputField}
                        />
                        <label htmlFor={`newName_${product.productid}`}>
                          Product Name:
                        </label>
                        <input
                          type="text"
                          id={`newName_${product.productid}`}
                          placeholder="Enter new name"
                          value={
                            updateFormData[product.productid]?.productname || ''
                          }
                          onChange={(e) =>
                            handleUpdateFormDataChange(
                              product.productid,
                              'productname',
                              e.target.value,
                            )
                          }
                          className={styles.inputField}
                        />
                        <label htmlFor={`newPrice_${product.productid}`}>
                          Price:
                        </label>
                        <input
                          type="number"
                          id={`newPrice_${product.productid}`}
                          placeholder="Enter price"
                          value={updateFormData[product.productid]?.price || ''}
                          onChange={(e) =>
                            handleUpdateFormDataChange(
                              product.productid,
                              'price',
                              e.target.value,
                            )
                          }
                          className={styles.inputField}
                        />
                        <label htmlFor={`newCategory_${product.productid}`}>
                          Category:
                        </label>

                        <Select
                          id={`newCategory_${product.productid}`}
                          options={categoriesOptions}
                          value={{
                            value: updateFormData[product.productid]?.category || '',
                            label: updateFormData[product.productid]?.category || '',
                          }}
                          onChange={(selectedOption) =>
                            handleUpdateFormDataChange(
                              product.productid,
                              'category',
                              selectedOption ? selectedOption.value : '', // Add null check here
                            )
                          }
                        />

                      </div>
                      <div className={styles['form-fields-second']}>
                        <button
                          type="submit"
                          className={styles['update-button']}
                        >
                          Update
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p>No products available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UpdateProducts;
