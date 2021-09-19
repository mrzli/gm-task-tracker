import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  tasks: [],
};

export const fetchTasks = createAsyncThunk(
  'task/fetchTasks',
  async (userId, { extra }) => {
    return extra.dependencies.api.task.fetchTasks(userId);
  }
);

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

// export const { clearRedirectToHome } = taskSlice.actions;

export const selectTasks = (state) => state.task.tasks;

export const taskReducer = taskSlice.reducer;
