import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';



const firebaseConfig = {
  apiKey: "AIzaSyB9oB6MIKOf2FbxTonAIXOPkFHg7oCE6nY",
  authDomain: "cypher-3e60c.firebaseapp.com",
  projectId: "cypher-3e60c",
  storageBucket: "cypher-3e60c.appspot.com",
  messagingSenderId: "426037548548",
  appId: "1:426037548548:web:7cfa80648f8d1cc6fd4751",
  measurementId: "G-ST1M0XGYC7"
};
let app;
if (firebase.apps.length===0){
    app=firebase.initializeApp(firebaseConfig);
}else{
    app=firebase.app();
}
const auth = firebase.auth();

const db = firebase.firestore();

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


export {auth,addUserInitialData,getName};
