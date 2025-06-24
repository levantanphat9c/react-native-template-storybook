# Contributing to React Native Template - Storybook

Thank you for your interest in contributing to this React Native template! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Issues

Before creating an issue, please:

1. Check if the issue has already been reported
2. Use the issue template provided
3. Include as much detail as possible:
   - React Native version
   - Platform (iOS/Android)
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable

### Suggesting Features

We welcome feature suggestions! Please:

1. Check if the feature has already been requested
2. Explain the use case and benefits
3. Provide examples if possible
4. Consider if it's appropriate for a template (should be generally useful)

### Submitting Pull Requests

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**:
   - Follow the coding standards
   - Add tests for new functionality
   - Update documentation if needed
4. **Test your changes**:
   - Run the linter: `yarn lint`
   - Run tests: `yarn test`
   - Test on both iOS and Android
5. **Commit your changes**: Use conventional commit messages
6. **Push to your branch**: `git push origin feature/amazing-feature`
7. **Create a Pull Request**: Use the PR template

## 📋 Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow ESLint and Prettier configurations
- Use meaningful variable and function names
- Add JSDoc comments for complex functions
- Keep components small and focused

### Component Guidelines

When adding new components:

1. **Create a folder structure**:

   ```
   src/Components/NewComponent/
   ├── index.tsx
   ├── styles.ts
   ├── types.ts (if needed)
   └── __tests__/
       └── NewComponent.test.tsx
   ```

2. **Export from main index**:

   ```tsx
   // src/Components/index.ts
   export {default as NewComponent} from './NewComponent';
   ```

3. **Add tests**:

   ```tsx
   // __tests__/Components/NewComponent.test.tsx
   import {fireEvent, render} from '@testing-library/react-native';
   import React from 'react';

   import {NewComponent} from '../../src/Components';

   describe('NewComponent', () => {
     it('renders correctly', () => {
       const {getByText} = render(<NewComponent />);
       expect(getByText('Expected Text')).toBeTruthy();
     });
   });
   ```

### State Management

When adding Redux slices:

1. **Create slice file**:

   ```tsx
   // src/ReduxSaga/slices/newSlice.ts
   import {createSlice, PayloadAction} from '@reduxjs/toolkit';

   interface NewState {
     // Define state interface
   }

   const initialState: NewState = {
     // Define initial state
   };

   export const newSlice = createSlice({
     name: 'new',
     initialState,
     reducers: {
       // Define reducers
     },
   });

   export const {
     /* actions */
   } = newSlice.actions;
   export default newSlice.reducer;
   ```

2. **Add to store**:

   ```tsx
   // src/ReduxSaga/store.ts
   import newReducer from './slices/newSlice';

   export const store = configureStore({
     reducer: {
       // ... other reducers
       new: newReducer,
     },
   });
   ```

### Navigation

When adding new screens:

1. **Update navigation types**:

   ```tsx
   // src/Navigation/types.ts
   export type RootStackParamList = {
     // ... existing routes
     NewScreen: {param?: string};
   };
   ```

2. **Add to navigator**:

   ```tsx
   // src/Navigation/RootNavigator.tsx
   import NewScreen from '../Containers/NewScreen';

   <Stack.Screen name="NewScreen" component={NewScreen} />;
   ```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage

# Run specific test file
yarn test path/to/test/file.test.tsx
```

### Writing Tests

- Use `@testing-library/react-native` for component testing
- Test user interactions, not implementation details
- Mock external dependencies
- Use descriptive test names
- Group related tests with `describe` blocks

### Test Structure

```tsx
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import React from 'react';

import {ComponentName} from '../ComponentName';

describe('ComponentName', () => {
  it('renders correctly', () => {
    const {getByText} = render(<ComponentName />);
    expect(getByText('Expected Text')).toBeTruthy();
  });

  it('handles user interaction', async () => {
    const onPress = jest.fn();
    const {getByText} = render(<ComponentName onPress={onPress} />);

    fireEvent.press(getByText('Button Text'));

    await waitFor(() => {
      expect(onPress).toHaveBeenCalled();
    });
  });
});
```

## 📚 Documentation

### Updating README

When adding new features:

1. Update the Features section
2. Add usage examples
3. Update the Project Structure section
4. Add any new scripts to the appropriate sections

### Code Comments

- Use JSDoc for function documentation
- Comment complex logic
- Explain why, not what
- Keep comments up to date

## 🔧 Development Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/react-native-template-storybook.git
   cd react-native-template-storybook
   ```

2. **Install dependencies**:

   ```bash
   yarn install
   ```

3. **Install iOS dependencies** (macOS only):

   ```bash
   bundle install
   cd ios && bundle exec pod install && cd ..
   ```

4. **Start development**:
   ```bash
   yarn start
   ```

## 🚀 Release Process

### Versioning

We use [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Checklist

Before releasing:

- [ ] All tests pass
- [ ] Linting passes
- [ ] Documentation is updated
- [ ] CHANGELOG is updated
- [ ] Version is bumped in package.json
- [ ] Template is tested with a new project

## 📞 Getting Help

If you need help:

1. Check the [README.md](README.md)
2. Search existing issues
3. Create a new issue with the "question" label
4. Join our community discussions

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing! 🎉
