import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import { LogBox } from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/redux/reducer';
import FlashMessage from 'react-native-flash-message';
import OnBoardingCheck from './onBoardCheck';
import BootSplash from "react-native-bootsplash";

const App = () => {

  useEffect(() => {
    (async () => {
      LogBox.ignoreLogs([
        'VirtualizedLists should never be nested',
        'ViewPropTypes will be removed from React Native',
      ]);
      LogBox.ignoreAllLogs(true);
    })();

    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
      console.log("BootSplash has been hidden successfully");
    });

  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <OnBoardingCheck />
      </PersistGate>
      <FlashMessage position="top" />
    </Provider>
  );
};

export default App;
