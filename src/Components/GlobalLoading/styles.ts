import {createThemedStyles} from '@/Hooks';

export default createThemedStyles(
  dynamicColors => ({
    container: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: dynamicColors?.Opacity.blueGray50Percent,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 999,
    },
    containerLoading: {
      flexDirection: 'row',
      backgroundColor: dynamicColors?.Component.indigo,
      borderRadius: 30,
      paddingVertical: 16,
      paddingHorizontal: 24,
      alignItems: 'center',
    },
    text: {
      marginLeft: 8,
    },
  }),
  {
    styleId: 'globalLoading',
  },
);
