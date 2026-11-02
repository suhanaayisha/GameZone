import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, type DrawerContentComponentProps } from '@react-navigation/drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useAppTheme, useThemePreference, type ThemePreference } from '../styles/theme';

const options: { value: ThemePreference; label: string; icon: keyof typeof MaterialIcons.glyphMap }[] = [
    { value: 'system', label: 'System', icon: 'brightness-auto' },
    { value: 'light', label: 'Light', icon: 'light-mode' },
    { value: 'dark', label: 'Dark', icon: 'dark-mode' },
];

const DrawerContent = (props: DrawerContentComponentProps) => {
    const { colors } = useAppTheme();
    const { preference, setPreference } = useThemePreference();
    const insets = useSafeAreaInsets();

    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <View style={[styles.footer, { borderTopColor: colors.border, paddingBottom: insets.bottom + 16 }]}>
                <Text style={[styles.label, { color: colors.textMuted }]}>Appearance</Text>
                <View style={[styles.segmented, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}>
                    {options.map((option) => {
                        const selected = preference === option.value;
                        return (
                            <Pressable
                                key={option.value}
                                onPress={() => setPreference(option.value)}
                                accessibilityRole="button"
                                accessibilityState={{ selected }}
                                style={[styles.segment, selected && { backgroundColor: colors.primary }]}
                            >
                                <MaterialIcons name={option.icon} size={18} color={selected ? colors.onPrimary : colors.text} />
                                <Text style={[styles.segmentText, { color: selected ? colors.onPrimary : colors.text }]}>
                                    {option.label}
                                </Text>
                            </Pressable>
                        );
                    })}
                </View>
            </View>
        </View>
    );
}

export default DrawerContent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    footer: {
        borderTopWidth: StyleSheet.hairlineWidth,
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    label: {
        fontSize: 13,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 8,
    },
    segmented: {
        flexDirection: 'row',
        borderRadius: 12,
        borderWidth: 1,
        padding: 3,
    },
    segment: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 8,
        borderRadius: 9,
        gap: 2,
    },
    segmentText: {
        fontSize: 12,
        fontWeight: '600',
    },
});
