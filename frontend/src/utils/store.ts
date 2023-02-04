import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './login-reducer';

// https://redux-toolkit.js.org/tutorials/quick-start

export const store = configureStore({
  reducer: {
    loginState: loginReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
