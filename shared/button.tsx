import React from 'react';
import { StyleSheet, Pressable, Text } from 'react-native';
import { useAppTheme } from '../styles/theme';

type Props = {
    text: string;
    onPress: () => void;
};

export const DefaultButton = (props: Props) => {
    const { text, onPress } = props;
    const { colors } = useAppTheme();
    return(
        <Pressable
            onPress={onPress}
            accessibilityRole="button"
            style={({ pressed }) => [styles.button, { backgroundColor: colors.primary, opacity: pressed ? 0.8 : 1 }]}
        >
            <Text style={[styles.buttonText, { color: colors.onPrimary }]}>
                {text}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 10,
    },
    buttonText: {
        fontWeight: '600',
        fontSize: 16,
        textAlign: 'center'
    }
})
