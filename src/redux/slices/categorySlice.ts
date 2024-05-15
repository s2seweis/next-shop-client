import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Category {
  categoryId: number;
  categoryName: string;
  categoryImage: string;
  numberOfProducts: number;
}

interface CategoryState {
  categories: Category[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  status: 'idle',
  error: null,
};

export const fetchCategories = createAsyncThunk<Category[]>(
  'categories/fetchCategories',
  async () => {
    try {
      const response = await axios.get<Category[]>('http://localhost:3005/categories');
      // const response = await axios.get<Category[]>('https://next-shop-server-aafff1b333cc.herokuapp.com/categories');
      console.log("line:100", response);
      return response.data;

    } catch (error) {
      throw new Error('Failed to fetch categories');
    }
  },
);

export const fetchCategoryById = createAsyncThunk<Category, string>(
  'categories/fetchCategoryById',
  async (categoryId) => {
    try {
      const response = await axios.get<Category>(`https://next-shop-server-aafff1b333cc.herokuapp.com/category/${categoryId}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch category by ID');
    }
  },
);

export const deleteCategory = createAsyncThunk<number, number>(
  'categories/deleteCategory',
  async (categoryId) => {
    try {
      await axios.delete(`https://next-shop-server-aafff1b333cc.herokuapp.com/category/${categoryId}`);
      return categoryId;
    } catch (error) {
      throw new Error('Failed to delete category');
    }
  },
);


export const addCategory = createAsyncThunk<Category, any>(
  'categories/addCategory',
  async (data) => {
    console.log("line:1000", data);
    
    try {
      const response = await axios.post<Category>('http://localhost:3005/category', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to add category');
    }
  },
);


export const updateCategory = createAsyncThunk<Category, { categoryId: number, updatedData: any }>(
  'categories/updateCategory',
  async ({ categoryId, updatedData }) => {
    console.log("Line:100", categoryId);
    console.log("Line:200", updatedData);

    try {
      const response = await axios.put<Category>(`http://localhost:3005/category/${categoryId}`, updatedData);
      // const response = await axios.put<Category>(`https://next-shop-server-aafff1b333cc.herokuapp.com/category/${categoryId}`, updatedData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update category');
    }
  },
);

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch categories';
      })
      .addCase(deleteCategory.fulfilled, (state, action: PayloadAction<number>) => {
        state.categories = state.categories.filter((category) => category.categoryId !== action.payload);
      })
      .addCase(addCategory.fulfilled, (state, action: PayloadAction<Category>) => {
        state.categories.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action: PayloadAction<Category>) => {
        const index = state.categories.findIndex((category) => category.categoryId === action.payload.categoryId);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(fetchCategoryById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoryById.fulfilled, (state, action: PayloadAction<Category>) => {
        state.status = 'succeeded';
        state.categories = [action.payload];
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch category by ID';
      });
  },
});

export default categorySlice.reducer;
