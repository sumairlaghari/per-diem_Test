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
import ItemComp from './itemComp';
import {jsonData} from './rawData';
import ModalComp from './modalComp';

const Home = props => {
  const styles = getStyles();

  const [listData, setListData] = useState(jsonData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newListItem, setNewListItem] = useState({
    id: null,
    title: '',
    description: '',
  });
  const updateNewListItem = data =>
    setNewListItem(prev => ({...prev, ...data}));
  const {title, description, id} = newListItem;

  const onSubmit = () => {
    if (title != '' && description != '') {
      const lastId = listData.length > 0 ? listData[listData.length - 1].id : 0;
      let obj = {
        id: lastId + 1,
        title: title,
        description: description,
        status: false,
      };
      setListData(prev => [...prev, obj]);
      setIsModalVisible(false);
      //setNewListItem({title: '', description: ''});
    } else {
      GlobalImports.errorMessage('Please input both fields before submit');
    }
  };

  const onDeleteItem = useCallback(id => {
    setListData(prev => prev.filter((item, index) => item.id !== id));
  }, []);
  const onToggleCheckBox = useCallback((newValue, id) => {
    setListData(prev =>
      prev.map(item => (item.id === id ? {...item, status: newValue} : item)),
    );
  }, []);

  const onUpdate = () => {
    if (title != '' && description != '') {
      setListData(prev =>
        prev.map((item, index) => {
          if (item.id === id) {
            return {...item, title: title, description: description};
          }
          return item;
        }),
      );
      setIsModalVisible(false);
    } else {
      GlobalImports.errorMessage('Please input both fields before submit');
    }
  };
  const openModalForNewData = () => {
    if (id != null || title != '' || description != '') {
      updateNewListItem({id: null, title: '', description: ''});
      setIsModalVisible(true);
    } else {
      setIsModalVisible(true);
    }
  };
  const openModalForUpdateData = (id, title, description) => {
    if (
      newListItem.id != id ||
      newListItem.title != title ||
      newListItem.description != description
    ) {
      updateNewListItem({id: id, title: title, description: description});
      setIsModalVisible(true);
    } else {
      setIsModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView></SafeAreaView>
      <View style={styles.wrapper}>
        <View style={styles.headingWrap}>
          <Text style={styles.heading}>{'List Data'}</Text>
          <TouchableOpacity
            onPress={() => openModalForNewData()}
            style={styles.buttonStyle}>
            <Text style={styles.buttonText}>{'Add'}</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}
          data={listData}
          keyExtractor={item => item.id.toString()}
          ListEmptyComponent={() => (
            <View style={styles.noDataView}>
              <Text style={styles.noDataText}>{'No Data Found'}</Text>
            </View>
          )}
          renderItem={({item, index}) => {
            return (
              <ItemComp
                methods={{
                  onDeleteItem,
                  onToggleCheckBox,
                  openModalForUpdateData,
                }}
                data={item}
              />
            );
          }}
        />
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(false);
        }}>
        <ModalComp
          methods={{setIsModalVisible, updateNewListItem, onSubmit, onUpdate}}
          values={{title, description, id}}
        />
      </Modal>
    </View>
  );
};

export default Home;
