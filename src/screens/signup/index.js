import {SafeAreaView, Text, TouchableOpacity, View,TextInput, ScrollView,Image,FlatList,Animated, Platform} from 'react-native';
import React, {useState,useEffect,useRef} from 'react';
import {GlobalImports} from '../../config/globalImports';
import getStyles from './styles';
import InputContainer from '../../components/inputContainer';
import { postRequest } from '../../config/helperFunction';
import GlobalLoader from '../../components/globalLoader';
import { SignupUrl } from '../../config/urls';

const Signup = props => {
  const styles = getStyles();
  const colors = GlobalImports.COLORS();
  const dispatch = GlobalImports.useDispatch();

  const [stateChange, setStateChange] = useState({
    email: '',
    pass: '',
    confirmPass:''
  });
  const updateState = data => setStateChange(prev => ({...prev, ...data}));
  const {email, pass, confirmPass} = stateChange;

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

const onSignup = async () =>{
  if (pass != '' && email != '' && confirmPass != '') {
    if(pass == confirmPass){
        dispatch({type: GlobalImports.types.LoaderOn})
        const response = await postRequest(SignupUrl,{email:email,password:pass, confirmPassword: confirmPass})
        if(response !==null){
            dispatch({type: GlobalImports.types.LoaderOff})
            dispatch({
              type: GlobalImports.types.Login,
              payload: {user:{id:1,name:'DummyUser',socialLogin:false},token:'dummyToken123'},
            });
            GlobalImports.successMessage('Signup Success')
        }else{
          dispatch({type: GlobalImports.types.LoaderOff})
          //GlobalImports.errorMessage('Signup failed please try again')
        }      
    }else{
        GlobalImports.errorMessage('confirm password not matched');
    }
  }
  else {
    GlobalImports.errorMessage('Please fill all fields');
  }
  }

  
  return (
    <View style={styles.container}>
      <SafeAreaView></SafeAreaView>
      <View style={styles.wrapper}>
            <Text style={styles.loginHeading}>{'Signup'}</Text>

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
            <InputContainer methods={{showConfirmPass,setShowConfirmPass}} type={'confirmPassword'}>
            <TextInput
              style={styles.inputBox}
              placeholder={'Confirm Password'}
              placeholderTextColor={colors?.placeholderCommonWhite}
              onChangeText={val => updateState({confirmPass: val})}
              secureTextEntry={!showConfirmPass?true:false}
            />
            </InputContainer>

            <TouchableOpacity onPress={onSignup} style={styles.loginButton}>
                <Text style={styles.buttonText}>{'Signup'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>props.navigation.goBack()} style={styles.loginButton}>
                <Text style={styles.buttonText}>{'Go Back'}</Text>
            </TouchableOpacity>
      </View>
    </View>
  );
};

export default Signup;
