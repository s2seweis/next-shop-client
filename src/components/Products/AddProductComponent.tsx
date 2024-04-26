import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Select from 'react-select';
import { fetchProducts, addProduct } from '../../redux/slices/productSlice';
import styles from '../../styles/scss/components/products/AddProductComponent.module.scss';
import { useAppSelector, useAppDispatch } from '@/src/redux/hooks';
import { notification } from 'antd';

interface SelectOption {
  value: string;
  label: string;
}

const categoryOptions: SelectOption[] = [
  { value: 'Nike', label: 'Nike' },
  { value: 'Puma', label: 'Puma' },
  { value: 'Adidas', label: 'Adidas' },
];

const AddProductsComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
  console.log('line:1', products);

  const [formData, setFormData] = useState<{
    ProductName: string;
    Price: string;
    Category: string | null; // Updated type to string
  }>({
    ProductName: '',
    Price: '',
    Category: null,
  });
  console.log("Line:2", formData);
  

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleAddProduct = async (e: FormEvent<HTMLFormElement>, data: typeof formData) => {
    e.preventDefault(); // Prevent form submission
    try {
      await dispatch(addProduct(data));
      notification.success({
        message: 'Add Product Successful',
        description: 'Your product has been added successfully.',
        duration: 3,
      });
      setSuccessMessage('Product added successfully.');
    } catch (error) {
      console.error('Error adding product:', error);
      setErrorMessage('Failed to add product.');
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    // Use a regular expression to allow any characters for ProductName
    const newValue = name === 'ProductName' ? value : value.replace(/[^0-9.]/g, '');

    setFormData((prevFormData) => ({ ...prevFormData, [name]: newValue }));
  };

  const handleCategoryChange = (selectedOption: SelectOption | null) => {
    if (selectedOption) {
      setFormData({
        ...formData,
        Category: selectedOption.value, // Extract the value from the selected option
      });
    }
  };

  useEffect(() => {
    dispatch(fetchProducts());
    setIsLoading(false);
  }, [dispatch]);

  return (
    <div className={styles.postRequestContainer}>
      <h2 className={styles.productsHeading}>Add Products</h2>
      <form className={styles.formPost} onSubmit={(e) => handleAddProduct(e, formData)}>
        <div className={styles.formGroup}>
          <label htmlFor="ProductName">Product Name:</label>
          <input
            type="text"
            id="ProductName"
            name="ProductName"
            value={formData.ProductName}
            onChange={handleInputChange}
            required
            placeholder="Enter product name"
            className={styles.inputField}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="Price">Price:</label>
          <input
            type="text"
            id="Price"
            name="Price"
            value={formData.Price}
            onChange={handleInputChange}
            required
            pattern="^\d+(\.\d{1,2})?$"
            placeholder="Enter price"
            className={styles.inputField}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="Category">Category:</label>
          <Select
            id="Category"
            name="Category"
            value={categoryOptions.find(option => option.value === formData.Category)} // Set the value using the option that matches the selected value
            onChange={handleCategoryChange}
            options={categoryOptions}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <button className={styles.submitButton} type="submit">
            Add Product
          </button>
        </div>
      </form>
      {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.userDataContainer}>
          <h3>Product Data:</h3>
          <div className={styles.userList}>
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product.productid} className={styles.productCard}>
                  <p className={styles.productName}>{product.productname}</p>
                  <p className={styles.productPrice}>${product.price}</p>
                  <p className={styles.productCategory}>{product.category}</p>
                </div>
              ))
            ) : (
              <p>No products available</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProductsComponent;
