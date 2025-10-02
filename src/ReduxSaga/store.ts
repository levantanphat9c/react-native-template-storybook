import {configureStore, Middleware} from '@reduxjs/toolkit';

import {globalErrorHandler} from '@/Components/ErrorBoundary/globalErrorHandler';

import counterSlice from './slices/counterSlice';
import loadingSlice from './slices/loadingSlice';
import userSlice from './slices/userSlice';

export const errorMiddleware: Middleware = () => next => action => {
  try {
    return next(action);
  } catch (error) {
    globalErrorHandler.reportError(
      error as Error,
      `Redux Action: ${(action as {type: string}).type}`,
    );
    throw error; // Re-throw để không break Redux flow
  }
};

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    user: userSlice,
    loading: loadingSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(errorMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
