import {render} from '@testing-library/react-native';
import React from 'react';

import Typography from '@/Components/Typography';
import {TYPOGRAPHY_VARIANT} from '@/Components/Typography/type';

describe('Typography', () => {
  it('renders text with default variant', () => {
    const {getByText} = render(<Typography>Test Text</Typography>);
    const text = getByText('Test Text');
    expect(text).toBeTruthy();
  });

  it('renders text with custom variant', () => {
    const {getByText} = render(
      <Typography variant={TYPOGRAPHY_VARIANT.BOLD_14}>Test Text</Typography>,
    );
    const text = getByText('Test Text');
    expect(text).toBeTruthy();
  });

  it('renders text with custom color', () => {
    const customColor = '#FF0000';
    const {getByText} = render(
      <Typography color={customColor}>Test Text</Typography>,
    );
    const text = getByText('Test Text');
    expect(text.props.style).toContainEqual({color: customColor});
  });

  it('renders text with custom style', () => {
    const customStyle = {fontSize: 20};
    const {getByText} = render(
      <Typography style={customStyle}>Test Text</Typography>,
    );
    const text = getByText('Test Text');
    expect(text.props.style).toContainEqual(customStyle);
  });

  it('renders parsed text when parse prop is provided', () => {
    const parse = [
      {
        pattern: /@(\w+)/,
        style: {color: 'blue'},
      },
    ];
    const {getByText} = render(
      <Typography parse={parse}>Hello @world</Typography>,
    );
    const text = getByText('Hello @world');
    expect(text).toBeTruthy();
  });

  it('disables font scaling', () => {
    const {getByText} = render(<Typography>Test Text</Typography>);
    const text = getByText('Test Text');
    expect(text.props.allowFontScaling).toBe(false);
  });

  it('combines multiple styles correctly', () => {
    const customStyle = {fontSize: 20};
    const customColor = '#FF0000';
    const {getByText} = render(
      <Typography
        variant={TYPOGRAPHY_VARIANT.BOLD_14}
        style={customStyle}
        color={customColor}>
        Test Text
      </Typography>,
    );
    const text = getByText('Test Text');
    expect(text.props.style).toContainEqual(customStyle);
    expect(text.props.style).toContainEqual({color: customColor});
  });
});
