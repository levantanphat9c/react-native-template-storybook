import {TextStyle} from 'react-native';

import {IS_ANDROID} from '@/Constants';
import {createThemedStyles} from '@/Hooks';

import {TYPOGRAPHY_VARIANT} from './type';

// Base typography configuration
const BASE_TYPOGRAPHY = {
  fontSizes: {
    10: 10,
    11: 11,
    12: 12,
    13: 13,
    14: 14,
    15: 15,
    16: 16,
    18: 18,
    20: 20,
    22: 22,
    24: 24,
    28: 28,
    40: 40,
    44: 44,
  } as const,
  lineHeights: {
    10: 12,
    11: 16,
    12: 18,
    13: 20,
    14: 20,
    15: 20,
    16: 26,
    18: 26,
    20: 28,
    22: 30,
    24: 30,
    28: 36,
    40: 48,
    44: 48,
  } as const,
  weights: {
    BOLD: IS_ANDROID ? undefined : '700',
    MEDIUM: '500',
    REGULAR: '400',
  } as const,
  fontFamilies: {
    BOLD: IS_ANDROID ? 'Lato-Bold' : 'Lato-Regular',
    MEDIUM: IS_ANDROID ? 'Lato-Medium' : 'Lato-Regular',
    REGULAR: 'Lato-Regular',
  } as const,
};

type FontSize = keyof typeof BASE_TYPOGRAPHY.fontSizes;
type TypographyVariant = keyof typeof TYPOGRAPHY_VARIANT;
interface TypographyStyles extends Record<TypographyVariant, TextStyle> {
  container: TextStyle;
  secureTextEntryIconContainer: TextStyle;
}

// Generate typography styles
const generateTypographyStyles = (): TypographyStyles => {
  const styles: Partial<TypographyStyles> = {
    container: {
      textAlignVertical: 'center' as const,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    },
    secureTextEntryIconContainer: {
      flexDirection: 'row' as const,
    },
  };

  // Generate BOLD variants
  Object.entries(BASE_TYPOGRAPHY.fontSizes).forEach(([size, fontSize]) => {
    const variant = `BOLD_${size}` as TypographyVariant;
    const typedSize = Number(size) as FontSize;
    styles[variant] = {
      fontSize,
      fontWeight: BASE_TYPOGRAPHY.weights.BOLD,
      lineHeight: BASE_TYPOGRAPHY.lineHeights[typedSize],
      fontFamily: BASE_TYPOGRAPHY.fontFamilies.BOLD,
    };
  });

  // Generate MEDIUM variants
  Object.entries(BASE_TYPOGRAPHY.fontSizes)
    .filter(([size]) =>
      ['11', '12', '13', '14', '15', '16', '18', '20', '24'].includes(size),
    )
    .forEach(([size, fontSize]) => {
      const variant = `MEDIUM_${size}` as TypographyVariant;
      const typedSize = Number(size) as FontSize;
      styles[variant] = {
        fontSize,
        fontWeight: BASE_TYPOGRAPHY.weights.MEDIUM,
        lineHeight: BASE_TYPOGRAPHY.lineHeights[typedSize],
        fontFamily: BASE_TYPOGRAPHY.fontFamilies.MEDIUM,
      };
    });

  // Generate REGULAR variants
  Object.entries(BASE_TYPOGRAPHY.fontSizes)
    .filter(([size]) =>
      ['11', '12', '13', '14', '15', '16', '18', '20'].includes(size),
    )
    .forEach(([size, fontSize]) => {
      const variant = `REGULAR_${size}` as TypographyVariant;
      const typedSize = Number(size) as FontSize;
      styles[variant] = {
        fontSize,
        fontWeight: BASE_TYPOGRAPHY.weights.REGULAR,
        lineHeight: BASE_TYPOGRAPHY.lineHeights[typedSize],
        fontFamily: BASE_TYPOGRAPHY.fontFamilies.REGULAR,
      };
    });

  return styles as TypographyStyles;
};

const TypographyStyles = generateTypographyStyles();
export const textStyle = createThemedStyles(TypographyStyles, {
  styleId: 'typography',
});

export default textStyle;
