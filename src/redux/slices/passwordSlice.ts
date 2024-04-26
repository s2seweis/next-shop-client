import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface PasswordState {
  password: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: PasswordState = {
  password: null,
  status: 'idle',
  error: null,
};

export const fetchPassword = createAsyncThunk(
  'password/fetchPassword',
  async (userId: string) => {
    try {
      const response = await axios.get<string>(
        `http://localhost:3005/password/${userId}`,
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch user password');
    }
  },
);

interface UpdatePasswordPayload {
  userId: string;
  formData: any; // Adjust this to match your form data type
}

export const updatePassword = createAsyncThunk(
  'password/updatePassword',
  async ({ userId, formData }: UpdatePasswordPayload) => {
    try {
      const response = await axios.put<string>(
        `http://localhost:3005/password/${userId}`,
        formData,
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to update user password');
    }
  },
);

const passwordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPassword.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPassword.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = 'succeeded';
        state.password = action.payload;
      })
      .addCase(fetchPassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message as string;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.password = action.payload;
      });
  },
});

export default passwordSlice.reducer;
