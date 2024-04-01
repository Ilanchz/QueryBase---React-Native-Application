import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { getConversation } from '../firebaseConnect';
import { useNavigation } from '@react-navigation/native';

const windowHeight = Dimensions.get('window').height;

function Chat(props) {
  const navigation = useNavigation();
  const ChatHistory = props.ChatHistory;
  const userEmail=props.userEmail;

  function openChat(value) {
    const newUser=ChatHistory[value];
    //getConversation and store it in the format of  [{ message: "message", time: Time , status: "recieve" }],
    getConversation(userEmail,newUser)
    .then(conversation => {
      // Log the retrieved conversation data
      navigation.navigate("ComplaintChat",{ChatData:conversation,userEmail:userEmail,adminName:newUser});
    })
    .catch(error => {
      console.error('Error retrieving conversation:', error);
    });

  }

  return (
    <View style={{ minHeight: windowHeight, gap: 2 }}>
      {ChatHistory.map((chat, index) => (
        <TouchableOpacity key={index} onPress={() => openChat(index)}>
          <View style={styles.ChatOutline}>
            <View style={styles.profileLogo}>
              <MaterialIcons name="person" size={50} color="white" backgroundColor="#181b1f" />
            </View>
            <Text style={styles.ChatContact}>{ChatHistory[index]}</Text>
          </View>
        </TouchableOpacity>
      ))}
    <Text style={{textAlign:"center",fontSize:15,color:"#fff",borderTopWidth: 2,borderColor:"#fff",marginTop:10}}>chat ends here</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  ChatOutline: {
    flexDirection: "row",
    padding: 10,
    minHeight: 80,
    backgroundColor: '#181b1f',
    borderWidth: 2,
    borderColor: '#b8bdc2',
    borderRadius: 10,
    margin: 5,
  },
  ChatContact: {
    margin: 5,
    padding: 5,
    fontSize: 25,
    alignSelf: 'flex-start',
    marginLeft: 10,
    color: "#fff",
    fontWeight: "bold",
  },
  profileLogo: {
    borderRadius: 25,
    overflow: 'hidden',
  }
});

export default Chat;
