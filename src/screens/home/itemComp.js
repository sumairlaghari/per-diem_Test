import {Text, TouchableOpacity, View, Alert,TextInput, Pressable, Keyboard, Switch} from 'react-native';
import React, {useState} from 'react';
import getStyles from './styles';
import {GlobalImports} from '../../config/globalImports';

const ItemComp = props => {
    const dispatch = GlobalImports.useDispatch();
    const themeMode = GlobalImports.useSelector(state => state?.themeMode?.state);
    const colors = GlobalImports.COLORS(themeMode);
    const styles = getStyles(colors);

    var data = props.data;
    var index = props.index;

    const onDelete = () => {
      dispatch({
        type:GlobalImports.types.RemoveFromList,
        payload:index,
      })     
    }

    const onUpdate = () => {
      dispatch({
        type:GlobalImports.types.UpdateList,
        payload:index,
      })     
    }

  return (
    <View style={styles.compContainer}>
      <Text style={styles.compText} >{data.name}</Text>
      <TouchableOpacity onPress={onDelete} style={styles.compDeleteButton}>
        <Text style={styles.buttonText}>{'Delete'}</Text>
      </TouchableOpacity>
      <View style={styles.compToggleButton}>
      <Switch
        trackColor={{false: '#5E5F5C70', true: '#21A01E'}}
        thumbColor='#FFFFFF'
        ios_backgroundColor={'#5E5F5C70'}
        onValueChange={onUpdate}
        value={data.toggleState}
      />
      </View>
    </View>
  );
};

export default ItemComp;
