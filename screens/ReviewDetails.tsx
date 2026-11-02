import React, { useLayoutEffect, useState } from 'react';
import { Text, View, ScrollView, Image, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import Card from '../shared/card';
import RatingHearts from '../shared/ratingHearts';
import RawgAttribution from '../shared/rawgAttribution';
import { rawgGameUrl } from '../api/rawg';
import ReviewFormModal from '../shared/reviewFormModal';
import { confirm } from '../shared/confirm';
import { useAppTheme } from '../styles/theme';
import type { HomeStackParamList } from '../routes/types';
import type { ReviewInput } from '../types/review';
import { useReviews } from '../hooks/useReviews';

type Props = NativeStackScreenProps<HomeStackParamList, 'ReviewDetails'>;

const ReviewDetails = ({ route, navigation }: Props) => {
  const { reviews, updateReview, deleteReview } = useReviews();
  const { colors } = useAppTheme();
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
          <MaterialIcons name="edit" size={24} color={colors.text} onPress={() => setEditing(true)} accessibilityLabel="Edit review" />
          <MaterialIcons name="delete-outline" size={24} color={colors.danger} onPress={handleDelete} accessibilityLabel="Delete review" />
        </View>
      ),
    });
  });

  if (!review) {
    return null;
  }

  const { title, rating, body, game } = review;
  const meta = game ? [game.released?.slice(0, 4), game.genres.slice(0, 3).join(', ')].filter(Boolean).join(' · ') : '';
    return (
      <ScrollView contentContainerStyle={styles.content}>
        <ReviewFormModal
          title="Edit review"
          visible={editing}
          onClose={() => setEditing(false)}
          onSubmit={handleUpdate}
          initialReview={{ title, rating, body, game }}
        />
        {game?.coverUrl && <Image source={{ uri: game.coverUrl }} style={styles.cover} />}
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        {!!meta && <Text style={[styles.meta, { color: colors.textMuted }]}>{meta}</Text>}
        <View style={styles.rating}>
          <RatingHearts rating={rating} size={24} />
          <Text style={[styles.ratingText, { color: colors.textMuted }]}>{rating} / 5</Text>
        </View>
        <Card>
          <Text style={[styles.body, { color: colors.text }]}>{body}</Text>
        </Card>
        {game && game.platforms.length > 0 && (
          <Text style={[styles.platforms, { color: colors.textMuted }]}>
            Available on {game.platforms.join(', ')}
          </Text>
        )}
        {game && <RawgAttribution url={rawgGameUrl(game.slug)} />}
      </ScrollView>
    );
  }

export default ReviewDetails;


export const styles = StyleSheet.create({
  content: {
    padding: 20,
  },
  cover: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 14,
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  meta: {
    fontSize: 15,
    marginTop: 4,
  },
  platforms: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 12,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
    marginBottom: 16,
  },
  ratingText: {
    fontSize: 15,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 20,
  }
});
