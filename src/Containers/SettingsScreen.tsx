import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import Swiper from '../Components/Swiper';

const SettingsScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Swiper />
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default SettingsScreen;
