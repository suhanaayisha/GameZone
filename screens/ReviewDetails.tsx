import React, { useLayoutEffect, useState } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import { globalStyles, images } from '../styles/global';
import Card from '../shared/card';
import ReviewFormModal from '../shared/reviewFormModal';
import { confirm } from '../shared/confirm';
import type { HomeStackParamList } from '../routes/types';
import type { ReviewInput } from '../types/review';
import { useReviews } from '../hooks/useReviews';

type Props = NativeStackScreenProps<HomeStackParamList, 'ReviewDetails'>;

const ReviewDetails = ({ route, navigation }: Props) => {
  const { reviews, updateReview, deleteReview } = useReviews();
  const [editing, setEditing] = useState(false);
  const review = reviews.find((r) => r.key === route.params.reviewKey);

  const handleDelete = () => {
    if (!review) return;
    confirm('Delete review', `Delete "${review.title}"? This can't be undone.`, 'Delete', () => {
      navigation.goBack();
      deleteReview(review.key);
    });
  };

  const handleUpdate = (updated: ReviewInput) => {
    if (!review) return;
    updateReview(review.key, updated);
    setEditing(false);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerActions}>
          <MaterialIcons name="edit" size={24} color="#444" onPress={() => setEditing(true)} />
          <MaterialIcons name="delete" size={24} color="#444" onPress={handleDelete} />
        </View>
      ),
    });
  });

  if (!review) {
    return null;
  }

  const { title, rating, body } = review;
    return (
      <View style={globalStyles.container}>
        <ReviewFormModal
          visible={editing}
          onClose={() => setEditing(false)}
          onSubmit={handleUpdate}
          initialReview={{ title, rating, body }}
        />
        <Card>
          <Text>{title}</Text>
          <Text>{body}</Text>
          <View style={styles.rating}>
            <Text>Gamezone rating</Text>
            <Image source={images.ratings[rating]}/>
          </View>
        </Card>
      </View>
    );
  }

export default ReviewDetails;


export const styles = StyleSheet.create({
  rating:  {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 16,
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee'
  },
  headerActions: {
    flexDirection: 'row',
    gap: 20,
  }
});
