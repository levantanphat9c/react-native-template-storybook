require('react-native-gesture-handler/jestSetup');

// Simplified react-native-reanimated mock
jest.mock('react-native-reanimated', () => ({
  default: {},
  useSharedValue: jest.fn(() => ({value: 0})),
  useAnimatedStyle: jest.fn(fn => fn()),
  useAnimatedGestureHandler: jest.fn(),
  withTiming: jest.fn(value => value),
  withSpring: jest.fn(value => value),
  runOnJS: jest.fn(fn => fn),
  runOnUI: jest.fn(fn => fn),
  interpolate: jest.fn(),
  Easing: {},
  Extrapolation: {EXTEND: 'extend', CLAMP: 'clamp', IDENTITY: 'identity'},
}));

try {
  jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
} catch (e) {}

jest.mock('@/Hooks/useColor', () => {
  const originalModule = jest.requireActual('@/Hooks/useColor');
  return {
    ...originalModule,
    useColor: jest.fn().mockReturnValue({dynamicColor: 'black', isDark: false}),
  };
});

try {
  jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
} catch (e) {}

// Silence the warning: Animated: `useNativeDriver`
