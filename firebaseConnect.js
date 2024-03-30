import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import 'firebase/compat/database';


const firebaseConfig = {
  apiKey: "AIzaSyB9oB6MIKOf2FbxTonAIXOPkFHg7oCE6nY",
  authDomain: "cypher-3e60c.firebaseapp.com",
  projectId: "cypher-3e60c",
  storageBucket: "cypher-3e60c.appspot.com",
  messagingSenderId: "426037548548",
  appId: "1:426037548548:web:7cfa80648f8d1cc6fd4751",
  measurementId: "G-ST1M0XGYC7",
  databaseURL: "https://cypher-3e60c-default-rtdb.asia-southeast1.firebasedatabase.app/"
};
let app;
if (firebase.apps.length===0){
    app=firebase.initializeApp(firebaseConfig);
}else{
    app=firebase.app();
}
const auth = firebase.auth();

const db = firebase.firestore();

const database = firebase.database();

async function addUserInitialData(password,email, name, dob) {
  console.log("Triggered!");
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    console.log('User Created:', user.email);
    const userRef = db.collection('user_info').doc(user.uid);
    console.log(userRef);
    await userRef.set({
      email: email,
      name: name,
      dob: dob,
    });
    console.log('User signed up successfully!');
  } catch (error) {
    console.error('Error adding user data:', error);
    throw error; // Re-throw the error to handle it in the calling code if needed
  }
}

async function getName(userId) {
  try {
    const userRef = db.collection('user_info').doc(userId);
    const userDoc = await userRef.get();

    if (userDoc.exists) {
      const userData = userDoc.data();
      const userName = userData.name;
      return userName;
    } else {
      console.log('No such user document!');
      return null;
    }
  } catch (error) {
    console.error('Error getting user data:', error);
    throw error;
  }
}

async function sendMessage(participant1, participant2, message) {

  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;


  try {
    const chatRef = database.ref('chats');
    let chatId = null;

    await chatRef.once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const chat = childSnapshot.val();
        const participants = chat.participants;

        if (
          participants.includes(participant1) &&
          participants.includes(participant2)
        ) {
          chatId = childSnapshot.key;
        }
      });
    });

    if (chatId) {
      const messageRef = database.ref(`chats/${chatId}/messages`).push();
      await messageRef.set({
        message: message,
        status: participant1, // Assuming participant1 is the sender
        time: formattedTime,
      });
    } else {
      const newChatRef = chatRef.push();
      chatId = newChatRef.key;

      await newChatRef.set({
        participants: [participant1, participant2],
        messages: null, // Create an empty messages node
      });

      // Define messageRef for the newly created chat
      const messageRef = database.ref(`chats/${chatId}/messages`).push();

      
      // Set the message with the formatted time
      await messageRef.set({
        message: message,
        status: participant1, // Assuming participant1 is the sender
        time: formattedTime,
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

async function getAdminWithLeastWork() {
  try {
    const adminSnapshot = await database.ref('admin').once('value');
    let admins = [];

    adminSnapshot.forEach((childSnapshot) => {
      const adminData = childSnapshot.val();
      admins.push({
        id: childSnapshot.key,
        ...adminData
      });
    });

    // Sort the admins based on workload (sum of noofcomplaints and noofqueries)
    admins.sort((a, b) => (a.noofcomplaints + a.noofqueries) - (b.noofcomplaints + b.noofqueries));

    // Retrieve the admin with the least workload
    const adminWithLeastWork = admins[0];

    console.log('Admin with least workload:', adminWithLeastWork.adminaccount);
    return adminWithLeastWork.adminaccount;
  } catch (error) {
    console.error('Error retrieving admin data:', error);
    throw error;
  }
}

async function IncrementAdminComplaint(adminaccount) {
  try {
    // Get a reference to the admin collection
    const adminRef = database.ref('admin');

    // Query for the admin with the specified adminaccount
    const adminSnapshot = await adminRef.orderByChild('adminaccount').equalTo(adminaccount).once('value');
    
    // Check if admin exists
    if (adminSnapshot.exists()) {
      // Get the key of the admin document
      const adminKey = Object.keys(adminSnapshot.val())[0];
      
      // Increment the noofcomplaints field
      await adminRef.child(adminKey).update({
        noofcomplaints: (adminSnapshot.val()[adminKey].noofcomplaints || 0) + 1
      });

      console.log('Admin complaint count incremented successfully!');
    } else {
      console.log('Admin not found.');
    }
  } catch (error) {
    console.error('Error incrementing admin complaint count:', error);
    throw error;
  }
}
async function getConversation(username1, username2) {
  try {
    // Reference to the chats node
    const chatsRef = database.ref('chats');

    // Retrieve all chats where the provided usernames are participants
    const chatsSnapshot = await chatsRef.once('value');
    
    // Log the snapshot to see its structure

    const messages = [];

    // Iterate over each chat
    chatsSnapshot.forEach((chatSnapshot) => {
      const chatData = chatSnapshot.val();
      const participants = chatData.participants;

      // Check if the chat has both participants
      if (participants.includes(username1) && participants.includes(username2)) {
        const chatMessages = chatData.messages || [];

        // Iterate over each message in the chat
        Object.values(chatMessages).forEach((message) => {
          // Determine sender based on message status
          const sender = message.status === username1 ? 'sent' : 'recieve';
          
          // Use time object from the message
          const time = message.time;

          messages.push({
            message: message.message,
            status: sender,
            time: time
          });
        });
      }
    });

    console.log('Messages retrieved successfully:', messages);
    return messages;
  } catch (error) {
    console.error('Error retrieving conversation:', error);
    throw error;
  }
}


async function getAllChats(username) {
  try {
    // Reference to the chats node
    const chatsRef = database.ref('chats');

    // Retrieve all chats where the user is a participant
    const userChatsSnapshot = await chatsRef.once('value');

    const participantsList = [];
    
    userChatsSnapshot.forEach((childSnapshot) => {
      const chatData = childSnapshot.val();
      const participants = chatData.participants;

      // Get the name of the participant that is not the current user
      const otherParticipant = participants.find(participant => participant !== username);
      
      // Check if the user is a participant in this chat
      if (participants.includes(username)) {
        participantsList.push(otherParticipant);
      }
    });

    console.log('All chats retrieved successfully:', participantsList);
    return participantsList;
  } catch (error) {
    console.error('Error retrieving all chats:', error);
    throw error;
  }
}






export {auth,addUserInitialData,getName,retrieveChatData,sendMessage,getAdminWithLeastWork,IncrementAdminComplaint,getAllChats,getConversation};
