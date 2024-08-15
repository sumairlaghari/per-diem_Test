import {SafeAreaView, Text, TouchableOpacity, View,FlatList,RefreshControl,TextInput, Modal, Pressable, Keyboard} from 'react-native';
import React, {useState,useEffect,useCallback} from 'react';
import {GlobalImports} from '../../config/globalImports';
import getStyles from './styles';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import ItemComp from './itemComp';

const Home = props => {
  const dispatch = GlobalImports.useDispatch();
  const themeMode = GlobalImports.useSelector(state => state?.themeMode?.state);
  const languageMode = GlobalImports.useSelector(state => state?.languageMode?.state);
  const language = GlobalImports.Languages(languageMode);
  const colors = GlobalImports.COLORS(themeMode);
  const styles = getStyles(colors);

  const {userData,token} = GlobalImports.useSelector(state => state?.userData);
  const {list} = GlobalImports.useSelector(state => state?.listData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newListItem, setNewListItem] = useState('');

  const onCreateItem = () => {
    if (newListItem != ''){
      dispatch({
        type:GlobalImports.types.AddToList,
        payload:{name:newListItem,toggleState:true},
      })
      setIsModalVisible(false)
      setNewListItem('')
    }else{
      GlobalImports.errorMessage('Please input something before submit');
    }
  }

  const Logout = async () => {
      if(userData?.socialLogin===true){
        try {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
        } catch (error) {
          console.error(error);
        }
      }
      dispatch({type:GlobalImports.types.Logout})    
  }

  return (
    <View style={styles.container}>
      <SafeAreaView></SafeAreaView>
      <View style={styles.wrapper}>
        <View style={styles.headingWrap}>
        <TouchableOpacity onPress={Logout} style={styles.buttonStyle}>
          <Text style={styles.buttonText}>{'Logout'}</Text>
        </TouchableOpacity>
        <Text style={styles.heading} >{'List Data'}</Text>
        <TouchableOpacity onPress={()=>setIsModalVisible(true)} style={styles.buttonStyle}>
          <Text style={styles.buttonText}>{'Add'}</Text>
        </TouchableOpacity>
        </View>

        <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow:1}}
            data={list}
            ListEmptyComponent={()=>          
              <View style={styles.noDataView}>
                <Text style={styles.noDataText}>{'No Data Found'}</Text>
              </View>
            }
            renderItem={({item,index}) => {
              return (
                <ItemComp data={item} key={index} index={index} />
              );
            }}
        />

      </View>

      <Modal
        animationType='fade'
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          //Alert.alert('Modal has been closed.');
          setIsModalVisible(false);
        }}>
          <Pressable onPress={Keyboard.dismiss} style={styles.createItemContainer}>
            <View style={[styles.inputWrap]}>
                <TouchableOpacity onPress={()=>setIsModalVisible(false)} style={styles.crossButton} >
                    <GlobalImports.ICONS.Entypo name="cross" size={18} color={colors?.commonBlack} />
                </TouchableOpacity>
                <Text style={{color:colors?.commonWhite,marginBottom:10}} >Input Item</Text>
                  <View style={styles.inputField}>
                    <Text style={{color:colors?.commonWhite}} >{'Item'}: </Text>
                    <View style={styles.inputContainer}>
                      <TextInput
                          value={newListItem}
                          style={styles.input}
                          placeholder={'Item'}
                          placeholderTextColor={'#FFFFFF50'}
                          onChangeText={(val)=> setNewListItem(val)}
                      />
                    </View>
                  </View>
                <TouchableOpacity onPress={()=> onCreateItem()} style={[styles.submitButton]} >
                    <Text style={{color:colors.commonBlack}} >SUBMIT</Text>
                </TouchableOpacity>
            </View>
          </Pressable>
      </Modal>

    </View>
  );
};

export default Home;
