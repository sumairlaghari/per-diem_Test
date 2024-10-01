import {
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    RefreshControl,
    TextInput,
    Modal,
    Pressable,
    Keyboard,
  } from 'react-native';
  import React, {useState, useEffect, useCallback, useMemo} from 'react';
  import {GlobalImports} from '../../config/globalImports';
  import getStyles from './styles';
  
  const CoinScreen = props => {
    const styles = getStyles(); 

    return (
      <View style={styles.container}>
        <SafeAreaView></SafeAreaView>
        <View style={styles.wrapper}>
          <View style={styles.headingWrap}>
            <Text style={styles.heading}>{'Coin Screen'}</Text>
          </View>
          <View style={styles.coinWrapper}>
            <Pressable onPress={()=>console.log('run effect')} style={styles.coinStyles} >

            </Pressable>
          </View>
        </View>
      </View>
    );
  };
  
  export default CoinScreen;
  