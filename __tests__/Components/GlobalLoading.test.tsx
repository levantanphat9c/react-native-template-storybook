import {act, render} from '@testing-library/react-native';
import React from 'react';

import GlobalLoading, {
  globalLoading,
  globalLoadingRef,
} from '@/Components/GlobalLoading';

jest.useFakeTimers();

describe('GlobalLoading', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders nothing when not visible', () => {
    const {container} = render(<GlobalLoading visible={false} />);
    expect(container.children.length).toBe(0);
  });

  it('renders loading indicator when visible', () => {
    const {getByText} = render(<GlobalLoading visible={true} />);
    expect(getByText('Đang tải...')).toBeTruthy();
  });

  it('shows loading when globalLoading.show is called', () => {
    render(<GlobalLoading ref={globalLoadingRef} />);

    act(() => {
      globalLoading.show();
    });

    const {getByText} = render(<GlobalLoading ref={globalLoadingRef} />);
    expect(getByText('Đang tải...')).toBeTruthy();
  });

  it('hides loading when globalLoading.hide is called', () => {
    render(<GlobalLoading ref={globalLoadingRef} />);

    act(() => {
      globalLoading.show();
      globalLoading.hide();
    });

    const {container} = render(<GlobalLoading ref={globalLoadingRef} />);
    expect(container.children.length).toBe(0);
  });

  it('auto-hides after timeout', () => {
    render(<GlobalLoading ref={globalLoadingRef} />);

    act(() => {
      globalLoading.show(1000);
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    const {container} = render(<GlobalLoading ref={globalLoadingRef} />);
    expect(container.children.length).toBe(0);
  });

  it('shows and hides using ref methods', () => {
    const ref = React.createRef();
    const {getByText, container} = render(<GlobalLoading ref={ref} />);

    act(() => {
      ref.current?.show();
    });
    expect(getByText('Đang tải...')).toBeTruthy();

    act(() => {
      ref.current?.hide();
    });
    expect(container.children.length).toBe(0);
  });
});
