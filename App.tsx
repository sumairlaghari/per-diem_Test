import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/redux/reducer';
import FlashMessage from 'react-native-flash-message';
import AppTwo from './AppTwo';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppTwo />
      </PersistGate>
      <FlashMessage position="top" />
    </Provider>
  );
};

export default App;
