import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { message } from 'antd';
// ### - Test
import dotenv from 'dotenv';
dotenv.config();
// ###

interface ResetState {
  loading: boolean;
}

const initialState: ResetState = {
  loading: false,
};

// ### Change it back to local => Port:3005 Step:1

export const requestResetPassword = createAsyncThunk(
  'reset/requestResetPassword',
  async (reqObj: any) => {

    // const baseURL = 'http://localhost:3005';
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    const fullURL = `${baseURL}`;
    // *works

    try {
      const response = await axios.post(
        `${fullURL}/requestResetPassword`
        , reqObj);
      message.success('Go and check your emails for the reset link');
      setTimeout(() => {
        // window.location.href = '/reset/ResetMessage';
      }, 500);
      return response.data;
    } catch (error) {
      throw new Error('Something went wrong, There is no user registered with that email');
    }
  }
);

// ### Change it back to local => Port:3005 Step:2

export const resetPassword = createAsyncThunk(
  'reset/resetPassword',
  async (reqObj: any) => {

    
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    // const baseURL = 'http://localhost:3005';
    const fullURL = `${baseURL}`;
    // *works
    
    try {
      const response = await axios.post(
        `${fullURL}/resetPassword`,
        reqObj);
      message.success('The Password changed successfully !!');
      setTimeout(() => {
        window.location.href = '/reset/SuccessMessage';
      }, 500);
      return response.data;
    } catch (error) {
      throw new Error('Something went wrong');
    }
  }
);

const resetSlice = createSlice({
  name: 'reset',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestResetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(requestResetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(requestResetPassword.rejected, (state) => {
        state.loading = false;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setLoading } = resetSlice.actions;

export default resetSlice.reducer;
