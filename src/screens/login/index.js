import {SafeAreaView, Text, TouchableOpacity, View,TextInput, ScrollView,Image,FlatList,Animated, Platform} from 'react-native';
import React, {useState,useEffect,useRef} from 'react';
import {GlobalImports} from '../../config/globalImports';
import getStyles from './styles';
import InputContainer from '../../components/inputContainer';
import { getRequest } from '../../config/helperFunction';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import GlobalLoader from '../../components/globalLoader';
import { GetEmployeeUrl } from '../../config/urls';

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

  const [showPass, setShowPass] = useState(false);

  useEffect(()=>{
      GoogleSignin.configure({
        scopes: ['email'],
        webClientId: process.env.WEB_CLIENT_ID,
        offlineAccess: true,
      });
  },[])

  const loginUser = async () =>{
    if (pass != '' && email != '') {
        if(pass === process.env.PASSWORD && email === process.env.USER){
            dispatch({type: GlobalImports.types.LoaderOn})
            const response = await getRequest(GetEmployeeUrl)
            if(response !==null){
                dispatch({type: GlobalImports.types.LoaderOff})
                dispatch({
                  type: GlobalImports.types.Login,
                  payload: {user:{id:1,name:'DummyUser',socialLogin:false},token:'dummyToken123'},
                });
                GlobalImports.successMessage('Login Success')
            }else{
              dispatch({type: GlobalImports.types.LoaderOff})
              GlobalImports.errorMessage('Login failed please try again')
            }      
        } else{
            GlobalImports.errorMessage('Incorrect username or password please try again')
        }
    }
    else {
      GlobalImports.errorMessage('Please fill all fields');
    }
    }

    const onGoogleButtonPress = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const data = await GoogleSignin.signIn();
          console.log(data.user)
            dispatch({
                type: GlobalImports.types.Login,
                payload: {user:{id:data.user.id,name:data.user.name,socialLogin:true},token:'dummyToken123'},
            });
            GlobalImports.successMessage('Login Success')
        } catch (error) {
          console.error('Google sign-in error:', error.code, error.message);
        }
    }

  return (
    <View style={styles.container}>
      <SafeAreaView></SafeAreaView>
      <View style={styles.wrapper}>
            <Text style={styles.loginHeading}>{'Login'}</Text>

            <InputContainer type={'email'}>
            <TextInput
              style={styles.inputBox}
              placeholder={'Email'}
              placeholderTextColor={colors?.placeholderCommonWhite}
              onChangeText={val => updateState({email: val})}
            />
            </InputContainer>
            <InputContainer methods={{showPass,setShowPass}} type={'password'}>
            <TextInput
              style={styles.inputBox}
              placeholder={'Password'}
              placeholderTextColor={colors?.placeholderCommonWhite}
              onChangeText={val => updateState({pass: val})}
              secureTextEntry={!showPass?true:false}
            />
            </InputContainer>

            <TouchableOpacity onPress={loginUser} style={styles.loginButton}>
                <Text style={styles.buttonText}>{'Login'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onGoogleButtonPress} style={styles.loginButton}>
                <Text style={styles.buttonText}>{'Login with Google'}</Text>
            </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
