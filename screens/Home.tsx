import React, { useState } from 'react';
import { Text, View, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { globalStyles } from '../styles/global';
import Card from '../shared/card';
import { MaterialIcons } from '@expo/vector-icons';
import ReviewFormModal from '../shared/reviewFormModal';
import type { HomeStackParamList } from '../routes/types';
import type { ReviewInput } from '../types/review';
import { useReviews } from '../hooks/useReviews';

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>;

const Home = ({ navigation }: Props) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const { reviews, loaded, addReview } = useReviews();

    const handleAdd = (review: ReviewInput) => {
      addReview(review);
      setModalOpen(false);
    }

    return (
      <View style={globalStyles.container}>
        <ReviewFormModal
          visible={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleAdd}
        />
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
            <TouchableOpacity onPress={() => navigation.navigate('ReviewDetails', { reviewKey: item.key })}>
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
});
