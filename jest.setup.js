require('react-native-gesture-handler/jestSetup');

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

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
