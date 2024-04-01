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
import Chat from '../Components/Chat';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

//New

import {sendMessage,getAdminWithLeastWork,IncrementAdminComplaint} from '../firebaseConnect.js';

//

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height * 0.75;
const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 20;

function ComplainScreen() {

  const route = useRoute();
  const userEmail = route.params.userEmail; // userEmail will come from route props
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [chatText, setChatText] = useState('');
  const currentTime = new Date();
  const Time = currentTime.getHours() + ":" + currentTime.getMinutes();
  const [adminName, setAdminName] = useState("");

  const newAdminName = route.params.adminName;
// Set adminName only if newAdminName is defined


    //adminName will come from route props

  const [ChatData, setChatData] = useState([
    { message: "Auto-Generated: Create your new complaint here!\nRegister your complaint along with necessary documents.\nWe will assign you a new admin.", time: Time , status: "recieve" },
  ]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  async function triggerSend() {

    //Update firebase use realtime chat data 

    //Get Admins- will assign a specfic admin with lowest no of tickets 
    //Returns admins username
    

    //Have to get senders username somehow

    //Update firebase use realtime chat data 


    if (adminName === null || adminName === "") {
      try {
        const fetchedAdminName = await getAdminWithLeastWork(); // Wait for the function to resolve
        setAdminName(fetchedAdminName); // Set the adminName state
        sendMessage(userEmail, fetchedAdminName, chatText); // Optionally, send message
        //increment admin complaint count
        IncrementAdminComplaint(fetchedAdminName);

      } catch (error) {
        console.error('Error fetching adminName:', error);
        // Handle error appropriately
      }
    } else {
      // If adminName is already available, directly send message
      sendMessage(userEmail, adminName, chatText);
    }
  
    const newDate = new Date();
    const newTime = currentTime.getHours() + ":" + currentTime.getMinutes();
  
    setChatData((prevChatData) => [
      ...prevChatData,
      { message: chatText, time: newTime, status: "sent" },
    ]);
    setChatText('');
  }

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
            <Text style={{fontSize:20,color:"#ffffff"}}>{adminName}</Text>
          </View>
        </View>

        <View style={styles.scrollWrapper}>
          <ScrollView contentContainerStyle={styles.MainPageContainer} scrollEnabled={true}>
            <Chat ChatData={ChatData} />
          </ScrollView>
          <View style={styles.chatBoxContainer}>
            <TextInput
              style={styles.TextInputBox}
              placeholder='Type a message...'
              multiline={true}
              numberOfLines={100}
              maxLength={1000}
              value={chatText}
              onChangeText={(text_input) => { setChatText(text_input) }}
            />
            <Ionicons name="document-attach-outline" size={24} color="blue" />
            <TouchableOpacity onPress={triggerSend}>
              <MaterialIcons name="send" size={24} color="blue" />
            </TouchableOpacity>
          </View>
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
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#e9e4f5',
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

export default ComplainScreen;
