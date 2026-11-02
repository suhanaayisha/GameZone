import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';

export const MenuButton = () => {
    const navigation = useNavigation();
    const openMenu = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    }
    return <MaterialIcons name='menu' size={28} color='#333' onPress={openMenu} />;
}

const Header = (props: { title: string }) => {
    return(
        <View style={styles.headerTitle}>
            <Image source={require('../assets/heart_logo.png')} style={styles.headerImage}/>
            <Text style={styles.headerText}>
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
        color: '#333',
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
    }
})
