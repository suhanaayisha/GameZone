import React from 'react';
import { Modal, TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import ReviewForm from '../screens/ReviewForm';
import type { ReviewInput } from '../types/review';

type Props = {
    visible: boolean;
    onClose: () => void;
    onSubmit: (review: ReviewInput) => void;
    initialReview?: ReviewInput;
};

const ReviewFormModal = ({ visible, onClose, onSubmit, initialReview }: Props) => {
    return (
        <Modal visible={visible} animationType='slide' onRequestClose={onClose}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={styles.modalContent}>
                    <MaterialIcons
                        name="close"
                        size={24}
                        onPress={onClose}
                        style={styles.modalClose}
                    />
                    <ReviewForm onSubmit={onSubmit} initialReview={initialReview}/>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

export default ReviewFormModal;

const styles = StyleSheet.create({
    modalContent: {
        flex: 1,
        padding: 24,
    },
    modalClose: {
        borderWidth: 1,
        borderColor: '#f2f2f2',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 0,
    }
});
