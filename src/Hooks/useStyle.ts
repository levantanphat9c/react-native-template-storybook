import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

import {
  AdaptiveStyleOptions,
  NamedStyles,
  StyledComponent,
  StyleFunction,
  ThemedStyleOptions,
} from '@/Interfaces';
import {responsive} from '@/styles';

import {useColor} from './useColor';

// Convert arrays to Sets for O(1) lookup
const SCALABLE_PROPERTIES = new Set([
  'width',
  'height',
  'minWidth',
  'minHeight',
  'maxWidth',
  'maxHeight',
  'padding',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',
  'paddingHorizontal',
  'paddingVertical',
  'margin',
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',
  'marginHorizontal',
  'marginVertical',
  'borderRadius',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
  'borderWidth',
  'borderTopWidth',
  'borderRightWidth',
  'borderBottomWidth',
  'borderLeftWidth',
  'shadowRadius',
  'elevation',
  'top',
  'right',
  'bottom',
  'left',
  'gap',
  'rowGap',
  'columnGap',
]);

const FONT_PROPERTIES = new Set(['fontSize', 'lineHeight', 'letterSpacing']);

// Type-safe cache
const styleCache = new Map<string, any>();
const getCacheKey = (styleId: string, themeName: string, deviceScale: number) =>
  `${styleId}_${themeName}_${deviceScale}`;

// Scale configuration type
interface ScaleConfig {
  scaledSize: (size: number) => number;
  scaledFont: (size: number) => number;
}

// Optimized auto-scale function
// Keys starting with underscore (_) will skip scaling
const autoScaleStyles = <T extends Record<string, any>>(
  styleObj: T,
  scaleConfig: ScaleConfig,
): T => {
  if (typeof styleObj !== 'object' || styleObj === null) {
    return styleObj;
  }

  const scaledStyle = {} as T;
  const {scaledSize, scaledFont} = scaleConfig;

  for (const [key, value] of Object.entries(styleObj)) {
    const typedKey = key as keyof T;

    // Skip scaling for keys that start with underscore
    if (key.startsWith('_')) {
      (scaledStyle as any)[typedKey] = value;
      continue;
    }

    if (typeof value === 'number') {
      if (SCALABLE_PROPERTIES.has(key as any)) {
        (scaledStyle as any)[typedKey] = scaledSize(value);
      } else if (FONT_PROPERTIES.has(key as any)) {
        (scaledStyle as any)[typedKey] = scaledFont(value);
      } else {
        (scaledStyle as any)[typedKey] = value;
      }
    } else if (
      key === 'shadowOffset' &&
      typeof value === 'object' &&
      value !== null
    ) {
      (scaledStyle as any)[typedKey] = {
        width:
          typeof value.width === 'number'
            ? scaledSize(value.width)
            : value.width,
        height:
          typeof value.height === 'number'
            ? scaledSize(value.height)
            : value.height,
      };
    } else if (typeof value === 'object' && value !== null) {
      if (Array.isArray(value)) {
        (scaledStyle as any)[typedKey] = value.map(item =>
          typeof item === 'object' && item !== null
            ? autoScaleStyles(item, scaleConfig)
            : item,
        );
      } else {
        (scaledStyle as any)[typedKey] = autoScaleStyles(value, scaleConfig);
      }
    } else {
      (scaledStyle as any)[typedKey] = value;
    }
  }

  return scaledStyle;
};

// Process styles with caching
const processStyles = <T extends NamedStyles<T>>(
  styleObject: T,
  scaleConfig: ScaleConfig,
  cacheKey: string,
): T => {
  // Check cache first
  if (styleCache.has(cacheKey) && __DEV__ === false) {
    return styleCache.get(cacheKey) as T;
  }

  const processedStyles = {} as T;

  for (const [styleName, styleRules] of Object.entries(styleObject)) {
    const typedStyleName = styleName as keyof T;
    (processedStyles as any)[typedStyleName] = autoScaleStyles(
      styleRules as Record<string, any>,
      scaleConfig,
    );
  }

  // Cache result
  styleCache.set(cacheKey, processedStyles);

  // Prevent memory leak - limit cache size
  if (styleCache.size > 1000) {
    const firstKey = styleCache.keys().next().value;
    if (firstKey) {
      styleCache.delete(firstKey);
    }
  }

  return processedStyles;
};

// Main hook with optimizations
export const useThemedStyles = <T extends NamedStyles<T>>(
  styleFunction: StyleFunction<T> | StyledComponent<T>,
  styleId: string = 'default',
): StyledComponent<T> => {
  const {isDark, dynamicColor} = useColor();

  // Memoize scale config
  const scaleConfig = useMemo<ScaleConfig>(
    () => ({
      scaledSize: responsive.scaledSize,
      scaledFont: responsive.scaledFont,
    }),
    [],
  );

  const styles = useMemo(() => {
    const cacheKey = getCacheKey(
      styleId,
      isDark ? 'dark' : 'light',
      responsive.scale,
    );

    if (typeof styleFunction === 'function') {
      const styleObject = styleFunction(dynamicColor, isDark);
      const processedStyles = processStyles(styleObject, scaleConfig, cacheKey);
      return StyleSheet.create(processedStyles);
    } else {
      const processedStyles = processStyles(
        styleFunction,
        scaleConfig,
        cacheKey,
      );
      return StyleSheet.create(processedStyles);
    }
  }, [dynamicColor, isDark, styleFunction, scaleConfig, styleId]);

  return styles;
};

// Hook for manual control (no auto-scaling)
export const useThemedStylesManual = <T extends NamedStyles<T>>(
  styleFunction: StyleFunction<T> | StyledComponent<T>,
): StyledComponent<T> => {
  const {isDark, dynamicColor} = useColor();

  const styles = useMemo(() => {
    if (typeof styleFunction === 'function') {
      const styleObject = styleFunction(dynamicColor, isDark);
      return StyleSheet.create(styleObject);
    } else {
      return StyleSheet.create(styleFunction);
    }
  }, [dynamicColor, isDark, styleFunction]);

  return styles;
};

// Factory function approach - Better performance
export const createThemedStyles = <T extends NamedStyles<T>>(
  styleFunction: StyleFunction<T> | StyledComponent<T>,
  options: ThemedStyleOptions,
) => {
  const {autoScale = true, styleId = 'default'} = options;

  // Return a hook function with proper typing
  return (): StyledComponent<T> => {
    if (autoScale) {
      return useThemedStyles(styleFunction, styleId);
    } else {
      return useThemedStylesManual(styleFunction);
    }
  };
};

// Advanced hook with conditional scaling
export const useAdaptiveStyles = <T extends NamedStyles<T>>(
  styleFunction: StyleFunction<T>,
  options: AdaptiveStyleOptions,
): StyledComponent<T> => {
  const {
    scaleOnSmallDevices = true,
    scaleOnTablets = false,
    customScaleFactor = null,
    styleId = 'adaptive',
  } = options;

  const {isDark, dynamicColor} = useColor();
  const deviceInfo = responsive.getDeviceInfo();

  // Determine if should scale based on device
  const shouldScale = useMemo(() => {
    if (customScaleFactor !== null) {
      return true;
    }
    if (deviceInfo.isTablet) {
      return scaleOnTablets;
    }
    if (deviceInfo.isSmallDevice) {
      return scaleOnSmallDevices;
    }
    return true;
  }, [deviceInfo, scaleOnSmallDevices, scaleOnTablets, customScaleFactor]);

  // Custom scale config
  const scaleConfig = useMemo<ScaleConfig>(() => {
    const factor = customScaleFactor ?? responsive.scale;
    return {
      scaledSize: (size: number) =>
        shouldScale ? Math.round(size * factor) : size,
      scaledFont: (size: number) =>
        shouldScale ? responsive.scaledFont(size) : size,
    };
  }, [shouldScale, customScaleFactor]);

  const styles = useMemo(() => {
    const cacheKey = getCacheKey(
      `${styleId}_adaptive_${shouldScale}`,
      isDark ? 'dark' : 'light',
      scaleConfig.scaledSize(100), // Use scaled 100 as cache key part
    );

    const styleObject = styleFunction(dynamicColor, isDark);
    const processedStyles = processStyles(styleObject, scaleConfig, cacheKey);
    return StyleSheet.create(processedStyles);
  }, [dynamicColor, isDark, scaleConfig, styleId, shouldScale, styleFunction]);

  return styles;
};

// Utility for clearing style cache (useful for memory management)
export const clearStyleCache = () => {
  styleCache.clear();
};

// Get cache info for debugging
export const getStyleCacheInfo = () => ({
  size: styleCache.size,
  keys: Array.from(styleCache.keys()),
});

/**
1. Simple usage
const styles = useThemedStyles<ComponentStyles>(styleFunction, 'my-id');

2. Factory pattern
const useMyStyles = createThemedStyles<ComponentStyles>(styleFunction, {
  autoScale: true,
  styleId: 'component-id'
});

3. Adaptive scaling
const styles = useAdaptiveStyles<ComponentStyles>(styleFunction, {
  scaleOnSmallDevices: true,
  scaleOnTablets: false,
});

4. Manual control
const styles = useThemedStylesManual<ComponentStyles>(styleFunction);

5. Skip scaling with underscore prefix
const styleFunction = (colors: any) => ({
  container: {
    width: 100,        // Will be scaled
    height: 50,        // Will be scaled
    _width: 100,       // Will NOT be scaled (underscore prefix)
    _customProp: 20,   // Will NOT be scaled (underscore prefix)
  }
});
 */
export default {
  useThemedStyles,
  useThemedStylesManual,
  useAdaptiveStyles,
  createThemedStyles,
  clearStyleCache,
  getStyleCacheInfo,
};
