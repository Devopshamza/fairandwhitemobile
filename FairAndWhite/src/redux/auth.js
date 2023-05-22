import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authenticated: false,
    authenticating: false,
    user: {},
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.authenticated = true;
      state.authenticating = false;
    },
    authenticateUser(state, {payload}) {
      state.authenticating = payload.authenticating;
      state.authenticated = payload.authenticated;
    },
    logoutUser(state) {
      state.authenticated = false;
      state.user = {};
    },
  },
});
export const {setUser, authenticateUser, logoutUser} = authSlice.actions;
export default authSlice.reducer;
