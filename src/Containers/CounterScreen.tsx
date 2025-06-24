import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

import {Typography} from '@/Components';
import Button from '@/Components/Button';

import {useAppDispatch, useAppSelector} from '../ReduxSaga/hooks';
import {decrement, increment, reset} from '../ReduxSaga/slices/counterSlice';

const CounterScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector(state => state.counter.value);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Typography variant="BOLD_24" style={styles.title}>
          Counter Screen
        </Typography>
        <Typography variant="BOLD_24" style={styles.counterText}>
          {count}
        </Typography>

        <View style={styles.buttonContainer}>
          <Button style={styles.button} onPress={() => dispatch(increment())}>
            +
          </Button>

          <Button style={styles.button} onPress={() => dispatch(decrement())}>
            -
          </Button>

          <Button
            style={[styles.button, styles.resetButton]}
            onPress={() => dispatch(reset())}>
            Reset
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    marginBottom: 30,
    color: '#333',
  },
  counterText: {
    marginBottom: 40,
    color: '#007AFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 10,
    minWidth: 60,
  },
  resetButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default CounterScreen;
