import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { Appearance, Platform, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme, DefaultTheme, type Theme } from '@react-navigation/native';

const light = {
    background: '#f6f6f8',
    card: '#ffffff',
    inputBackground: '#ffffff',
    text: '#1c1c1e',
    textMuted: '#6b6b73',
    border: '#e4e4e8',
    primary: '#f01d71',
    onPrimary: '#ffffff',
    danger: '#d32f2f',
};

const dark: typeof light = {
    background: '#121214',
    card: '#1e1e22',
    inputBackground: '#26262b',
    text: '#f2f2f5',
    textMuted: '#a0a0aa',
    border: '#2e2e34',
    primary: '#ff4d8d',
    onPrimary: '#ffffff',
    danger: '#ff6b6b',
};

export type Colors = typeof light;

export type ThemePreference = 'system' | 'light' | 'dark';

const STORAGE_KEY = 'gamezone:theme';

type ThemeContextValue = {
    preference: ThemePreference;
    setPreference: (preference: ThemePreference) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [preference, setPreferenceState] = useState<ThemePreference>('system');

    useEffect(() => {
        AsyncStorage.getItem(STORAGE_KEY)
            .then((stored) => {
                if (stored === 'light' || stored === 'dark' || stored === 'system') {
                    setPreferenceState(stored);
                }
            })
            .catch((error) => console.warn('Failed to load theme', error));
    }, []);

    useEffect(() => {
        // Keeps native UI (alerts, keyboard) in step with the app. Not available on web.
        if (Platform.OS !== 'web') {
            Appearance.setColorScheme(preference === 'system' ? 'auto' : preference);
        }
    }, [preference]);

    const setPreference = (next: ThemePreference) => {
        setPreferenceState(next);
        AsyncStorage.setItem(STORAGE_KEY, next).catch((error) =>
            console.warn('Failed to save theme', error)
        );
    };

    return (
        <ThemeContext.Provider value={{ preference, setPreference }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useThemePreference = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemePreference must be used inside ThemeProvider');
    }
    return context;
};

// Uses the user's choice, or the phone's light/dark setting when set to "system".
export const useAppTheme = () => {
    const { preference } = useThemePreference();
    const systemScheme = useColorScheme();
    const isDark = preference === 'system' ? systemScheme === 'dark' : preference === 'dark';
    return { isDark, colors: isDark ? dark : light };
};

export const navigationTheme = (isDark: boolean): Theme => {
    const base = isDark ? DarkTheme : DefaultTheme;
    const colors = isDark ? dark : light;
    return {
        ...base,
        colors: {
            ...base.colors,
            primary: colors.primary,
            background: colors.background,
            card: colors.card,
            text: colors.text,
            border: colors.border,
        },
    };
};
