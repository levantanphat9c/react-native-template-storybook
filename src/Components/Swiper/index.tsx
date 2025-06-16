import React from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {FlatList, Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const {width, height} = Dimensions.get('window');

export const assets = [
  require('../../Assets/3.jpg'),
  require('../../Assets/2.jpg'),
  require('../../Assets/4.jpg'),
  require('../../Assets/5.jpg'),
  require('../../Assets/1.jpg'),
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  picture: {
    width,
    height,
    overflow: 'hidden',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
});

const Swiper = () => {
  const index = useSharedValue(0);
  const offsetX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const maxY = useSharedValue((assets.length - 1) * -height);

  const pan = Gesture.Pan()
    .onUpdate(event => {
      const y = event.translationY + offsetX.value;

      if (y < 0) {
        if (y < maxY.value) {
          translateY.value = withTiming(maxY.value);
        } else {
          translateY.value = y;
        }
      } else {
        translateY.value = withTiming(0);
        index.value = 0;
      }
    })
    .onEnd(event => {
      const y = event.translationY + offsetX.value;
      const offset = y / -height;
      const isUp = event.translationY < 0;
      if (y < 0) {
        if (y < maxY.value) {
          return;
        } else {
          const changeValue = isUp
            ? offset - index.value
            : index.value - offset;
          if (changeValue > 0.2) {
            const nextIndex = isUp ? index.value + 1 : index.value - 1;
            translateY.value = withTiming(nextIndex * -height);
            index.value = nextIndex;
            offsetX.value = nextIndex * -height;
          } else {
            translateY.value = withTiming(offsetX.value);
            offsetX.value = offsetX.value;
          }
        }
      } else {
        translateY.value = withTiming(0);
        index.value = 0;
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <GestureDetector gesture={pan}>
        <FlatList
          data={assets}
          renderItem={({item}) => (
            <Animated.View style={[styles.picture, animatedStyle]}>
              <Image style={styles.image} {...{source: item}} />
            </Animated.View>
          )}
          keyExtractor={item => item.toString()}
          scrollEnabled={false}
        />
      </GestureDetector>
    </View>
  );
};

export default Swiper;
