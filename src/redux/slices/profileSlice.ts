import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
// ### - Test
import dotenv from 'dotenv';
dotenv.config();
// ###

export interface PreferenceState {
  userProfile: any;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: PreferenceState = {
  userProfile: null,
  status: 'idle',
  error: null,
};

export const fetchUserProfile = createAsyncThunk(
  'userProfile/fetchUserProfile',
  async (userId: string) => {

    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    const fullURL = `${baseURL}`;
    // *works

    try {
      const response = await axios.get(
        `${fullURL}/users/${userId}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch user profile');
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'userProfile/updateUserProfile',
  async ({ userId, formData }: { userId: string; formData: any }) => {

    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    const fullURL = `${baseURL}`;
    // *works

    try {
      const response = await axios.put(
        `${fullURL}/users/${userId}`,
        formData
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to update user profile');
    }
  }
);

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.userProfile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch user profile';
      })
      .addCase(updateUserProfile.fulfilled, (state, action: PayloadAction<any>) => {
        state.userProfile = action.payload;
      });
  },
});

export default userProfileSlice.reducer;
