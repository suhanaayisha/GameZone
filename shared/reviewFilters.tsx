import React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAppTheme } from '../styles/theme';
import type { Review } from '../types/review';

export type SortOrder = 'newest' | 'rating' | 'title';

const sortOptions: { value: SortOrder; label: string }[] = [
    { value: 'newest', label: 'Newest' },
    { value: 'rating', label: 'Top rated' },
    { value: 'title', label: 'A–Z' },
];

// Reviews are stored newest first, so "newest" keeps the stored order.
export const filterAndSortReviews = (reviews: Review[], query: string, sort: SortOrder) => {
    const q = query.trim().toLowerCase();
    const filtered = q
        ? reviews.filter((r) =>
            [r.title, r.body, ...(r.game?.genres ?? [])].some((text) => text.toLowerCase().includes(q))
        )
        : reviews;
    if (sort === 'rating') {
        return [...filtered].sort((a, b) => b.rating - a.rating);
    }
    if (sort === 'title') {
        return [...filtered].sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: 'base' }));
    }
    return filtered;
};

type Props = {
    query: string;
    onChangeQuery: (query: string) => void;
    sort: SortOrder;
    onChangeSort: (sort: SortOrder) => void;
};

const ReviewFilters = ({ query, onChangeQuery, sort, onChangeSort }: Props) => {
    const { colors } = useAppTheme();
    return (
        <View style={styles.container}>
            <View style={[styles.search, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}>
                <MaterialIcons name="search" size={20} color={colors.textMuted} />
                <TextInput
                    style={[styles.searchInput, { color: colors.text }]}
                    placeholder="Search your reviews"
                    placeholderTextColor={colors.textMuted}
                    value={query}
                    onChangeText={onChangeQuery}
                    autoCorrect={false}
                    returnKeyType="search"
                    clearButtonMode="never"
                />
                {query.length > 0 && (
                    <MaterialIcons name="close" size={20} color={colors.textMuted} onPress={() => onChangeQuery('')} accessibilityLabel="Clear search" />
                )}
            </View>
            <View style={styles.sortRow}>
                {sortOptions.map((option) => {
                    const selected = sort === option.value;
                    return (
                        <Pressable
                            key={option.value}
                            onPress={() => onChangeSort(option.value)}
                            accessibilityRole="button"
                            accessibilityState={{ selected }}
                            style={[
                                styles.chip,
                                { borderColor: selected ? colors.primary : colors.border, backgroundColor: selected ? colors.primary : colors.card },
                            ]}
                        >
                            <Text style={[styles.chipText, { color: selected ? colors.onPrimary : colors.text }]}>{option.label}</Text>
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
}

export default ReviewFilters;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingTop: 12,
        gap: 10,
    },
    search: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 12,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 10,
    },
    sortRow: {
        flexDirection: 'row',
        gap: 8,
    },
    chip: {
        borderWidth: 1,
        borderRadius: 16,
        paddingHorizontal: 14,
        paddingVertical: 6,
    },
    chipText: {
        fontSize: 14,
        fontWeight: '600',
    },
});
