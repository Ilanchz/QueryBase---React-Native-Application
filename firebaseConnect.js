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

export {auth};
