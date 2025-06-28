import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';

import ErrorBoundary from '@/Components/ErrorBoundary';

// Component để test error
const ThrowError = ({shouldThrow}: {shouldThrow: boolean}) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return null;
};

describe('ErrorBoundary', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders children when there is no error', () => {
    const {getByText} = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>,
    );

    expect(() => getByText('Test error')).toThrow();
  });

  it('renders error UI when there is an error', () => {
    const {getByText} = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>,
    );

    expect(getByText('Oops! Something went wrong')).toBeTruthy();
    expect(getByText('Test error')).toBeTruthy();
    expect(getByText('Try Again')).toBeTruthy();
  });

  it('calls retry when Try Again button is pressed', () => {
    const {getByText} = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>,
    );

    const retryButton = getByText('Try Again');
    fireEvent.press(retryButton);

    // Error should be cleared after retry
    expect(() => getByText('Oops! Something went wrong')).toThrow();
  });

  it('renders custom fallback when provided', () => {
    const CustomFallback = () => <div>Custom error UI</div>;

    const {getByText} = render(
      <ErrorBoundary fallback={<CustomFallback />}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>,
    );

    expect(getByText('Custom error UI')).toBeTruthy();
  });
});
