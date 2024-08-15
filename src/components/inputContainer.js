import {View, TextInput, StyleSheet,TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import { GlobalImports } from '../config/globalImports';

const InputContainer = props => {
  const themeMode = GlobalImports.useSelector(state => state?.themeMode?.state);
  const colors = GlobalImports.COLORS(themeMode);
  
  return (
    <View style={styles.inputBox}>
        {props?.type==='email' && (
          <GlobalImports.ICONS.FontAwesome name="envelope" size={24} color={'white'} />
        )}
        {(props?.type==='password' || props?.type==='confirmPassword') && (
          <GlobalImports.ICONS.Entypo name="lock" size={24} color={'white'} />
        )}
        {props?.children}
        {props?.type==='password' && (
          <TouchableOpacity onPress={()=>{props?.methods?.setShowPass(!props?.methods?.showPass)}}>
            <GlobalImports.ICONS.Entypo name={props?.methods?.showPass?'eye-with-line':'eye'} size={24} color={'white'} />
          </TouchableOpacity>
        )}
        {props?.type==='confirmPassword' && (
          <TouchableOpacity onPress={()=>{props?.methods?.setShowConfirmPass(!props?.methods?.showConfirmPass)}}>
            <GlobalImports.ICONS.Entypo name={props?.methods?.showConfirmPass?'eye-with-line':'eye'} size={24} color={'white'} />
          </TouchableOpacity>
        )}
    </View>
  );
};
const styles = StyleSheet.create({
    inputBox: {
      width: GlobalImports.wp2(90),
      height: GlobalImports.hp2(6),
      borderRadius:GlobalImports.wp2(2),
      borderWidth:1,
      borderColor:'white',
      marginVertical: GlobalImports.hp2(1),
      alignItems:'center',
      flexDirection:'row',
      alignSelf:'center',
      paddingHorizontal:GlobalImports.wp2(2),
    },
  });

export default InputContainer;
