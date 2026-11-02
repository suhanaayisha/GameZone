import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

type Props = {
    text: string;
    onPress: () => void;
};

export const DefaultButton = (props: Props) => {
    const { text, onPress } = props;
    return(
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>
                    {text}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 10,
        backgroundColor: '#f01d71'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 16,
        textAlign: 'center'
    }
})