import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Modal, TouchableWithoutFeedback, Keyboard, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { globalStyles } from '../styles/global';
import Card from '../shared/card';
import { MaterialIcons } from '@expo/vector-icons';
import ReviewForm from './ReviewForm';
import type { HomeStackParamList } from '../routes/types';
import type { Review } from '../types/review';
import { useReviews } from '../hooks/useReviews';

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>;

const Home = ({ navigation }: Props) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const { reviews, loaded, addReview: saveReview } = useReviews();

    const addReview = (review: Omit<Review, 'key'>) => {
      saveReview(review);
      setModalOpen(false);
    }

    return (
      <View style={globalStyles.container}>
        <Modal visible={modalOpen} animationType='slide' onRequestClose={() => setModalOpen(false)}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView style={styles.modalContent}>
            <MaterialIcons
            name="close"
            size={24}
            onPress={() => setModalOpen(false)}
            style={{...styles.modalToggle, ...styles.modalClose}}
            />
            <ReviewForm addReview={addReview}/>
          </SafeAreaView>
          </TouchableWithoutFeedback>
        </Modal>
        <MaterialIcons
          name="add"
          size={24}
          onPress={() => setModalOpen(true)}
          style={styles.modalToggle}
        />
        {!loaded && <ActivityIndicator />}
        <FlatList
          data={reviews}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => navigation.navigate('ReviewDetails', item)}>
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
    padding: 24,
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
