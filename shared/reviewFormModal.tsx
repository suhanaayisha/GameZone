import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import ReviewForm from '../screens/ReviewForm';
import { useAppTheme } from '../styles/theme';
import type { ReviewInput } from '../types/review';

type Props = {
    title: string;
    visible: boolean;
    onClose: () => void;
    onSubmit: (review: ReviewInput) => void;
    initialReview?: ReviewInput;
};

const ReviewFormModal = ({ title, visible, onClose, onSubmit, initialReview }: Props) => {
    const { colors } = useAppTheme();
    return (
        <Modal visible={visible} animationType='slide' presentationStyle='pageSheet' onRequestClose={onClose}>
            <SafeAreaView style={[styles.modalContent, { backgroundColor: colors.background }]}>
                <View style={styles.modalHeader}>
                    <Text style={[styles.modalTitle, { color: colors.text }]}>{title}</Text>
                    <MaterialIcons name="close" size={26} color={colors.text} onPress={onClose} accessibilityLabel="Close" />
                </View>
                <ReviewForm onSubmit={onSubmit} initialReview={initialReview}/>
            </SafeAreaView>
        </Modal>
    )
}

export default ReviewFormModal;

const styles = StyleSheet.create({
    modalContent: {
        flex: 1,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 8,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
    },
});
