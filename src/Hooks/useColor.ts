import {useTheme} from '@react-navigation/native';

import {DarkMode, LightMode} from '@/styles';

/**
 * Hook that check dark light mode and return correct color set
 * example
 * const {dynamicColor, isLight} = useColor();
 */
export const useColor = () => {
  const theme = useTheme();
  const isDark = theme.dark;
  const dynamicColor = isDark ? DarkMode : LightMode;
  return {dynamicColor, isDark, theme};
};
