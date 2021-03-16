import React from 'react';
import { Button, Text, View, Image } from 'react-native';
import { globalStyles, images } from '../styles/global';
import Card from '../shared/card';
import { StyleSheet } from 'react-native';
const ReviewDetails = (props: any) => {
  const { title, rating, body } = props.route.params;
  const rating1=rating.toString();
    return (
      <View style={globalStyles.container}>
        <Card>
          <Text>{title}</Text>
          <Text>{body}</Text>
          <View style={styles.rating}>
            <Text>Gamezone rating</Text>
            <Image source={images.ratings[rating1]}/>
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

