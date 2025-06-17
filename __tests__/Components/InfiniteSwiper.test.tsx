import {render} from '@testing-library/react-native';
import React from 'react';
import {FlatList, Image, View} from 'react-native';

import InfiniteSwiper from '@/Components/InfiniteSwiper';

describe('InfiniteSwiper', () => {
  it('renders the component', () => {
    const {UNSAFE_getByType} = render(<InfiniteSwiper />);
    const view = UNSAFE_getByType(View);
    expect(view).toBeTruthy();
  });

  it('renders all images', () => {
    const {UNSAFE_getAllByType} = render(<InfiniteSwiper />);
    const images = UNSAFE_getAllByType(Image);
    // We expect 5 images because we add the first and last images for smooth transitions
    expect(images).toHaveLength(7);
  });

  it('has correct container styles', () => {
    const {UNSAFE_getByType} = render(<InfiniteSwiper />);
    const view = UNSAFE_getByType(View);
    expect(view.props.style).toEqual(
      expect.objectContaining({
        flex: 1,
      }),
    );
  });

  it('disables scroll on FlatList', () => {
    const {UNSAFE_getByType} = render(<InfiniteSwiper />);
    const flatList = UNSAFE_getByType(FlatList);
    expect(flatList.props.scrollEnabled).toBe(false);
  });

  it('renders extended assets array', () => {
    const {UNSAFE_getByType} = render(<InfiniteSwiper />);
    const flatList = UNSAFE_getByType(FlatList);
    // We expect 5 items because we add the first and last images for smooth transitions
    expect(flatList.props.data).toHaveLength(7);
  });
});
