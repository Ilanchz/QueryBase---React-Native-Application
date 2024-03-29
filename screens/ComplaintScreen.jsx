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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height * 0.75;
const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 20;

function ComplainScreen() {
  const [loading, setLoading] = useState(true);
  const [chatText, setChatText] = useState('');
  const [ChatData, setChatData] = useState([
    { message: "message", time: "10:25", status: "sent" },
    { message: "message", time: "10:25", status: "receive" }
  ]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  function triggerSend() {

    //Update firebase use realtime chat data 

    setChatData(prevChatData => [
      ...prevChatData,
      { message: chatText, time: "10:55", status: "sent" }
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
    backgroundColor: '#222222',
    borderRadius: 20,
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
