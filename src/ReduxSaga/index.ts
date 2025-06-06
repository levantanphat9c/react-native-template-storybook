export {store} from './store';
export type {RootState, AppDispatch} from './store';
export {useAppSelector, useAppDispatch} from './hooks';

// Export actions
export {
  increment,
  decrement,
  incrementByAmount,
  reset,
} from './slices/counterSlice';
export {setLoading, setUser, setError, clearUser} from './slices/userSlice';
