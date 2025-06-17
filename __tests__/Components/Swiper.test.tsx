import {render} from '@testing-library/react-native';
import React from 'react';
import {FlatList, View} from 'react-native';

import Swiper, {assets} from '@/Components/Swiper';

// Mock the Dimensions
jest.mock('react-native', () => ({
  ...jest.requireActual('react-native'),
  Dimensions: {
    get: jest.fn().mockReturnValue({width: 375, height: 812}),
  },
}));

// Mock the assets
jest.mock('@/Components/Swiper', () => {
  const originalModule = jest.requireActual('@/Components/Swiper');
  return {
    ...originalModule,
    assets: [
      {uri: 'mock-image-1'},
      {uri: 'mock-image-2'},
      {uri: 'mock-image-3'},
    ],
  };
});

describe('Swiper', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component', () => {
    const {UNSAFE_getByType} = render(<Swiper />);
    const view = UNSAFE_getByType(View);
    expect(view).toBeTruthy();
  });

  it('renders all images', () => {
    const {getAllByRole} = render(<Swiper />);
    const images = getAllByRole('image');
    expect(images).toHaveLength(assets.length);
  });

  it('has correct container styles', () => {
    const {UNSAFE_getByType} = render(<Swiper />);
    const view = UNSAFE_getByType(View);
    expect(view.props.style).toEqual(
      expect.objectContaining({
        flex: 1,
      }),
    );
  });

  it('has correct picture styles', () => {
    const {getAllByRole} = render(<Swiper />);
    const pictures = getAllByRole('none');
    pictures.forEach(picture => {
      expect(picture.props.style).toEqual(
        expect.objectContaining({
          width: 375,
          height: 812,
          overflow: 'hidden',
        }),
      );
    });
  });

  it('has correct image styles', () => {
    const {getAllByRole} = render(<Swiper />);
    const images = getAllByRole('image');
    images.forEach(image => {
      expect(image.props.style).toEqual(
        expect.objectContaining({
          width: undefined,
          height: undefined,
        }),
      );
    });
  });

  it('disables scroll on FlatList', () => {
    const {UNSAFE_getByType} = render(<Swiper />);
    const flatList = UNSAFE_getByType(FlatList);
    expect(flatList.props.scrollEnabled).toBe(false);
  });

  it('renders all assets', () => {
    const {UNSAFE_getByType} = render(<Swiper />);
    const flatList = UNSAFE_getByType(FlatList);
    expect(flatList.props.data).toHaveLength(assets.length);
  });

  it('has correct keyExtractor', () => {
    const {UNSAFE_getByType} = render(<Swiper />);
    const flatList = UNSAFE_getByType(FlatList);
    const item = {uri: 'test-image'};
    expect(flatList.props.keyExtractor(item)).toBe(item.toString());
  });
});
