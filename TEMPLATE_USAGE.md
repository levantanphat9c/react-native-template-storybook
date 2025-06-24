# Quick Start Guide

This guide will help you get started with the React Native Template - Storybook.

## 🚀 Quick Installation

```bash
# Create a new project using the template
npx react-native@latest init YourAppName --template https://github.com/yourusername/react-native-template-storybook

# Navigate to your project
cd YourAppName

# Start development
yarn start
```

## 📱 Running Your App

### iOS (macOS only)

```bash
yarn ios
```

### Android

```bash
yarn android
```

## 🔧 Essential Commands

```bash
# Development
yarn start          # Start Metro bundler
yarn ios           # Run on iOS
yarn android       # Run on Android

# Testing
yarn test          # Run tests
yarn test:watch    # Run tests in watch mode

# Code Quality
yarn lint          # Check code style
yarn lint:fix      # Fix code style issues
yarn format        # Format code with Prettier
yarn type-check    # Check TypeScript types

# Clean & Reset
yarn clean         # Clean node_modules and reinstall
yarn clean:android # Clean Android build
yarn clean:ios     # Clean iOS build
```

## 📁 Key Files to Customize

1. **`app.json`** - Update app name and display name
2. **`package.json`** - Update project name and description
3. **`src/Constants/`** - Update app constants
4. **`src/styles/`** - Customize theme and colors
5. **`ios/` and `android/`** - Update bundle identifier/package name

## 🎨 Available Components

```tsx
import { Button, Typography, Modal, Swiper } from './src/Components';

// Use components
<Button title="Press Me" onPress={() => {}} />
<Typography variant="h1">Hello World</Typography>
<Modal visible={true} onClose={() => {}}>Content</Modal>
```

## 🔄 State Management

```tsx
import {useDispatch, useSelector} from 'react-redux';

import {increment} from './src/ReduxSaga/slices/counterSlice';

// Use Redux
const count = useSelector(state => state.counter.value);
const dispatch = useDispatch();

dispatch(increment());
```

## 🧭 Navigation

```tsx
import {useNavigation} from '@react-navigation/native';

// Navigate between screens
const navigation = useNavigation();
navigation.navigate('Profile', {userId: '123'});
```

## 📚 Next Steps

1. Read the full [README.md](README.md) for detailed documentation
2. Check out the [Contributing Guide](CONTRIBUTING.md) if you want to contribute
3. Explore the component examples in `src/Components/`
4. Customize the theme in `src/styles/`

## 🆘 Need Help?

- Check the [Issues](https://github.com/yourusername/react-native-template-storybook/issues) page
- Create a new issue with the bug report template
- Read the troubleshooting section in the README

---

**Happy coding! 🎉**
