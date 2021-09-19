import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LocalStorageKey } from '../browser/local-storage-key';

const initialState = {
  isLoading: false,
  redirectToHome: false,
  user: undefined,
};

export const register = createAsyncThunk(
  'auth/register',
  async (data, { extra }) => {
    return extra.dependencies.api.auth.register(data);
  }
);

export const login = createAsyncThunk('auth/login', async (data, { extra }) => {
  const result = await extra.dependencies.api.auth.login(data);
  extra.dependencies.localStorageWrapper.set(
    LocalStorageKey.AuthToken,
    result.token
  );
  return result;
});

export const fetchUser = createAsyncThunk(
  'auth/user',
  async (_arg, { extra }) => {
    return extra.dependencies.api.auth.fetchUser();
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_arg, { extra }) => {
    return extra.dependencies.api.auth.logout();
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearRedirectToHome(state) {
      state.redirectToHome = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.redirectToHome = true;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { clearRedirectToHome } = authSlice.actions;

export const authReducer = authSlice.reducer;
