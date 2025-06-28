/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';

import ErrorBoundary from './src/Components/ErrorBoundary';
import RootNavigator from './src/Navigation/RootNavigator';
import {store} from './src/ReduxSaga/store';

import './src/Services/i18n';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <GestureHandlerRootView style={{flex: 1}}>
          <RootNavigator />
        </GestureHandlerRootView>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
