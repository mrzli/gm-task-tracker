import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  pieceOfInformation: '',
};

export const fetchExampleData = createAsyncThunk(
  'example/fetchExampleData',
  async (_arg, { extra }) => {
    return extra.dependencies.api.example.fetchExampleData();
  }
);

export const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchExampleData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchExampleData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pieceOfInformation = action.payload;
      })
      .addCase(fetchExampleData.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const exampleReducer = exampleSlice.reducer;
