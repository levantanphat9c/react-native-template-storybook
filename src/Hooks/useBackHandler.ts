import {DependencyList, useEffect} from 'react';
import {BackHandler} from 'react-native';

import {IS_ANDROID} from '@/Constants';

/**
 * Hook that handle back press event in android device
 * example
 * useBackHandler(() => {
 * return true
 * }, [])
 */
export const useBackHandler = (
  onBackPress: () => boolean | null | undefined,
  deps: DependencyList,
) => {
  useEffect(() => {
    if (IS_ANDROID) {
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => {
        subscription.remove();
      };
    } else {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deps]);

  return null;
};
