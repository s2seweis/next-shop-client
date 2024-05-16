import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { message } from 'antd';

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
    try {
      const response = await axios.post('https://nextjs-server-demo-here-9e97c1fb79e3.herokuapp.com/requestResetPassword', reqObj);
      // const response = await axios.post('http://localhost:3005/requestResetPassword', reqObj);
      message.success('Go and check your emails for the reset link');
      setTimeout(() => {
        window.location.href = '/reset/ResetMessage';
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
    console.log("line:500", reqObj);
    
    try {
      const response = await axios.post('https://nextjs-server-demo-here-9e97c1fb79e3.herokuapp.com/resetPassword', reqObj);
      // const response = await axios.post('http://localhost:3005/resetPassword', reqObj);
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
