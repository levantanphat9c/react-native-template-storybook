import withMemo from '@/HOC/withMemo';
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

const InfiniteSwiper = () => {
  const index = useSharedValue(1);
  const offsetX = useSharedValue(-height);
  const translateY = useSharedValue(-height);

  const normalizeIndex = (idx: number) => {
    'worklet';
    if (idx <= 0) {
      return assets.length;
    }

    if (idx > assets.length) {
      return 1;
    }

    return idx % (assets.length + 1);
  };

  const pan = Gesture.Pan()
    .onUpdate(event => {
      translateY.value = event.translationY + offsetX.value;
    })
    .onEnd(event => {
      const isUp = event.translationY < 0;

      // Determine if we should snap to next/previous item
      if (
        Math.abs(event.translationY) > height * 0.2 ||
        Math.abs(event.velocityY) > 500
      ) {
        let nextIndex;
        if (isUp) {
          nextIndex = index.value + 1;
        } else {
          nextIndex = index.value - 1;
        }

        // Normalize the index for infinite scrolling
        const normalizedIndex = normalizeIndex(nextIndex);
        index.value = normalizedIndex;

        // Calculate target translateY
        const targetY = nextIndex * -height;
        translateY.value = withTiming(targetY, undefined, () => {
          // Reset position for seamless infinite scroll
          if (nextIndex >= assets.length + 1) {
            translateY.value = -height;
            offsetX.value = -height;
          } else if (nextIndex <= 0) {
            const resetPosition = assets.length * -height;
            translateY.value = resetPosition;
            offsetX.value = resetPosition;
          } else {
            offsetX.value = targetY;
          }
        });
      } else {
        // Snap back to current position
        translateY.value = withTiming(offsetX.value);
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

  // Create extended data array for smooth infinite scrolling
  const extendedAssets = [
    assets[assets.length - 1], // Add last item at the start for smooth transition
    ...assets,
    assets[0], // Add first item at the end for smooth transition
  ];

  return (
    <View style={styles.container}>
      <GestureDetector gesture={pan}>
        <FlatList
          data={extendedAssets}
          renderItem={({item}) => (
            <Animated.View style={[styles.picture, animatedStyle]}>
              <Image style={styles.image} source={item} />
            </Animated.View>
          )}
          keyExtractor={(item, idx) => `${item.toString()}-${idx}`}
          scrollEnabled={false}
        />
      </GestureDetector>
    </View>
  );
};

export default withMemo(InfiniteSwiper);

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
