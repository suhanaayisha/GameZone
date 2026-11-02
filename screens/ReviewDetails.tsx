import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { globalStyles, images } from '../styles/global';
import Card from '../shared/card';
import type { HomeStackParamList } from '../routes/types';

type Props = NativeStackScreenProps<HomeStackParamList, 'ReviewDetails'>;

const ReviewDetails = ({ route }: Props) => {
  const { title, rating, body } = route.params;
    return (
      <View style={globalStyles.container}>
        <Card>
          <Text>{title}</Text>
          <Text>{body}</Text>
          <View style={styles.rating}>
            <Text>Gamezone rating</Text>
            <Image source={images.ratings[rating]}/>
          </View>
        </Card>
      </View>
    );
  }

export default ReviewDetails;


export const styles = StyleSheet.create({
  rating:  {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 16,
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee'
  }
});
