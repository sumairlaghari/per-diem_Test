import {SafeAreaView, Text, TouchableOpacity, View,FlatList,RefreshControl,TextInput, Modal, Pressable, Keyboard} from 'react-native';
import React, {useState,useEffect,useCallback} from 'react';
import {GlobalImports} from '../../config/globalImports';
import getStyles from './styles';
import ItemComp from './itemComp';

const Home = props => {
  const dispatch = GlobalImports.useDispatch();
  const themeMode = GlobalImports.useSelector(state => state?.themeMode?.state);
  const languageMode = GlobalImports.useSelector(state => state?.languageMode?.state);
  const language = GlobalImports.Languages(languageMode);
  const colors = GlobalImports.COLORS(themeMode);
  const styles = getStyles(colors);
  
  return (
    <View style={styles.container}>
      <SafeAreaView></SafeAreaView>
      <View style={styles.wrapper}>
        <Text style={styles.heading}>{'Home'}</Text>
      </View>
    </View>
  );
};

export default Home;
