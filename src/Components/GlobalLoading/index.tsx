import React, {useEffect, useImperativeHandle, useState} from 'react';
import {ActivityIndicator, BackHandler, StatusBar, View} from 'react-native';

import {IS_ANDROID} from '@/Constants';
import withMemo from '@/HOC/withMemo';
import {useColor} from '@/Hooks';

import Typography from '../Typography';
import useStyles from './styles';

type RefType = {
  show: () => void;
  hide: () => void;
};

export const globalLoadingRef = React.createRef<RefType>();

export const globalLoading = {
  show: (timeout = 30000) => {
    globalLoadingRef?.current?.show();

    setTimeout(() => {
      globalLoadingRef?.current?.hide();
    }, timeout);
  },
  hide: () => {
    globalLoadingRef?.current?.hide();
  },
};

interface IProps {
  visible?: boolean;
}

const GlobalLoading = React.forwardRef<RefType, IProps>((props, ref) => {
  const [visible, setVisible] = useState(props?.visible ?? false);
  const styles = useStyles();
  const {dynamicColor} = useColor();
  const show = () => {
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };

  useImperativeHandle(ref, () => {
    return {show, hide};
  });

  useEffect(() => {
    if (IS_ANDROID) {
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          if (visible) {
            return true;
          } else {
            return false;
          }
        },
      );

      return () => subscription.remove();
    } else {
      return;
    }
  }, [visible]);

  if (!visible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={dynamicColor.Opacity.blueGray50Percent} />
      <View style={styles.containerLoading}>
        <ActivityIndicator size="small" />

        <Typography
          variant={'REGULAR_14'}
          color={dynamicColor.UI.sureface}
          style={styles.text}>
          Đang tải...
        </Typography>
      </View>
    </View>
  );
});

GlobalLoading.displayName = 'GlobalLoading';

export default withMemo(GlobalLoading);
