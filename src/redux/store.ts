import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import profileReducer from '@/src/redux/slices/profileSlice';
import preferenceReducer from '@/src/redux/slices/userPreferenceSlice';
import productsReducer from '@/src/redux/slices/productSlice';
import categoriesReducer from '@/src/redux/slices/categorySlice';
import counterReducer from '@/src/redux/slices/counterSlice';
import resetReducer from '@/src/redux/slices/resetSlice';
import notificationReducer from '@/src/redux/slices/notificationSlice';
import userReducer from '@/src/redux/slices/userSlice';

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    preference: preferenceReducer,
    products: productsReducer,
    counter: counterReducer,
    reset: resetReducer,
    notification: notificationReducer,
    categories: categoriesReducer,
    users: userReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
