import {
  Text,
  TouchableOpacity,
  View,
  Alert,
  TextInput,
  Pressable,
  Keyboard,
} from 'react-native';
import React, {useState, memo} from 'react';
import getStyles from './styles';
import {GlobalImports} from '../../config/globalImports';
import ModalComp from './modalComp';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const ItemComp = memo(
  props => {
    const styles = getStyles();
    console.log('does this rerender ==> ', props.data.id);

    var data = props.data;
    var {openModalForUpdateData, onDeleteItem, onToggleCheckBox} =
      props.methods;

    return (
      <View style={styles.compContainer}>
        <Text style={styles.compText}>{data.title}</Text>
        <Text style={styles.compText}>{data.description}</Text>
        <TouchableOpacity
          onPress={() =>
            openModalForUpdateData(data.id, data.title, data.description)
          }
          style={[styles.compButton, {backgroundColor: 'green'}]}>
          <Text style={styles.buttonText}>{'Update'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onDeleteItem(data.id)}
          style={styles.compButton}>
          <Text style={styles.buttonText}>{'Delete'}</Text>
        </TouchableOpacity>
        <View style={styles.compCheckBox}>
          <BouncyCheckbox
            disableText={true}
            onPress={newValue => onToggleCheckBox(newValue, data.id)}
            size={26}
            isChecked={data.status}
            fillColor="#21A01E"
            unfillColor={'green'}
            innerIconStyle={{borderWidth: 3, borderRadius: 8}}
          />
        </View>
      </View>
    );
  },
  (oldProps, newProps) => {
    return (
      oldProps.data.title === newProps.data.title &&
      oldProps.data.description === newProps.data.description &&
      oldProps.data.status === newProps.data.status
    );
  },
);

export default ItemComp;
