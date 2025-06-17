import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {Text} from 'react-native';

import TouchableScale from '@/Components/TouchableScale';

describe('TouchableScale', () => {
  it('renders children correctly', () => {
    const {getByText} = render(
      <TouchableScale>
        <Text>Test Button</Text>
      </TouchableScale>,
    );
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('calls onPressIn when pressed', () => {
    const onPressMock = jest.fn();
    const {getByText} = render(
      <TouchableScale onPress={onPressMock}>
        <Text>Test Button</Text>
      </TouchableScale>,
    );

    fireEvent.press(getByText('Test Button'));
    expect(onPressMock).toHaveBeenCalled();
  });

  it('calls onPressOut when released', () => {
    const onPressOutMock = jest.fn();
    const {getByText} = render(
      <TouchableScale onPress={onPressOutMock}>
        <Text>Test Button</Text>
      </TouchableScale>,
    );

    fireEvent.press(getByText('Test Button'));
    expect(onPressOutMock).toHaveBeenCalled();
  });

  it('applies custom style', () => {
    const customStyle = {backgroundColor: 'red'};
    const {getByTestId} = render(
      <TouchableScale style={customStyle} testID="touchable">
        <Text>Test Button</Text>
      </TouchableScale>,
    );

    const component = getByTestId('touchable');
    expect(component).toHaveStyle(customStyle);
  });

  it('uses default props correctly', () => {
    const {getByTestId} = render(
      <TouchableScale testID="touchable">
        <Text>Test Button</Text>
      </TouchableScale>,
    );

    const component = getByTestId('touchable');
    expect(component).toBeOnTheScreen();
  });
});
