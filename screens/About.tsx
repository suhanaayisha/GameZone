import React from 'react';
import { Text, View, Image, ScrollView, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import Card from '../shared/card';
import { useReviews } from '../hooks/useReviews';
import { useAppTheme } from '../styles/theme';
import RawgAttribution from '../shared/rawgAttribution';

const About = () => {
    const { reviews } = useReviews();
    const { colors } = useAppTheme();
    const averageRating = reviews.length
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : '–';
    const topRated = reviews.filter((r) => r.rating === 5).length;

    return (
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Image source={require('../assets/heart_logo.png')} style={styles.logo}/>
          <Text style={[styles.title, { color: colors.text }]}>GameZone</Text>
          <Text style={[styles.tagline, { color: colors.textMuted }]}>Your personal log of game reviews.</Text>
        </View>

        <Card>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Your stats</Text>
          <View style={styles.stats}>
            <View style={styles.stat}>
              <Text style={[styles.statValue, { color: colors.primary }]}>{reviews.length}</Text>
              <Text style={[styles.statLabel, { color: colors.textMuted }]}>Reviews</Text>
            </View>
            <View style={styles.stat}>
              <Text style={[styles.statValue, { color: colors.primary }]}>{averageRating}</Text>
              <Text style={[styles.statLabel, { color: colors.textMuted }]}>Avg rating</Text>
            </View>
            <View style={styles.stat}>
              <Text style={[styles.statValue, { color: colors.primary }]}>{topRated}</Text>
              <Text style={[styles.statLabel, { color: colors.textMuted }]}>5-star games</Text>
            </View>
          </View>
        </Card>

        <Card>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>How it works</Text>
          <Text style={[styles.paragraph, { color: colors.text }]}>• Tap + on the home screen and search for a game to pull in its cover, release date and genres. Then tap the hearts to rate it out of 5.</Text>
          <Text style={[styles.paragraph, { color: colors.text }]}>• Tap a review to read it, then use the pencil to edit it or the bin to delete it.</Text>
          <Text style={[styles.paragraph, { color: colors.text }]}>• Reviews are saved on this device, so they're still here next time you open the app.</Text>
          <Text style={[styles.paragraph, { color: colors.text }]}>• Switch between light and dark mode from the Appearance setting in the menu.</Text>
        </Card>

        <RawgAttribution />
        <Text style={[styles.version, { color: colors.textMuted }]}>Version {Constants.expoConfig?.version ?? '1.0.0'}</Text>
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
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 15,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
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
  },
  statLabel: {
    fontSize: 13,
    marginTop: 2,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 6,
  },
  version: {
    textAlign: 'center',
    marginTop: 16,
  },
});
