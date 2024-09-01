import {
  Text,
  TouchableOpacity,
  View,
  Alert,
  TextInput,
  Pressable,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import getStyles from './styles';
import {GlobalImports} from '../../config/globalImports';

const ModalComp = props => {
  const colors = GlobalImports.COLORS();
  const styles = getStyles();

  var setIsModalVisible = props.methods.setIsModalVisible;
  var updateNewListItem = props.methods.updateNewListItem;
  var onSubmit = props.methods.onSubmit;
  var onUpdate = props.methods.onUpdate;
  var title = props.values.title;
  var description = props.values.description;
  var id = props.values.id;

  return (
    <Pressable onPress={Keyboard.dismiss} style={styles.createItemContainer}>
      <View style={[styles.inputWrap]}>
        <TouchableOpacity
          onPress={() => setIsModalVisible(false)}
          style={styles.crossButton}>
          <GlobalImports.ICONS.Entypo
            name="cross"
            size={18}
            color={colors.commonBlack}
          />
        </TouchableOpacity>
        <Text style={{color: colors?.commonWhite, marginBottom: 10}}>
          Input New List Item
        </Text>
        <View style={styles.inputField}>
          <Text
            style={{
              color: colors?.commonWhite,
              fontSize: GlobalImports.rfv(10),
            }}>
            {'Title'}:{' '}
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              value={title}
              style={styles.input}
              placeholder={'Title'}
              placeholderTextColor={'#FFFFFF50'}
              onChangeText={val => updateNewListItem({title: val})}
            />
          </View>
        </View>
        <View style={styles.inputField}>
          <Text
            style={{
              color: colors?.commonWhite,
              fontSize: GlobalImports.rfv(10),
            }}>
            {'Description'}:{' '}
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              value={description}
              style={styles.input}
              placeholder={'Description'}
              placeholderTextColor={'#FFFFFF50'}
              onChangeText={val => updateNewListItem({description: val})}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => (id == null ? onSubmit() : onUpdate())}
          style={[styles.submitButton]}>
          <Text style={{color: colors.commonBlack}}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

export default ModalComp;
