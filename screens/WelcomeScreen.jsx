import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getName } from '../firebaseConnect';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { StatusBar, Platform } from 'react-native';
import HomeScreenCard from '../Components/HomeScreenCard';
import complainImage from '../assets/ComplainLogo.png';
import QueryLogo from '../assets/QueryLogo.png';
import ProfileLogo from '../assets/ProfileLogo.png';
import BottomNavBar from '../Components/BottomNavBar';
import { useNavigation } from '@react-navigation/native';


const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 20;

function WelcomeScreen() {
  const navigation = useNavigation();

  const route = useRoute();
  const userId = route.params.userId;

  const userEmail=route.params.userEmail;
  const [userName, setUserName] = useState(null);

  function triggerNewComplaint() {
     navigation.navigate("Complaint",{userEmail: userEmail});//Create New Complaint Logic
  }
  function triggerNewQuery() {
    Alert.alert("Register New Query Logic"); //Create New Query Logic
  }

  
  

  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const name = await getName(userId);
        setUserName(name);
        // Simulate loading for a few seconds
        setTimeout(() => setLoading(false), 2000); // 3000 milliseconds = 3 seconds
      } catch (error) {
        console.error('Error fetching user name:', error);
      }
    };
    fetchUserName();
  }, [userId]);

  if (!fontsLoaded || loading) {
    return (
      <View style={{justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ); // Needs a loading screen
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.WelcomeTextWrapperContainer}>
          <View style={styles.WelcomeTextWrapper}>
            <Text style={styles.WelcomeText}>Welcome, {userName || 'loading...'}.  </Text>
          </View>
        </View>

        

        
        <View style={styles.scrollWrapper}>
          <ScrollView contentContainerStyle={styles.MainPageContainer} scrollEnabled={true}>
            
              <HomeScreenCard
                title="New Complaint"
                description="Contact our officials to register a complaint and interact with them to resolve your issues"
                imageSource={complainImage}
                onPress={triggerNewComplaint}
              />
              <HomeScreenCard
                title="New Query"
                description="Contact our officials to resolve a query and interact with them to gain more insights"
                imageSource={QueryLogo}
                onPress={triggerNewQuery}
              />

          </ScrollView>
          <BottomNavBar source1={QueryLogo} source2={complainImage} source3={ProfileLogo} userEmail={userEmail}/>
        </View>
        
        
        
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#483670',
    alignItems: 'center',
    paddingTop: statusBarHeight,
  },
  WelcomeTextWrapperContainer: {
    alignSelf: "flex-start",
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
  WelcomeTextWrapper: {
    backgroundColor: '#222222',
    borderRadius: 20,
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  WelcomeText: {
    fontFamily: 'Montserrat_700Bold',
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
  },
  MainPageContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#e9e4f5',
    paddingBottom: 80, // Adjust paddingBottom to accommodate the NavigationBarContainer height
  },
  scrollWrapper: {
    paddingBottom: 137,
  },
});

export default WelcomeScreen;
