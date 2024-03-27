import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getName } from '../firebaseConnect';

function WelcomeScreen() {
  const route = useRoute();
  const userId = route.params.userId;
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const name = await getName(userId);
        setUserName(name);
      } catch (error) {
        console.error('Error fetching user name:', error);
      }
    };
    fetchUserName();
  }, [userId]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.WelcomeTextWrapper}>
        <Text style={styles.WelcomeText}>Greetings, {userName || 'loading...'}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  WelcomeTextWrapper: {
    backgroundColor: 'black',
    borderRadius: 10,
    margin: 5,
    padding: 5,
    flexWrap: 'wrap',
  },
  WelcomeText: {
    color: 'white',
    fontSize: 20,
  },
});

export default WelcomeScreen;
