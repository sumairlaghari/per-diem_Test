import {SafeAreaView, Text, TouchableOpacity, View,TextInput, ScrollView,Image,FlatList,Animated, Platform} from 'react-native';
import React, {useState,useEffect,useRef} from 'react';
import {GlobalImports} from '../../config/globalImports';
import getStyles from './styles';
import InputContainer from '../../components/inputContainer';
import GlobalLoader from '../../components/globalLoader';

const Login = props => {

  const dispatch = GlobalImports.useDispatch();
  const themeMode = GlobalImports.useSelector(state => state?.themeMode?.state);

  const languageMode = GlobalImports.useSelector(state => state?.languageMode?.state);
  const language = GlobalImports.Languages(languageMode);

  const colors = GlobalImports.COLORS(themeMode);
  const styles = getStyles(colors);

  const [stateChange, setStateChange] = useState({
    email: '',
    pass: '',
  });
  const updateState = data => setStateChange(prev => ({...prev, ...data}));
  const {email, pass} = stateChange;

  return (
    <View style={styles.container}>
      <SafeAreaView></SafeAreaView>
      <View style={styles.wrapper}>
          <Text style={styles.loginHeading}>{'Login'}</Text>
      </View>
    </View>
  );
};

export default Login;
