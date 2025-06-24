# React Native Template - Storybook

A comprehensive React Native template with modern development setup, Redux Toolkit, Navigation, and best practices.

## 🚀 Features

- **React Native 0.79.3** with TypeScript
- **Redux Toolkit** for state management
- **React Navigation** with bottom tabs and stack navigation
- **Modern Development Tools**:
  - ESLint + Prettier for code formatting
  - Jest for testing
  - TypeScript for type safety
  - Babel module resolver for clean imports
- **Pre-built Components**:
  - Button, Typography, Modal, Swiper
  - Global Loading, TouchableScale, InfiniteSwiper
- **Project Structure**:
  - Organized folder structure
  - Custom hooks and utilities
  - Redux slices with TypeScript
  - Navigation types and configuration

## 📋 Prerequisites

Before using this template, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (>= 18)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)
- [React Native CLI](https://reactnative.dev/docs/environment-setup)
- [Xcode](https://developer.apple.com/xcode/) (for iOS development)
- [Android Studio](https://developer.android.com/studio) (for Android development)

## 🛠️ Installation

### Option 1: Using React Native CLI (Recommended)

```bash
npx react-native@latest init YourProjectName --template https://github.com/yourusername/react-native-template-storybook
```

### Option 2: Manual Setup

1. Clone this template:

```bash
git clone https://github.com/yourusername/react-native-template-storybook.git YourProjectName
cd YourProjectName
```

2. Install dependencies:

```bash
yarn install
# or
npm install
```

3. Install iOS dependencies (macOS only):

```bash
bundle install
bundle exec pod install
```

## 🔧 Configuration

### 1. Update Project Information

Replace the following placeholders in your project:

- `{{PROJECT_NAME}}` in `app.json`
- `{{DISPLAY_NAME}}` in `app.json`
- Update `package.json` name and description
- Update bundle identifier in iOS and Android projects

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
API_BASE_URL=your_api_url_here
API_KEY=your_api_key_here
```

### 3. iOS Configuration

Update the bundle identifier in `ios/Storybook.xcodeproj/project.pbxproj`:

```bash
# Replace 'com.storybook' with your bundle identifier
# Example: com.yourcompany.yourapp
```

### 4. Android Configuration

Update the package name in `android/app/src/main/java/com/storybook/`:

```bash
# Rename the folder structure to match your package name
# Example: com.yourcompany.yourapp
```

## 🏃‍♂️ Running the App

### Start Metro Bundler

```bash
yarn start
# or
npm start
```

### Run on iOS

```bash
yarn ios
# or
npm run ios
```

### Run on Android

```bash
yarn android
# or
npm run android
```

## 📁 Project Structure

```
src/
├── Components/          # Reusable UI components
│   ├── Button/
│   ├── Typography/
│   ├── Modal/
│   ├── Swiper/
│   └── ...
├── Containers/          # Screen components
├── Navigation/          # Navigation configuration
├── ReduxSaga/           # Redux store and slices
├── Services/            # API and external services
├── Hooks/               # Custom React hooks
├── Utils/               # Utility functions
├── Constants/           # App constants
├── Interfaces/          # TypeScript interfaces
└── styles/              # Global styles and themes
```

## 🧪 Testing

```bash
# Run tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage
```

## 🔍 Code Quality

```bash
# Lint code
yarn lint

# Fix linting issues
yarn lint:fix

# Format code
yarn format

# Type checking
yarn type-check
```

## 🧹 Clean Commands

```bash
# Clean node_modules and reinstall
yarn clean

# Clean Android build
yarn clean:android

# Clean iOS build
yarn clean:ios

# Install/Update iOS pods
yarn pod:install
yarn pod:update
```

## 📱 Available Components

### Basic Components

- **Button**: Customizable button component with different variants
- **Typography**: Text components with consistent styling
- **Modal**: Modal component with backdrop and animations
- **Swiper**: Image carousel component
- **InfiniteSwiper**: Infinite scroll carousel
- **TouchableScale**: Touchable component with scale animation
- **GlobalLoading**: Global loading indicator

### Usage Examples

```tsx
import {Button, Typography, Modal} from './src/Components';

// Button usage
<Button
  title="Press Me"
  onPress={() => console.log('Pressed!')}
  variant="primary"
/>

// Typography usage
<Typography variant="h1">Hello World</Typography>

// Modal usage
<Modal visible={isVisible} onClose={() => setIsVisible(false)}>
  <Typography>Modal Content</Typography>
</Modal>
```

## 🔄 State Management

This template uses Redux Toolkit for state management. Example slice:

```tsx
// src/ReduxSaga/slices/counterSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
  },
});

export const {increment, decrement} = counterSlice.actions;
export default counterSlice.reducer;
```

## 🧭 Navigation

The template includes React Navigation with TypeScript support:

```tsx
// Usage in components
import {useNavigation} from '@react-navigation/native';

import {RootStackParamList} from './src/Navigation/types';

// Navigation types
export type RootStackParamList = {
  Home: undefined;
  Profile: {userId: string};
  Settings: undefined;
};

const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
```

## 🎨 Styling

The template includes a comprehensive styling system:

```tsx
// Using the style system
import {useStyle} from './src/Hooks/useStyle';

const styles = useStyle(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
}));
```

## 📦 Dependencies

### Core Dependencies

- React Native 0.79.3
- React Navigation 7.x
- Redux Toolkit 2.x
- React Native Reanimated 3.x
- React Native Gesture Handler 2.x

### Development Dependencies

- TypeScript 5.x
- ESLint + Prettier
- Jest + Testing Library
- Babel module resolver

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/react-native-template-storybook/issues) page
2. Create a new issue with detailed information
3. Contact the maintainers

## 🔄 Updates

To keep your project up to date with the latest template changes:

1. Add this repository as a remote:

```bash
git remote add template https://github.com/yourusername/react-native-template-storybook.git
```

2. Fetch and merge updates:

```bash
git fetch template
git merge template/main
```

---

**Happy Coding! 🎉**
