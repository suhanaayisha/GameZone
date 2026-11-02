import React from 'react';
import { Image, View, StyleSheet, type StyleProp, type ImageStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAppTheme } from '../styles/theme';

type Props = {
    uri?: string;
    size: number;
    style?: StyleProp<ImageStyle>;
};

// Square cover thumbnail, with a controller icon when there's no image.
const GameCover = ({ uri, size, style }: Props) => {
    const { colors } = useAppTheme();
    if (uri) {
        return <Image source={{ uri }} style={[styles.cover, { width: size, height: size }, style]} />;
    }
    return (
        <View style={[styles.cover, styles.placeholder, { width: size, height: size, backgroundColor: colors.inputBackground, borderColor: colors.border }, style]}>
            <MaterialIcons name="sports-esports" size={size / 2} color={colors.textMuted} />
        </View>
    );
}

export default GameCover;

const styles = StyleSheet.create({
    cover: {
        borderRadius: 10,
    },
    placeholder: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: StyleSheet.hairlineWidth,
    },
});
