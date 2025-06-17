import {ImageStyle, TextStyle, ViewStyle} from 'react-native';

import {IColor} from '@/styles';

// Base style types from React Native
export type NamedStyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};

// Style function type that returns named styles
export type StyleFunction<T extends NamedStyles<T>> = (
  themeColor: IColor,
  isDark: boolean,
) => T;

// Return type for style hooks - ensures type safety
export type StyledComponent<T extends NamedStyles<T>> = T;

// Options for different style hooks
export interface ThemedStyleOptions {
  autoScale?: boolean;
  styleId?: string;
}

export interface AdaptiveStyleOptions {
  scaleOnSmallDevices?: boolean;
  scaleOnTablets?: boolean;
  customScaleFactor?: number | null;
  styleId?: string;
}

// Cache related types
export interface StyleCacheInfo {
  size: number;
  keys: string[];
}
