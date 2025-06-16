import {useEffect, useRef} from 'react';
import {AppState, AppStateStatus} from 'react-native';

/**
 * Hook that handle app state change in App
 * example
 * const {previousAppState} = useAppStateChange((appState, prevAppState) => {
 * console.log('app state change');});
 */
export const useAppStateChange = (
  onHandleAppStateChange: (
    nextAppState: AppStateStatus,
    prevAppState: AppStateStatus,
  ) => void,
  _delay = 1000,
) => {
  const previousAppState = useRef<AppStateStatus>('active');

  useEffect(() => {
    //handle foreground background
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      onHandleAppStateChange(nextAppState, previousAppState.current);
      previousAppState.current = nextAppState;
    };
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, [onHandleAppStateChange]);

  return {previousAppState};
};
