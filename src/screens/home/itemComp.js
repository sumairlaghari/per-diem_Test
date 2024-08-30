import {Text, TouchableOpacity, View, Alert,TextInput, Pressable, Keyboard, Switch} from 'react-native';
import React from 'react';
import getStyles from './styles';
import {GlobalImports} from '../../config/globalImports';

const ItemComp = props => {
    const dispatch = GlobalImports.useDispatch();
    const themeMode = GlobalImports.useSelector(state => state?.themeMode?.state);
    const colors = GlobalImports.COLORS(themeMode);
    const styles = getStyles(colors);

    var data = props.data;

  return (
    <View style={styles.compContainer}>
      <Text style={styles.compText} >{data.name}</Text>
    </View>
  );
};

export default ItemComp;
