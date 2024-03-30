import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, StyleSheet, Alert, ActivityIndicator, Image, TextInput, TouchableOpacity } from 'react-native';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { StatusBar, Platform } from 'react-native';
import complainImage from '../assets/ComplainLogo.png';
import BottomNavBar from '../Components/BottomNavBar';
import QueryLogo from '../assets/QueryLogo.png';
import ProfileLogo from '../assets/ProfileLogo.png';
import { Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import AllChats from '../Components/AllChats';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { getAllChats } from '../firebaseConnect';

//New

import {retrieveChatData,sendMessage} from '../firebaseConnect.js';

//

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height * 0.75;
const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 20;

function ChatScreen() {

    const route = useRoute();
    const userEmail = route.params.userEmail;
    const [loading, setLoading] = useState(true);
    const [ChatHistory, setChatHistory] = useState([]);
  
    useEffect(() => {
      getAllChats(userEmail)
        .then(chats => {
          setChatHistory(chats);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error retrieving all chats:', error);
          setLoading(false);
        });
    }, []);


  // getChatData with userEmail

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  if (!fontsLoaded || loading) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.ComplainScreenNavBarContainer}>
          <View style={styles.ComplainScreenNavBar}>
            <Image source={complainImage} style={styles.NavBarLogo} />
            <Text style={{fontSize:20,color:"#ffffff"}}>All chats</Text>
          </View>
        </View>

        <View style={styles.scrollWrapper}>
          <ScrollView contentContainerStyle={styles.MainPageContainer} scrollEnabled={true}>
            <AllChats ChatHistory={ChatHistory} userEmail={userEmail}/>
          </ScrollView>
          <BottomNavBar source1={QueryLogo} source2={complainImage} source3={ProfileLogo} />
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
  ComplainScreenNavBarContainer: {
    alignSelf: "flex-start",
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
  ComplainScreenNavBar: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: '#222222',
    borderRadius: 25,
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  MainPageContainer: {
    paddingTop: 30,
    backgroundColor: "#1d242b",
    paddingBottom: 80,
  },
  scrollWrapper: {
    paddingBottom: 160,
  },
  NavBarLogo: {
    width: 50,
    height: 50,
    padding: 5,
  },
  chatBoxContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    height: 50,
    backgroundColor: "white",
    width: windowWidth,
  },
  TextInputBox: {
    textAlign: "justify",
    width: "75%",
    padding: 5,
    borderWidth: 2,
    fontSize: 15,
    borderColor: "#93a7c7",
    flexWrap: "wrap",
    borderRadius: 5,
  },
});

export default ChatScreen;
