import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, ActivityIndicator, StyleSheet, type StyleProp, type TextStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import GameCover from './gameCover';
import RawgAttribution from './rawgAttribution';
import { isRawgConfigured, searchGames } from '../api/rawg';
import { useAppTheme } from '../styles/theme';
import type { GameInfo } from '../types/review';

type Props = {
    title: string;
    game: GameInfo | null;
    onChangeTitle: (title: string) => void;
    onSelectGame: (game: GameInfo | null) => void;
    onBlur: () => void;
    inputStyle: StyleProp<TextStyle>;
};

const year = (released?: string) => released?.slice(0, 4);

// Title input that suggests matching games from RAWG. Picking one links it to the review;
// typing a title without picking still works.
const GameSearch = ({ title, game, onChangeTitle, onSelectGame, onBlur, inputStyle }: Props) => {
    const { colors } = useAppTheme();
    const [results, setResults] = useState<GameInfo[]>([]);
    const [loading, setLoading] = useState(false);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        const query = title.trim();
        if (!isRawgConfigured || game || query.length < 2) {
            setResults([]);
            setLoading(false);
            return;
        }
        const controller = new AbortController();
        setLoading(true);
        const timer = setTimeout(() => {
            searchGames(query, controller.signal)
                .then((games) => {
                    setResults(games);
                    setFailed(false);
                })
                .catch((error) => {
                    if (controller.signal.aborted) return;
                    console.warn(error);
                    setResults([]);
                    setFailed(true);
                })
                .finally(() => {
                    if (!controller.signal.aborted) setLoading(false);
                });
        }, 400);
        return () => {
            clearTimeout(timer);
            controller.abort();
        };
    }, [title, game]);

    if (game) {
        return (
            <View style={[styles.selected, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}>
                <GameCover uri={game.coverUrl} size={48} />
                <View style={styles.resultText}>
                    <Text style={[styles.resultName, { color: colors.text }]} numberOfLines={1}>{game.name}</Text>
                    <Text style={{ color: colors.textMuted }} numberOfLines={1}>
                        {[year(game.released), game.genres.slice(0, 2).join(', ')].filter(Boolean).join(' · ')}
                    </Text>
                </View>
                <MaterialIcons name="close" size={22} color={colors.textMuted} onPress={() => onSelectGame(null)} accessibilityLabel="Unlink game" />
            </View>
        );
    }

    return (
        <View>
            <View>
                {isRawgConfigured && (
                    <View style={styles.searchIcon} pointerEvents="none">
                        <MaterialIcons name="search" size={22} color={colors.textMuted} />
                    </View>
                )}
                <TextInput
                    style={[inputStyle, isRawgConfigured && styles.searchInput]}
                    placeholder={isRawgConfigured ? 'Search for a game' : 'Game title'}
                    placeholderTextColor={colors.textMuted}
                    onChangeText={onChangeTitle}
                    value={title}
                    onBlur={onBlur}
                    autoCorrect={false}
                />
                {loading && <ActivityIndicator style={styles.spinner} color={colors.primary} />}
            </View>
            {!isRawgConfigured && __DEV__ && (
                <Text style={[styles.hint, { color: colors.textMuted }]}>
                    Game search is off. Add EXPO_PUBLIC_RAWG_API_KEY to .env.local and restart Expo to turn it on.
                </Text>
            )}
            {failed && <Text style={[styles.hint, { color: colors.textMuted }]}>Couldn't reach game search. You can still type a title.</Text>}
            {results.length > 0 && (
                <View style={[styles.results, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    {results.map((result) => (
                        <Pressable
                            key={result.id}
                            onPress={() => {
                                onChangeTitle(result.name);
                                onSelectGame(result);
                            }}
                            style={({ pressed }) => [styles.result, { opacity: pressed ? 0.6 : 1 }]}
                        >
                            <GameCover uri={result.coverUrl} size={40} />
                            <View style={styles.resultText}>
                                <Text style={[styles.resultName, { color: colors.text }]} numberOfLines={1}>{result.name}</Text>
                                {result.released && <Text style={{ color: colors.textMuted }}>{year(result.released)}</Text>}
                            </View>
                        </Pressable>
                    ))}
                    <RawgAttribution />
                </View>
            )}
        </View>
    );
}

export default GameSearch;

const styles = StyleSheet.create({
    searchIcon: {
        position: 'absolute',
        left: 12,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        zIndex: 1,
    },
    searchInput: {
        paddingLeft: 42,
    },
    spinner: {
        position: 'absolute',
        right: 12,
        top: 0,
        bottom: 0,
    },
    hint: {
        fontSize: 13,
        marginTop: 6,
    },
    results: {
        marginTop: 6,
        borderRadius: 12,
        borderWidth: StyleSheet.hairlineWidth,
        paddingVertical: 4,
    },
    result: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    resultText: {
        flex: 1,
    },
    resultName: {
        fontSize: 16,
        fontWeight: '600',
    },
    selected: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        borderWidth: 1,
        borderRadius: 12,
        padding: 10,
    },
});
