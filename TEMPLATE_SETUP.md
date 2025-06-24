# Template Setup Guide

This document explains how to use this React Native template to create new projects.

## 🎯 What This Template Provides

This template includes:

- **React Native 0.79.3** with TypeScript
- **Redux Toolkit** for state management
- **React Navigation** with type-safe navigation
- **Pre-built UI Components** (Button, Typography, Modal, Swiper, etc.)
- **Modern Development Setup** (ESLint, Prettier, Jest, Babel)
- **Organized Project Structure** with best practices
- **Comprehensive Testing** setup
- **Theme and Styling System**

## 🚀 How to Use This Template

### Option 1: Using React Native CLI (Recommended)

```bash
# Create a new project using the template
npx react-native@latest init YourAppName --template https://github.com/yourusername/react-native-template-storybook

# Navigate to your project
cd YourAppName

# Install dependencies (if not done automatically)
yarn install

# Start development
yarn start
```

### Option 2: Manual Setup

```bash
# Clone the template
git clone https://github.com/yourusername/react-native-template-storybook.git YourAppName
cd YourAppName

# Remove git history
rm -rf .git

# Initialize new git repository
git init
git add .
git commit -m "Initial commit"

# Install dependencies
yarn install

# Install iOS dependencies (macOS only)
bundle install
cd ios && bundle exec pod install && cd ..
```

## 🔧 Post-Setup Configuration

After creating your project, you need to update several files:

### 1. Update Project Information

**`app.json`**:

```json
{
  "name": "your-app-name",
  "displayName": "Your App Name"
}
```

**`package.json`**:

```json
{
  "name": "your-app-name",
  "description": "Your app description",
  "author": "Your Name"
}
```

### 2. Update Bundle Identifiers

**iOS** (`ios/Storybook.xcodeproj/project.pbxproj`):

- Replace `com.storybook` with your bundle identifier
- Example: `com.yourcompany.yourapp`

**Android** (`android/app/src/main/java/com/storybook/`):

- Rename the folder structure to match your package name
- Example: `com.yourcompany.yourapp`

### 3. Environment Configuration

Create a `.env` file based on `env.example`:

```bash
cp env.example .env
# Edit .env with your actual values
```

### 4. Update App Constants

Edit `src/Constants/index.ts`:

```typescript
export const APP_NAME = 'Your App Name';
export const APP_VERSION = '1.0.0';
// Add your app-specific constants
```

### 5. Customize Theme

Edit `src/styles/colorsManager.ts`:

```typescript
export const colors = {
  primary: '#your-primary-color',
  secondary: '#your-secondary-color',
  // Customize your color palette
};
```

## 📱 Running Your App

### Development

```bash
# Start Metro bundler
yarn start

# Run on iOS (macOS only)
yarn ios

# Run on Android
yarn android
```

### Testing

```bash
# Run tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage
```

### Code Quality

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

## 🏗️ Project Structure

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

## 🎨 Using Components

```tsx
import { Button, Typography, Modal } from './src/Components';

// Button with variants
<Button
  title="Press Me"
  onPress={() => console.log('Pressed!')}
  variant="primary"
/>

// Typography with consistent styling
<Typography variant="h1">Hello World</Typography>

// Modal with animations
<Modal visible={isVisible} onClose={() => setIsVisible(false)}>
  <Typography>Modal Content</Typography>
</Modal>
```

## 🔄 State Management

```tsx
import {useDispatch, useSelector} from 'react-redux';

import {increment} from './src/ReduxSaga/slices/counterSlice';

// Use Redux in components
const count = useSelector(state => state.counter.value);
const dispatch = useDispatch();

const handleIncrement = () => {
  dispatch(increment());
};
```

## 🧭 Navigation

```tsx
import {useNavigation} from '@react-navigation/native';

import {RootStackParamList} from './src/Navigation/types';

// Type-safe navigation
const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

// Navigate with parameters
navigation.navigate('Profile', {userId: '123'});
```

## 🧪 Adding Tests

```tsx
// __tests__/Components/YourComponent.test.tsx
import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';

import {YourComponent} from '../../src/Components';

describe('YourComponent', () => {
  it('renders correctly', () => {
    const {getByText} = render(<YourComponent />);
    expect(getByText('Expected Text')).toBeTruthy();
  });
});
```

## 📦 Adding Dependencies

```bash
# Add new dependencies
yarn add package-name

# Add development dependencies
yarn add -D package-name

# For iOS native dependencies (macOS only)
cd ios && bundle exec pod install && cd ..
```

## 🔍 Troubleshooting

### Common Issues

1. **Metro bundler issues**:

   ```bash
   yarn start --reset-cache
   ```

2. **iOS build issues**:

   ```bash
   cd ios && bundle exec pod install && cd ..
   yarn clean:ios
   ```

3. **Android build issues**:

   ```bash
   yarn clean:android
   ```

4. **TypeScript errors**:
   ```bash
   yarn type-check
   ```

### Getting Help

- Check the [README.md](README.md) for detailed documentation
- Look at the [Troubleshooting](README.md#troubleshooting) section
- Create an issue with the bug report template
- Check existing issues for similar problems

## 🎉 Next Steps

1. **Explore the Components**: Check out the pre-built components in `src/Components/`
2. **Customize the Theme**: Update colors and styles in `src/styles/`
3. **Add Your Screens**: Create new screens in `src/Containers/`
4. **Set Up API**: Configure API services in `src/Services/`
5. **Add Tests**: Write tests for your components and logic
6. **Deploy**: Follow React Native deployment guides for iOS and Android

---

**Your React Native app is ready to go! 🚀**
