import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// ### - Test
import dotenv from 'dotenv';
dotenv.config();
// ###

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const fullURL = `${baseURL}`;
// *works

interface User {
  userId: number;
  fullName: string;
  profilePictureUrl: string;
  email: string;
  username: string;
  role: string;
  blocked: boolean;
}

interface UserState {
  users: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  users: [],
  status: 'idle',
  error: null,
};

export const fetchUsers = createAsyncThunk<User[]>(
  'users/fetchUsers',
  async () => {
    try {
      const response = await axios.get<User[]>(`${fullURL}/users`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch users');
    }
  },
);

export const fetchUserById = createAsyncThunk<User, string>(
  'users/fetchUserById',
  async (userId) => {
    console.log('line:111', userId);

    try {
      const response = await axios.get<User>(`${fullURL}/users/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch user by ID');
    }
  },
);

export const deleteUser = createAsyncThunk<void, { userId: number }>(
  'users/deleteUser',
  async ({ userId }) => {
    console.log('line:1001', userId);

    try {
      await axios.delete(`${fullURL}/users/${userId}`);
    } catch (error) {
      throw new Error('Failed to delete user');
    }
  },
);

export const updateUser = createAsyncThunk<
  User,
  { userId: number; updatedData: any }
>('users/updateUser', async ({ userId, updatedData }) => {
  console.log('line:1', userId);
  console.log('line:2', updatedData);

  try {
    const response = await axios.put<User>(
      `${fullURL}/users/${userId}`,
      updatedData,
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to update user');
  }
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch users';
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const { userId } = action.meta.arg;
        state.users = state.users.filter((user) => user.userId !== userId);
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        const index = state.users.findIndex(
          (user) => user.userId === action.payload.userId,
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(fetchUserById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchUserById.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.status = 'succeeded';
          state.users = [action.payload];
        },
      )
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch User by ID';
      });
  },
});

export default userSlice.reducer;
