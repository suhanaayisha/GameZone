import React, { useState } from 'react';
import { View, Text, ActivityIndicator, Linking, StyleSheet } from 'react-native';
import Card from './card';
import { useGameDetails } from '../hooks/useGameDetails';
import { useAppTheme } from '../styles/theme';
import type { GameInfo } from '../types/review';

const COLLAPSED_LINES = 5;

// RAWG dates are YYYY-MM-DD. Parse as a local date so it doesn't shift a day in some time zones.
const formatDate = (released: string) => {
    const [year, month, day] = released.split('-').map(Number);
    if (!year || !month || !day) return released;
    return new Date(year, month - 1, day).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
};

const metacriticColor = (score: number) => (score >= 75 ? '#2e9e44' : score >= 50 ? '#d4a017' : '#d32f2f');

const GameDetailsSection = ({ game }: { game: GameInfo }) => {
    const { colors } = useAppTheme();
    const { details, loading, failed } = useGameDetails(game.id);
    const [expanded, setExpanded] = useState(false);

    const rows: { label: string; value: string; url?: string }[] = [];
    if (details?.developers.length) rows.push({ label: details.developers.length > 1 ? 'Developers' : 'Developer', value: details.developers.join(', ') });
    if (details?.publishers.length) rows.push({ label: details.publishers.length > 1 ? 'Publishers' : 'Publisher', value: details.publishers.join(', ') });
    if (game.released) rows.push({ label: 'Released', value: formatDate(game.released) });
    if (game.platforms.length) rows.push({ label: 'Platforms', value: game.platforms.join(', ') });
    if (details?.playtime) rows.push({ label: 'Avg. playtime', value: `${details.playtime} hour${details.playtime === 1 ? '' : 's'}` });
    if (details?.esrbRating) rows.push({ label: 'Age rating', value: details.esrbRating });
    if (details?.website) rows.push({ label: 'Website', value: details.website.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''), url: details.website });

    const description = details?.description;
    const isLong = (description?.length ?? 0) > 280;

    return (
        <Card>
            <View style={styles.headerRow}>
                <Text style={[styles.heading, { color: colors.text }]}>About the game</Text>
                {details?.metacritic != null && (
                    <View style={[styles.metacritic, { backgroundColor: metacriticColor(details.metacritic) }]} accessibilityLabel={`Metacritic score ${details.metacritic}`}>
                        <Text style={styles.metacriticScore}>{details.metacritic}</Text>
                        <Text style={styles.metacriticLabel}>Metacritic</Text>
                    </View>
                )}
            </View>

            {loading && <ActivityIndicator color={colors.primary} style={styles.loading} />}
            {failed && <Text style={[styles.hint, { color: colors.textMuted }]}>Couldn't load more details right now.</Text>}

            {description && (
                <View style={styles.description}>
                    <Text style={[styles.body, { color: colors.text }]} numberOfLines={expanded ? undefined : COLLAPSED_LINES}>
                        {description}
                    </Text>
                    {isLong && (
                        <Text style={[styles.toggle, { color: colors.primary }]} onPress={() => setExpanded(!expanded)} accessibilityRole="button">
                            {expanded ? 'Show less' : 'Show more'}
                        </Text>
                    )}
                </View>
            )}

            {rows.map((row) => (
                <View key={row.label} style={[styles.row, { borderTopColor: colors.border }]}>
                    <Text style={[styles.label, { color: colors.textMuted }]}>{row.label}</Text>
                    <Text
                        style={[styles.value, { color: row.url ? colors.primary : colors.text }]}
                        onPress={row.url ? () => Linking.openURL(row.url!) : undefined}
                        accessibilityRole={row.url ? 'link' : undefined}
                    >
                        {row.value}
                    </Text>
                </View>
            ))}
        </Card>
    );
}

export default GameDetailsSection;

const styles = StyleSheet.create({
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    heading: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    metacritic: {
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 4,
        alignItems: 'center',
    },
    metacriticScore: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    metacriticLabel: {
        color: '#fff',
        fontSize: 10,
        fontWeight: '600',
    },
    loading: {
        marginVertical: 12,
    },
    hint: {
        fontSize: 14,
        marginBottom: 8,
    },
    description: {
        marginBottom: 8,
    },
    body: {
        fontSize: 15,
        lineHeight: 22,
    },
    toggle: {
        fontSize: 15,
        fontWeight: '600',
        marginTop: 6,
    },
    row: {
        flexDirection: 'row',
        gap: 12,
        paddingVertical: 10,
        borderTopWidth: StyleSheet.hairlineWidth,
    },
    label: {
        width: 110,
        fontSize: 14,
    },
    value: {
        flex: 1,
        fontSize: 14,
        lineHeight: 20,
    },
});
