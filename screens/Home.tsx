import React, { useState } from 'react';
import { Text, View, Pressable, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Card from '../shared/card';
import RatingHearts from '../shared/ratingHearts';
import GameCover from '../shared/gameCover';
import RawgAttribution from '../shared/rawgAttribution';
import { MaterialIcons } from '@expo/vector-icons';
import ReviewFormModal from '../shared/reviewFormModal';
import { useAppTheme } from '../styles/theme';
import type { HomeStackParamList } from '../routes/types';
import type { ReviewInput } from '../types/review';
import { useReviews } from '../hooks/useReviews';

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>;

const Home = ({ navigation }: Props) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const { reviews, loaded, addReview } = useReviews();
    const { colors } = useAppTheme();
    const insets = useSafeAreaInsets();

    const handleAdd = (review: ReviewInput) => {
      addReview(review);
      setModalOpen(false);
    }

    return (
      <View style={styles.container}>
        <ReviewFormModal
          title="New review"
          visible={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleAdd}
        />
        {!loaded ? (
          <ActivityIndicator color={colors.primary} style={styles.loading} />
        ) : (
          <FlatList
            data={reviews}
            contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + 96 }]}
            ListFooterComponent={reviews.some((r) => r.game) ? <RawgAttribution /> : undefined}
            ListEmptyComponent={
              <View style={styles.empty}>
                <MaterialIcons name="sports-esports" size={56} color={colors.textMuted} />
                <Text style={[styles.emptyTitle, { color: colors.text }]}>No reviews yet</Text>
                <Text style={{ color: colors.textMuted }}>Tap + to review your first game.</Text>
              </View>
            }
            renderItem={({item}) => (
              <Pressable
                onPress={() => navigation.navigate('ReviewDetails', { reviewKey: item.key })}
                style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
              >
                <Card>
                  <View style={styles.row}>
                    <GameCover uri={item.game?.coverUrl} size={64} />
                    <View style={styles.rowText}>
                      <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>{item.title}</Text>
                      <RatingHearts rating={item.rating} size={16} />
                      <Text style={[styles.preview, { color: colors.textMuted }]} numberOfLines={2}>{item.body}</Text>
                    </View>
                    <MaterialIcons name="chevron-right" size={24} color={colors.textMuted} />
                  </View>
                </Card>
              </Pressable>
            )}
          />
        )}
        <Pressable
          onPress={() => setModalOpen(true)}
          accessibilityRole="button"
          accessibilityLabel="Add review"
          style={({ pressed }) => [styles.fab, { backgroundColor: colors.primary, bottom: insets.bottom + 24, opacity: pressed ? 0.85 : 1 }]}
        >
          <MaterialIcons name="add" size={30} color={colors.onPrimary} />
        </Pressable>
      </View>
    );
}

export default Home;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    marginTop: 32,
  },
  list: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  rowText: {
    flex: 1,
    gap: 6,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
  },
  preview: {
    fontSize: 14,
    lineHeight: 20,
  },
  empty: {
    alignItems: 'center',
    marginTop: 80,
    gap: 8,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
});
