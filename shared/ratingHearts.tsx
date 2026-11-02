import React from 'react';
import { View, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAppTheme } from '../styles/theme';

type Props = {
    rating: number;
    size?: number;
    // When set, the hearts become tappable and report the chosen rating.
    onChange?: (rating: number) => void;
};

const RatingHearts = ({ rating, size = 18, onChange }: Props) => {
    const { colors } = useAppTheme();
    return (
        <View style={{ flexDirection: 'row', gap: size / 4 }} accessibilityLabel={`Rating ${rating} out of 5`}>
            {[1, 2, 3, 4, 5].map((n) => {
                const icon = (
                    <MaterialIcons
                        name={n <= rating ? 'favorite' : 'favorite-border'}
                        size={size}
                        color={n <= rating ? colors.primary : colors.textMuted}
                    />
                );
                return onChange ? (
                    <Pressable key={n} onPress={() => onChange(n)} hitSlop={6} accessibilityRole="button" accessibilityLabel={`Rate ${n} out of 5`}>
                        {icon}
                    </Pressable>
                ) : (
                    <View key={n}>{icon}</View>
                );
            })}
        </View>
    );
}

export default RatingHearts;
