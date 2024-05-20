import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
// ### - Test
import dotenv from 'dotenv';
dotenv.config();
// ###

interface UserPreferenceState {
  userPreference: any; // Adjust this to match your user preference type
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserPreferenceState = {
  userPreference: null,
  status: 'idle',
  error: null,
};

export const fetchUserPreference = createAsyncThunk(
  'userPreference/fetchUserPreference',
  async (userId: string) => {

    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    const fullURL = `${baseURL}`;
    // *works    
    try {
      const response = await axios.get<any>(
        `${fullURL}/user-preference/${userId}`,
      );      
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch user profile');
    }
  },
);

interface UpdateUserPreferencePayload {
  userId: string;
  formData: any; // Adjust this to match your form data type
}

export const updateUserPreference = createAsyncThunk(
  'userPreference/updateUserPreference',
  async ({ userId, formData }: UpdateUserPreferencePayload) => {

    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    const fullURL = `${baseURL}`;
    // *works

    try {
      const response = await axios.put<any>(
        `${fullURL}/user-preference/${userId}`,
        formData,
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to update user profile');
    }
  },
);

const userPreferenceSlice = createSlice({
  name: 'userPreference',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPreference.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserPreference.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.userPreference = action.payload;
      })
      .addCase(fetchUserPreference.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message as string;
      })
      .addCase(updateUserPreference.fulfilled, (state, action) => {
        state.userPreference = action.payload;
      });
  },
});

export default userPreferenceSlice.reducer;
