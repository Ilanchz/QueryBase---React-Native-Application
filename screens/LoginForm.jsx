import React, {useState} from 'react';
import { TouchableOpacity, StyleSheet, Text, TextInput, View,Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {auth} from "../firebaseConnect";


function LoginForm(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();
    const [hoverState,setHoverState]=useState(false);

    function handleLogin() {
      auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log('User Logged In:', user.email);
          console.log(user.uid);
          navigation.navigate('Welcome', { userId: user.uid });
        })
        .catch((error) => {
          // Handle signup error
          Alert.alert('Error', error.message);
        });
    }
    


    function SwitchToSign(){
        navigation.navigate('SignUp');
    }

    function ButtonIn(){
        setHoverState(true);
    }

    function ButtonOut(){
        setHoverState(false);
    }


    return (
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.LoginInWrapper}>
            <Text style={styles.TitleText}>Sign In</Text>
            <Text style={[styles.LoginPrompt, hoverState ? styles.hovered : null]} onPress={SwitchToSign} onPressIn={ButtonIn} onPressOut={ButtonOut}>Dont Have an Account? Sign up here</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.TextTitle} >EMAIL</Text>
              <TextInput placeholder='Email' style={styles.TextBox} onChangeText={(emailText)=>{
                setEmail(emailText)
              }}></TextInput>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.TextTitle}>PASSWORD</Text>
              <TextInput placeholder='Password' style={styles.TextBox} secureTextEntry={true} onChangeText={(passwordText)=>{
                setPassword(passwordText)
              }}></TextInput>
            </View>
            <TouchableOpacity style={styles.ButtonWrapper} onPress={handleLogin}><Text style={styles.LoginInButtonText }>Login</Text></TouchableOpacity>
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
    LoginInWrapper : {
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
      color: "red",
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
    LoginInButtonText: {
      fontSize: 20,
      backgroundColor: "#ff9999",
      padding: 5,
      marginTop: 30,
      width: "50%", 
      borderRadius: 5,
      textAlign: "center",
      borderWidth: 1,
      shadowColor: "black",
    },
    hovered:{
        color: "#ff9900",
    }
    
    
  });
  
export default LoginForm;