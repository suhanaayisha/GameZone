import React from 'react';
import { Text, Linking, StyleSheet } from 'react-native';
import { useAppTheme } from '../styles/theme';
import { RAWG_URL } from '../api/rawg';

// RAWG's terms require a link back to RAWG wherever their data is shown.
const RawgAttribution = ({ url = RAWG_URL }: { url?: string }) => {
    const { colors } = useAppTheme();
    return (
        <Text style={[styles.text, { color: colors.textMuted }]}>
            Game data from{' '}
            <Text style={[styles.link, { color: colors.primary }]} onPress={() => Linking.openURL(url)} accessibilityRole="link">
                RAWG
            </Text>
        </Text>
    );
}

export default RawgAttribution;

const styles = StyleSheet.create({
    text: {
        fontSize: 12,
        textAlign: 'center',
        marginVertical: 8,
    },
    link: {
        fontWeight: '600',
        textDecorationLine: 'underline',
    },
});
