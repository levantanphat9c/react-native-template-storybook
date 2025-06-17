import {isNotNilOrEmpty} from 'ramda-adjunct';
import React, {useMemo} from 'react';
import {TextProps} from 'react-native';
import ParsedText, {ParseShape} from 'react-native-parsed-text';
import Animated, {AnimatedProps} from 'react-native-reanimated';

import withMemo from '@/HOC/withMemo';
import {useColor} from '@/Hooks/useColor';

import useStyles from './styles';
import {TYPOGRAPHY_VARIANT} from './type';

export interface ITypographyProps
  extends TextProps,
    Pick<AnimatedProps<TextProps>, 'entering' | 'exiting' | 'layout'> {
  variant?: `${TYPOGRAPHY_VARIANT}`;
  parse?: ParseShape[];
  color?: string;
}

const Typography = (props: ITypographyProps) => {
  const {dynamicColor} = useColor();
  const {
    children,
    variant = 'REGULAR_13',
    color = dynamicColor.UI.textContent,
    parse,
    style,
    ...rest
  } = props;
  const styles = useStyles();
  const finalStyle = useMemo(() => {
    return [styles.container, styles[variant], {color}, style];
  }, [variant, color, style, styles]);
  const isParse = isNotNilOrEmpty(parse);
  const TextComponent = isParse ? ParsedText : Animated.Text;

  return (
    <TextComponent
      parse={parse}
      style={finalStyle}
      {...rest}
      allowFontScaling={false}>
      {children}
    </TextComponent>
  );
};

export default withMemo(Typography);
