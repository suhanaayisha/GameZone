import React, { type ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { useAppTheme } from '../styles/theme';

const Card = (props: { children: ReactNode }) => {
    const { colors } = useAppTheme();
    return (
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {props.children}
        </View>
    )
}

export default Card;

const styles = StyleSheet.create({
    card: {
        borderRadius: 14,
        borderWidth: StyleSheet.hairlineWidth,
        padding: 16,
        marginVertical: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
    },
})
