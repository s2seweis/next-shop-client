import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

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
    try {
      const response = await axios.get<Product[]>('https://nextjs-server-demo-here-9e97c1fb79e3.herokuapp.com/product');
      console.log("line:500", response);
      
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
    try {
      const response = await axios.get<Product>(`https://nextjs-server-demo-here-9e97c1fb79e3.herokuapp.com/product/${productId}`);
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
    console.log("line:999", productid);
    
    try {
      await axios.delete(`https://nextjs-server-demo-here-9e97c1fb79e3.herokuapp.com/product/${productid}`);
      return productid;
    } catch (error) {
      throw new Error('Failed to delete product');
    }
  },
);

export const addProduct = createAsyncThunk<Product, any>(
  'products/addProduct',
  async (data) => {
    try {
      const response = await axios.post<Product>('https://nextjs-server-demo-here-9e97c1fb79e3.herokuapp.com/product', data);
      return response.data;
    } catch (error) {
      throw new Error('Failed to add product');
    }
  },
);

export const updateProduct = createAsyncThunk<Product, { productid: string, updatedData: any }>(
  'products/updateProduct',
  async ({ productid, updatedData }) => {
    try {
      const response = await axios.put<Product>(`https://nextjs-server-demo-here-9e97c1fb79e3.herokuapp.com/product/${productid}`, updatedData);
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
