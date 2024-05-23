import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// ### - Test
import dotenv from 'dotenv';
dotenv.config();
// ###

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const fullURL = `${baseURL}`;
// *works

interface Category {
  categoryId: number;
  categoryName: string;
  categoryImage: string;
  numberOfProducts: number;
  key: string;
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
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    const fullURL = `${baseURL}`;
    // *works

    try {
      const response = await axios.get<Category[]>(`${fullURL}/categories`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch categories');
    }
  },
);

export const fetchCategoryById = createAsyncThunk<Category, string>(
  'categories/fetchCategoryById',
  async (categoryId) => {
    console.log("line:111", categoryId);
    
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    const fullURL = `${baseURL}`;
    // *works

    try {
      const response = await axios.get<Category>(
        `${fullURL}/category/${categoryId}`,
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch category by ID');
    }
  },
);

export const deleteCategory = createAsyncThunk<
  void,
  { categoryId: number; key: string }
>('categories/deleteCategory', async ({ categoryId, key }) => {
  console.log("line:100", categoryId);
  console.log("line:200", key);
  
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const fullURL = `${baseURL}`;
  // *works

  try {
    await axios.delete(`${fullURL}/category/${categoryId}`, { data: { key } });
  } catch (error) {
    throw new Error('Failed to delete category');
  }
});

export const addCategory = createAsyncThunk<Category, any>(
  'categories/addCategory',
  async (data) => {
    console.log('line:5', data);

    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    const fullURL = `${baseURL}`;
    // *works

    try {
      const response = await axios.post<Category>(`${fullURL}/category`, data, {
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

export const updateCategory = createAsyncThunk<
  Category,
  { categoryId: number; updatedData: any }
>('categories/updateCategory', async ({ categoryId, updatedData }) => {
  console.log('line:1', categoryId);
  console.log('line:2', updatedData);

  try {
    const response = await axios.put<Category>(
      `${fullURL}/category/${categoryId}`,
      updatedData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to update category');
  }
});

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.status = 'succeeded';
          state.categories = action.payload;
        },
      )
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch categories';
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        const { categoryId } = action.meta.arg;
        state.categories = state.categories.filter(
          (category) => category.categoryId !== categoryId,
        );
      })
      .addCase(
        addCategory.fulfilled,
        (state, action: PayloadAction<Category>) => {
          state.categories.push(action.payload);
        },
      )
      .addCase(
        updateCategory.fulfilled,
        (state, action: PayloadAction<Category>) => {
          const index = state.categories.findIndex(
            (category) => category.categoryId === action.payload.categoryId,
          );
          if (index !== -1) {
            state.categories[index] = action.payload;
          }
        },
      )
      .addCase(fetchCategoryById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchCategoryById.fulfilled,
        (state, action: PayloadAction<Category>) => {
          state.status = 'succeeded';
          state.categories = [action.payload];
        },
      )
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch category by ID';
      });
  },
});

export default categorySlice.reducer;
