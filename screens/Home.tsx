import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { globalStyles } from '../styles/global';
import Card from '../shared/card';
import { StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import ReviewForm from './ReviewForm';

const Home = (props: any) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [reviews, setReviews] = useState([
      { title: 'Zelda, Breath of Fresh Air', rating: 5, body: 'lorem ipsum', key: '1' },
      { title: 'Gotta Catch Them All (again)', rating: 4, body: 'lorem ipsum', key: '2' },
      { title: 'Not So "Final" Fantasy', rating: 3, body: 'lorem ipsum', key: '3' },
    ]);

    const addReview = (review:any) => {
      review.key = Math.random().toString();
      setReviews((currenReviews) => {
        return [review, ...currenReviews]
      })
      setModalOpen(false);
    }

    return (
      <View style={globalStyles.container}>
        <Modal visible={modalOpen} animationType='slide'>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <MaterialIcons
            name="close"
            size={24}
            onPress={() => setModalOpen(false)}
            style={{...styles.modalToggle, ...styles.modalClose}}
            />
            <ReviewForm addReview={addReview}/>
          </View>
          </TouchableWithoutFeedback>
        </Modal>
        <MaterialIcons
          name="add"
          size={24}
          onPress={() => setModalOpen(true)}
          style={styles.modalToggle}
        />
        <FlatList
          data={reviews}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => props.navigation.navigate('ReviewDetails', item)}>
              <Card>
                <Text>{item.title}</Text>
              </Card>
            </TouchableOpacity>
          )}
        />
      </View>
    );
}

export default Home;

export const styles = StyleSheet.create({
  modalContent:  {
    flex: 1,
  },
  modalToggle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 0,
  }
});
