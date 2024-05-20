import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
// ### - Test
import dotenv from 'dotenv';
dotenv.config();
// ###

interface Product {
  price: string;
  category: string;
  productname: string;
  productid: number;
  // Add other properties as needed
}

interface ProductState {
  products: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  status: 'idle',
  error: null,
};

export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetchProducts',
  async () => {

    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    const fullURL = `${baseURL}`;
    // *works

    try {
      const response = await axios.get<Product[]>(
        `${fullURL}/product`,
      );      
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch products');
    }
  },
);

// ###

export const fetchProductById = createAsyncThunk<Product, string>(
  'products/fetchProductById',
  async (productId) => {

    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    const fullURL = `${baseURL}`;
    // *works

    try {
      const response = await axios.get<Product>(
        `${fullURL}/product/${productId}`,
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch product by ID');
    }
  },
);

// ###

export const deleteProduct = createAsyncThunk<number, number>(
  'products/deleteProduct',
  async (productid) => {

    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    const fullURL = `${baseURL}`;
    // *works
    
    try {
      await axios.delete(
        `${fullURL}/product/${productid}`,
      );
      return productid;
    } catch (error) {
      throw new Error('Failed to delete product');
    }
  },
);

export const addProduct = createAsyncThunk<Product, any>(
  'products/addProduct',
  async (data) => {

    console.log("line:100", data);
    

    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    const fullURL = `${baseURL}`;
    // *works

    try {
      const response = await axios.post<Product>(
        `${fullURL}/product`
        , data);
      return response.data;
    } catch (error) {
      throw new Error('Failed to add product');
    }
  },
);

export const updateProduct = createAsyncThunk<Product, { productid: string, updatedData: any }>(
  'products/updateProduct',
  async ({ productid, updatedData }) => {

    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    const fullURL = `${baseURL}`;
    // *works

    try {
      const response = await axios.put<Product>(
        `${fullURL}/product/${productid}`
        , updatedData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update product');
    }
  },
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
  
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<number>) => {
        state.products = state.products.filter((product) => product.productid !== action.payload);
      })
      .addCase(addProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        const index = state.products.findIndex((product) => product.productid === action.payload.productid);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<Product>) => {
        state.status = 'succeeded';
        state.products = [action.payload]; // Update state with the fetched product
      })
  },
});

export default productSlice.reducer;
