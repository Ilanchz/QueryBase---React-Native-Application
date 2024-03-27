import React,{useState} from 'react';
import { TouchableOpacity, StyleSheet, Text, TextInput, View,Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {auth,addUserInitialData} from "../firebaseConnect";

function SignUpForm(){

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName]=useState('');
  const [dob, setDob]=useState('');

  const navigation = useNavigation();
  const [hoverState,setHoverState]=useState(false);

  async function handleSignUp() {
    try {
      // After creating the user, add the Name and DateOfBirth details to Firestore
      await addUserInitialData(password,email, name, dob);
      // Navigate to the login screen or perform any other action upon successful sign-up
      navigation.navigate('Login');
    } catch (error) {
      // Handle signup error
      // User Already exists error
      Alert.alert('Error', error.message);
    }
  }
  

  function SwitchToLogin(){
      navigation.navigate('Login');
  }

  function ButtonIn(){
      setHoverState(true);
  }

  function ButtonOut(){
      setHoverState(false);
  }


    return (
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.SignUpWrapper}>
            <Text style={styles.TitleText}>Create New Account</Text>
            <Text style={[styles.LoginPrompt, hoverState ? styles.hovered : null]} onPress={SwitchToLogin} onPressIn={ButtonIn} onPressOut={ButtonOut}>Already Registered? Log in Here</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.TextTitle}>NAME</Text>
              <TextInput placeholder='Name' style={styles.TextBox} onChangeText={(Name)=>{
                setName(Name)
              }}></TextInput>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.TextTitle} >EMAIL</Text>
              <TextInput placeholder='Email' style={styles.TextBox} onChangeText={(Email)=>{
                setEmail(Email)
              }}></TextInput>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.TextTitle}>PASSWORD</Text>
              <TextInput placeholder='Password' style={styles.TextBox} secureTextEntry={true} onChangeText={(Password)=>{
                setPassword(Password)
              }}></TextInput>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.TextTitle}>DATE OF BIRTH</Text>
              <TextInput placeholder='DD/MM/YYYY' style={styles.TextBox} onChangeText={(dob)=>{
                setDob(dob)
              }}></TextInput>
            </View>
            <TouchableOpacity style={styles.ButtonWrapper} onPress={handleSignUp}><Text style={styles.SignUpButtonText}>Sign-Up</Text></TouchableOpacity>
          </View>
        </ScrollView>
      );
      
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: "column",
    },
    SignUpWrapper : {
      alignItems: "center",
      justifyContent: "center",
      width: "80%",
    },
    TitleText :{
      fontSize: 30,
      textAlign: "center",
      color: "grey",
      marginBottom: 20,
    },
    LoginPrompt: {
      fontSize: 15,
      textAlign: "center",
      color: "green",
      marginBottom: 20,
      textDecorationLine: 'underline',
    },
    TextTitle:{
      fontSize: 20,
      letterSpacing: 3,
      textAlign: "center",
      padding: 5,
      margin: 5,
      color: "grey",
    },
    TextBox:{
      backgroundColor: "white",
      width: "100%",
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 10,
      borderWidth: 1,
      fontSize: 20,
    },
    inputContainer: {
      marginBottom: 20,
      width: "100%",
    },
    ButtonWrapper: {
      width: "100%", 
      alignItems: "center", 
    },
    SignUpButtonText: {
      fontSize: 20,
      backgroundColor: "lightgreen",
      padding: 5,
      marginTop: 30,
      width: "50%", 
      borderRadius: 5,
      textAlign: "center",
      borderWidth: 1,
      shadowColor: "black",
    },
    hovered:{
      color: "#00ff00",
    }
    
    
  });
  
export default SignUpForm;