import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import profileReducer from '@/src/redux/slices/profileSlice';
import preferenceReducer from '@/src/redux/slices/userPreferenceSlice';
import productsReducer from '@/src/redux/slices/productSlice';
import counterReducer from '@/src/redux/slices/counterSlice';

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    preference: preferenceReducer,
    products: productsReducer,
    counter: counterReducer
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
