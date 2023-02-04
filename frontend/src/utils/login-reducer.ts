 import { createSlice } from '@reduxjs/toolkit'
 import type { PayloadAction } from '@reduxjs/toolkit'

// See: https:redux.js.org/tutorials/essentials/part-1-overview-concepts
// See: https://redux-toolkit.js.org/tutorials/quick-start
// The idea is basically the same as in the Counter example.

export interface LoginState {
  username?: string | undefined;
  status: 'loggedOut' | 'loggedIn';
  token?: string | undefined;
}

const initialState: LoginState = {
  status: 'loggedOut',
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginState>) => {
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.status = action.payload.status;
    },
    logout: (state) => {
      state.username = undefined;
      state.token = undefined;
      state.status = 'loggedOut';
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer

