import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;

function Chat(props) {
  const ChatData = props.ChatData;
  console.log(ChatData);
  return (
    <View style={{ minHeight: windowHeight, gap: 10 }}>
      {ChatData.map((chat, index) => (
        <View key={index} style={chat.status === 'sent' ? styles.ChatBubbleSend : styles.ChatBubbleReceive}>
          <Text style={styles.ChatText}>{chat.message}</Text>
          <Text style={styles.ChatTimeStamp}>{chat.time}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  ChatBubbleReceive: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    padding: 10,
    minHeight: 30,
    width: '80%',
    backgroundColor: '#828ea1',
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  ChatBubbleSend: {
    alignSelf: 'flex-end',
    marginRight: 10,
    padding: 10,
    minHeight: 30,
    width: '80%',
    backgroundColor: '#8dc288',
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  ChatText: {
    fontSize: 20,
  },
  ChatTimeStamp: {
    alignSelf: 'flex-end',
  },
});

export default Chat;
