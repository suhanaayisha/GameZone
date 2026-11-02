import React from 'react';
import { Text, View, TextInput, ScrollView, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { DefaultButton as Button } from '../shared/button';
import RatingHearts from '../shared/ratingHearts';
import { useAppTheme } from '../styles/theme';
import type { ReviewInput } from '../types/review';

const ReviewSchema = yup.object({
    title: yup.string().required().min(4),
    body: yup.string().required().min(8),
    rating: yup.string().required('pick a rating').test('is-num-1-5', 'rating must be a number between 1 to 5', (val) => {
        return parseInt(val, 10) < 6 && parseInt(val, 10) > 0;
    })
})

type Props = {
    onSubmit: (review: ReviewInput) => void;
    initialReview?: ReviewInput;
};

const ReviewForm = ({ onSubmit, initialReview }: Props) => {
    const { colors } = useAppTheme();
    const inputStyle = [styles.input, { color: colors.text, backgroundColor: colors.inputBackground, borderColor: colors.border }];
    const labelStyle = [styles.label, { color: colors.textMuted }];
    const errorStyle = [styles.errorText, { color: colors.danger }];

   return(
       <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag">
           <Formik
            initialValues={{
                title: initialReview?.title ?? '',
                body: initialReview?.body ?? '',
                rating: initialReview ? String(initialReview.rating) : '',
            }}
            validationSchema={ReviewSchema}
            onSubmit={(values, actions) => {
                actions.resetForm()
                onSubmit({ ...values, rating: parseInt(values.rating, 10) });
            }}
           >
            {(props) => (
                <View>
                    <Text style={labelStyle}>Game</Text>
                    <TextInput
                        style={inputStyle}
                        placeholder={"Game title"}
                        placeholderTextColor={colors.textMuted}
                        onChangeText={props.handleChange('title')}
                        value={props.values.title}
                        onBlur={props.handleBlur('title')}
                    />
                    <Text style={errorStyle}>{props.touched.title && props.errors.title}</Text>

                    <Text style={labelStyle}>Review</Text>
                    <TextInput
                        multiline
                        style={[inputStyle, styles.bodyInput]}
                        placeholder={"What did you think?"}
                        placeholderTextColor={colors.textMuted}
                        onChangeText={props.handleChange('body')}
                        value={props.values.body}
                        onBlur={props.handleBlur('body')}
                    />
                    <Text style={errorStyle}>{props.touched.body && props.errors.body}</Text>

                    <Text style={labelStyle}>Rating</Text>
                    <RatingHearts
                        rating={parseInt(props.values.rating, 10) || 0}
                        size={36}
                        onChange={(rating) => {
                            props.setFieldTouched('rating', true, false);
                            props.setFieldValue('rating', String(rating));
                        }}
                    />
                    <Text style={errorStyle}>{props.touched.rating && props.errors.rating}</Text>

                    <Button text="Save review" onPress={() => props.handleSubmit()}/>
                </View>
            )}

           </Formik>
       </ScrollView>
   )
}

export default ReviewForm;

const styles = StyleSheet.create({
    content: {
        padding: 20,
    },
    label: {
        fontSize: 13,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        padding: 12,
        fontSize: 17,
        borderRadius: 12,
    },
    bodyInput: {
        minHeight: 120,
        textAlignVertical: 'top',
    },
    errorText: {
        fontSize: 13,
        marginTop: 4,
        marginBottom: 12,
    },
});
