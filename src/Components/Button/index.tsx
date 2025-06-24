import React from 'react';

import withMemo from '@/HOC/withMemo';

import TouchableScale, {ITouchableScaleProps} from '../TouchableScale';
import Typography from '../Typography';

interface IProps extends ITouchableScaleProps {
  onPress?: () => void;
}

const Button = ({children, onPress, ...rest}: IProps) => {
  return (
    <TouchableScale activeOpacity={0.8} onPress={onPress} {...rest}>
      <Typography variant="BOLD_18" color="white">
        {children}
      </Typography>
    </TouchableScale>
  );
};

export default withMemo(Button);
