import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface LoadingState {
  isLoading: boolean;
  loadingText?: string;
  loadingTasks: string[];
}

const initialState: LoadingState = {
  isLoading: false,
  loadingText: undefined,
  loadingTasks: [],
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    startLoading: (
      state,
      action: PayloadAction<{taskId: string; text?: string}>,
    ) => {
      state.loadingTasks.push(action.payload.taskId);
      state.isLoading = true;
      if (action.payload.text) {
        state.loadingText = action.payload.text;
      }
    },
    stopLoading: (state, action: PayloadAction<{taskId: string}>) => {
      state.loadingTasks = state.loadingTasks.filter(
        task => task !== action.payload.taskId,
      );
      if (state.loadingTasks.length === 0) {
        state.isLoading = false;
        state.loadingText = undefined;
      }
    },
    clearLoading: state => {
      state.isLoading = false;
      state.loadingText = undefined;
      state.loadingTasks = [];
    },
  },
});

export const {startLoading, stopLoading, clearLoading} = loadingSlice.actions;
export default loadingSlice.reducer;
