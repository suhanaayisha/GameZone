import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../styles/theme';

export const MenuButton = () => {
    const navigation = useNavigation();
    const { colors } = useAppTheme();
    const openMenu = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    }
    return <MaterialIcons name='menu' size={28} color={colors.text} onPress={openMenu} accessibilityLabel='Open menu' />;
}

// Doodle background in light mode; plain in dark mode, where the light image would glare.
export const HeaderBackground = () => {
    const { colors, isDark } = useAppTheme();
    return (
        <View style={[styles.background, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
            {!isDark && <Image source={require('../assets/game_bg.png')} style={styles.backgroundImage} />}
        </View>
    )
}

const Header = (props: { title: string }) => {
    const { colors } = useAppTheme();
    return(
        <View style={styles.headerTitle}>
            <Image source={require('../assets/heart_logo.png')} style={styles.headerImage}/>
            <Text style={[styles.headerText, { color: colors.text }]}>
                {props.title}
            </Text>
        </View>
    )
}
export default Header;

const styles = StyleSheet.create({
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        letterSpacing: 1,
    },
    headerImage: {
        width: 26,
        height: 26,
        marginHorizontal: 10
    },
    headerTitle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    background: {
        flex: 1,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        opacity: 0.6,
    },
})
