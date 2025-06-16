import React, {useContext, useEffect} from 'react';
import {
  ModalProps,
  Modal as RNModal,
  StatusBar,
  StyleProp,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';

import {screenHeight, screenWidth} from '@/styles';

import {ModalContext} from './ModalWrapper';
import useStyles from './styles';
import {useAppStateChange} from '@/Hooks';

export interface IModalProps extends ModalProps {
  isVisible: boolean;
  children?: React.ReactNode;
  isCloseBackdrop?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Define a modal key to handle pushing to the stack if displaying multiple modals at the same time
   */
  keyModal: string;
  backgroundColorStatusBar?: string;

  onCloseModal: () => void;
  onHideModal?: () => void;
}

const Modal = (props: IModalProps) => {
  const {styles, dynamicColors} = useStyles();

  const {
    containerStyle,
    onCloseModal,
    isVisible,
    children,
    isCloseBackdrop = true,
    keyModal,
    backgroundColorStatusBar = dynamicColors.Opacity.blueGray50Percent,
    onHideModal,
    ...rest
  } = props;

  const {onPushStackModal, onPopStackModal, stackModal} =
    useContext(ModalContext);
  const [showMask, setShowMask] = React.useState(false);

  useEffect(() => {
    return () => {
      onPopStackModal(keyModal);
      onHideModal?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isVisible) {
      onPopStackModal(keyModal);
    } else {
      onPushStackModal(keyModal);
    }
  }, [isVisible, keyModal, onPopStackModal, onPushStackModal]);

  useAppStateChange(nextState => {
    if (nextState === 'active') {
      setShowMask(false);
    } else {
      setShowMask(true);
    }
  }, 16);

  if (stackModal?.[0] !== keyModal) {
    return null;
  }

  return (
    <RNModal
      animationType="fade"
      transparent
      visible={isVisible}
      onRequestClose={onCloseModal}
      supportedOrientations={['portrait', 'landscape']}
      {...rest}>
      <StatusBar backgroundColor={backgroundColorStatusBar} />
      <View style={[styles.modalBackground, containerStyle]}>
        {children}
        {isCloseBackdrop && (
          <TouchableWithoutFeedback onPress={onCloseModal}>
            <View style={styles.modalContainer} />
          </TouchableWithoutFeedback>
        )}
      </View>

      {showMask && (
        <View
          style={{
            width: screenWidth,
            height: screenHeight,
            backgroundColor: dynamicColors.UI.sureface,
            zIndex: 2,
          }}
        />
      )}
    </RNModal>
  );
};

export default Modal;
