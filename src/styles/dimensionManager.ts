import {Dimensions, PixelRatio} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

// Design dimensions (base design size)
const BASE_WIDTH = 375; // iPhone SE/8 width
const BASE_HEIGHT = 667; // iPhone SE/8 height

// Scale factors
const widthScale = SCREEN_WIDTH / BASE_WIDTH;
const heightScale = SCREEN_HEIGHT / BASE_HEIGHT;

// Use minimum scale to maintain aspect ratio
const scale = Math.min(widthScale, heightScale);

// Responsive functions
export const wp = (percentage: number) => {
  const value = (percentage * SCREEN_WIDTH) / 100;
  return Math.round(PixelRatio.roundToNearestPixel(value));
};

export const hp = (percentage: number) => {
  const value = (percentage * SCREEN_HEIGHT) / 100;
  return Math.round(PixelRatio.roundToNearestPixel(value));
};

export const scaledSize = (size: number) => {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export const moderateScale = (size: number, factor = 0.5) => {
  const newSize = size + (scaledSize(size) - size) * factor;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

// Font scaling
export const scaledFont = (size: number) => {
  return moderateScale(size, 0.3);
};

// Get device info
export const getDeviceInfo = () => {
  const pixelDensity = PixelRatio.get();
  const isTablet = SCREEN_WIDTH >= 768;
  const isSmallDevice = SCREEN_WIDTH < 360;
  const isLargeDevice = SCREEN_WIDTH > 414;

  return {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    pixelDensity,
    isTablet,
    isSmallDevice,
    isLargeDevice,
    scale,
    widthScale,
    heightScale,
  };
};

// Responsive object with all utilities
export const responsive = {
  wp,
  hp,
  scaledSize,
  moderateScale,
  scaledFont,
  getDeviceInfo,
  // Direct access to values
  screenWidth: SCREEN_WIDTH,
  screenHeight: SCREEN_HEIGHT,
  scale,
  widthScale,
  heightScale,
};

export type TResponsive = typeof responsive;
