import {LightMode, DarkMode} from '@/styles';
import {useTheme} from '@react-navigation/native';

/**
 * Hook that check dark light mode and return correct color set
 * example
 * const {dynamicColor, isLight} = useColor();
 */
export const useColor = () => {
  const isLight = useTheme();
  const dynamicColor = isLight ? LightMode : DarkMode;
  return {dynamicColor, isLight};
};
