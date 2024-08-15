import {SafeAreaView, Text, TouchableOpacity, View,Image} from 'react-native';
import React, {useState} from 'react';
import getStyles from './styles';
import {GlobalImports} from '../../config/globalImports';

const TextComp = props => {

    const darkMode = GlobalImports.useSelector(state => state?.darkMode?.state);
    const colors = GlobalImports.COLORS(darkMode);
    const styles = getStyles(colors);

  return (
    <View style={styles.textCompContainer}>
       <Text style={styles.textCompTextOne} >{props?.data?.heading}</Text>
       <Text style={styles.textCompTextTwo}>{props?.data?.desc}</Text>
    </View>
  );
};

export default TextComp;
