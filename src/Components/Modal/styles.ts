import {createThemedStyles} from '@/Hooks';
import {responsive} from '@/styles';

export default createThemedStyles(
  dynamicColors => ({
    modalBackground: {
      flex: 1,
      backgroundColor: dynamicColors.Opacity.blueGray50Percent,
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalContainer: {
      _width: responsive.screenWidth,
      _height: responsive.screenHeight,
      justifyContent: 'flex-end',
      alignItems: 'center',
      position: 'absolute',
      elevation: -1,
      zIndex: -1,
    },
  }),
  {
    styleId: 'modal',
  },
);
