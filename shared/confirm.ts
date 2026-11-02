import { Alert, Platform } from 'react-native';

// Alert.alert buttons don't work on web, so fall back to the browser's confirm dialog there.
export const confirm = (title: string, message: string, confirmText: string, onConfirm: () => void) => {
    if (Platform.OS === 'web') {
        if (window.confirm(`${title}\n\n${message}`)) onConfirm();
        return;
    }
    Alert.alert(title, message, [
        { text: 'Cancel', style: 'cancel' },
        { text: confirmText, style: 'destructive', onPress: onConfirm },
    ]);
}
