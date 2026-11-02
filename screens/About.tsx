import React from 'react';
import { Text, View, Image, ScrollView, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import Card from '../shared/card';
import { useReviews } from '../hooks/useReviews';

const About = () => {
    const { reviews } = useReviews();
    const averageRating = reviews.length
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : '–';
    const topRated = reviews.filter((r) => r.rating === 5).length;

    return (
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Image source={require('../assets/heart_logo.png')} style={styles.logo}/>
          <Text style={styles.title}>GameZone</Text>
          <Text style={styles.tagline}>Your personal log of game reviews.</Text>
        </View>

        <Card>
          <Text style={styles.sectionTitle}>Your stats</Text>
          <View style={styles.stats}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{reviews.length}</Text>
              <Text style={styles.statLabel}>Reviews</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{averageRating}</Text>
              <Text style={styles.statLabel}>Avg rating</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{topRated}</Text>
              <Text style={styles.statLabel}>5-star games</Text>
            </View>
          </View>
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>How it works</Text>
          <Text style={styles.paragraph}>• Tap + on the home screen to review a game and rate it from 1 to 5.</Text>
          <Text style={styles.paragraph}>• Tap a review to read it, then use the pencil to edit it or the bin to delete it.</Text>
          <Text style={styles.paragraph}>• Reviews are saved on this device, so they're still here next time you open the app.</Text>
        </Card>

        <Text style={styles.version}>Version {Constants.expoConfig?.version ?? '1.0.0'}</Text>
      </ScrollView>
    );
  }

export default About;

const styles = StyleSheet.create({
  content: {
    padding: 24,
  },
  hero: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 64,
    height: 64,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 15,
    color: '#666',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f01d71',
  },
  statLabel: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 22,
    color: '#444',
    marginBottom: 6,
  },
  version: {
    textAlign: 'center',
    color: '#999',
    marginTop: 16,
  },
});
