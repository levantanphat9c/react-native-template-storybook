import {useCallback} from 'react';

import {useAppDispatch, useAppSelector} from '@/ReduxSaga/hooks';
import {
  clearLoading,
  startLoading,
  stopLoading,
} from '@/ReduxSaga/slices/loadingSlice';

export const useLoading = () => {
  const dispatch = useAppDispatch();
  const {isLoading, loadingText, loadingTasks} = useAppSelector(
    state => state.loading,
  );

  const showLoading = useCallback(
    (taskId: string, text?: string) => {
      dispatch(startLoading({taskId, text}));
    },
    [dispatch],
  );

  const hideLoading = useCallback(
    (taskId: string) => {
      dispatch(stopLoading({taskId}));
    },
    [dispatch],
  );

  const clearAllLoading = useCallback(() => {
    dispatch(clearLoading());
  }, [dispatch]);

  const withLoading = useCallback(
    async <T>(
      taskId: string,
      asyncFunction: () => Promise<T>,
      loadingText?: string,
    ): Promise<T> => {
      try {
        showLoading(taskId, loadingText);
        const result = await asyncFunction();
        return result;
      } finally {
        hideLoading(taskId);
      }
    },
    [showLoading, hideLoading],
  );

  return {
    isLoading,
    loadingText,
    loadingTasks,
    showLoading,
    hideLoading,
    clearAllLoading,
    withLoading,
  };
};
