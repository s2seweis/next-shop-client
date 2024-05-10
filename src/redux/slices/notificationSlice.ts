import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Key } from 'react';

interface Notification {
    id: Key | null | undefined;
    createdAt: string | number | Date;
    messageId: string;
    title: string;
    body: string;
    read: boolean
    // Add any other properties you need
}

interface NotificationState {
    notifications: Notification[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: NotificationState = {
    notifications: [],
    status: 'idle',
    error: null,
};

// Thunk to mark notifications as read
export const markNotificationsAsRead = createAsyncThunk<void>(
    'notifications/markNotificationsAsRead',
    async () => {
      try {
        await axios.post<void>('http://localhost:3005/notification/read');
      } catch (error) {
        throw new Error('Failed to mark notifications as read');
      }
    },
  );
  

export const fetchNotifications = createAsyncThunk<Notification[]>(
    'notifications/fetchNotifications',
    async () => {
        try {
            const response = await axios.get<Notification[]>('http://localhost:3005/notification');
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch notifications');
        }
    },
);

export const addNotification = createAsyncThunk<Notification, Notification>(
    'notifications/addNotification',
    async (notification, thunkAPI) => {
        console.log("line:222", notification);
        
        try {
            // Assuming you have an endpoint to add a new notification
            const response = await axios.post<Notification>('https://your-api-url/add-notification', notification);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('Failed to add notification');
        }
    },
);

export const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        // Add reducer functions here if needed
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotifications.pending, (state) => {
                state.status = 'loading';
                state.error = null; // Clear error when starting a new fetch request
            })
            .addCase(fetchNotifications.fulfilled, (state, action: PayloadAction<Notification[]>) => {
                state.status = 'succeeded';
                state.notifications = action.payload;
            })
            .addCase(fetchNotifications.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Unknown error';
            })
            .addCase(addNotification.fulfilled, (state, action: PayloadAction<Notification>) => {
                state.notifications.push(action.payload);
            })
            .addCase(addNotification.rejected, (state, action) => {
                state.error = action.payload as string; // Set error message from rejected value
            });
    },
});

export const { clearError } = notificationSlice.actions;

export default notificationSlice.reducer;
