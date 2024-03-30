import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

// Initialize Firebase
const firebaseConfig = {
    databaseURL: "https://cypher-3e60c-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

async function sendMessage(participant1, participant2, message) {
  try {
    // Check if the conversation between participant1 and participant2 exists
    const chatRef = database.ref('chats');
    let chatId = null;

    await chatRef.once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const chat = childSnapshot.val();
        const participants = chat.participants;

        // Check if the conversation participants match the current participants
        if (
          participants.includes(participant1) &&
          participants.includes(participant2)
        ) {
          chatId = childSnapshot.key;
        }
      });
    });

    // If the conversation exists, append the message
    if (chatId) {
      const messageRef = database.ref(`chats/${chatId}/messages`).push();
      await messageRef.set({
        message: message,
        sender: participant1, // Assuming participant1 is the sender
        time: firebase.database.ServerValue.TIMESTAMP,
      });
    } else {
      // If the conversation doesn't exist, create a new chat ID and add the participants
      const newChatRef = chatRef.push();
      chatId = newChatRef.key;

      await newChatRef.set({
        participants: [participant1, participant2],
        messages: null, // Create an empty messages node
      });

      // Add the first message
      const messageRef = database.ref(`chats/${chatId}/messages`).push();
      await messageRef.set({
        message: message,
        sender: participant1, // Assuming participant1 is the sender
        time: firebase.database.ServerValue.TIMESTAMP,
      });
    }

    console.log('Message sent successfully!');
  } catch (error) {
    console.error('Error sending message:', error);
  }
}

async function retrieveChatData(participant) {
    try {
      const chatRef = database.ref('chats');
      const chatData = [];
  
      // Retrieve all chats that include the given participant
      await chatRef.once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const chat = childSnapshot.val();
          const participants = chat.participants;
  
          // Check if the participant is included in the conversation
          if (participants.includes(participant)) {
            chatData.push({
              chatId: childSnapshot.key,
              participants: participants,
              messages: chat.messages || [], // Handle the case where messages may be null
            });
          }
        });
      });
  
      console.log('Chat data retrieved successfully:', chatData);
      return chatData;
    } catch (error) {
      console.error('Error retrieving chat data:', error);
      throw error;
    }
}

sendMessage("admin@admin.in","newuser","Hello World");

export {retrieveChatData,sendMessage};
  
