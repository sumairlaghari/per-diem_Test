import React, {useState, useEffect} from 'react';
import {StatusBar, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthRoutes, UnAuthRoutes} from './routeList';
import {useSelector} from 'react-redux';
import GlobalLoader from '../components/globalLoader';

const Stack = createStackNavigator();

const AuthScreensRoute = () => (
  <Stack.Navigator>
    {AuthRoutes.map((item, index) => {
      return (
        <Stack.Screen
          key={index}
          name={item.name}
          component={item.component}
          options={{headerShown: false}}
        />
      );
    })}
  </Stack.Navigator>
);

const UnAuthScreensRoute = () => (
  <Stack.Navigator>
    {UnAuthRoutes.map((item, index) => {
      return (
        <Stack.Screen
          key={index}
          name={item.name}
          component={item.component}
          options={{headerShown: false}}
        />
      );
    })}
  </Stack.Navigator>
);

const AppNavigatior = () => {
  const [status, setStatus] = useState('');
  const loader = useSelector(state => state?.loader?.loaderState);
  const token = useSelector(state => state?.userData?.token);
  const statusBarColor = useSelector(state => state?.statusBar?.colorState);
  const themeMode = useSelector(state => state?.themeMode?.state);

  useEffect(() => {
    if (token === '') {
      setStatus('');
    }else{
      setStatus('loggedIn')
    }
  }, [token]);

  return (
    <NavigationContainer>
      <StatusBar
        //barStyle={statusBarColor}
        barStyle={themeMode == 'dark' ? 'light-content' : 'dark-content'}
        translucent
        backgroundColor="transparent"
      />
      {status === 'loggedIn' ? <AuthScreensRoute />  : <UnAuthScreensRoute />}
      <View style={{position: 'absolute', zIndex: 999}}>
        {loader && <GlobalLoader />}
      </View>
    </NavigationContainer>
  );
};

export default AppNavigatior;
