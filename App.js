import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SignUpForm from './screens/SignUpForm.jsx';
import LoginForm from './screens/LoginForm.jsx';
import WelcomeScreen from './screens/WelcomeScreen.jsx';
import ComplainScreen from './screens/ComplaintScreen.jsx';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="SignUp"
          component={SignUpForm}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Login"
          component={LoginForm}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Complaint"
          component={ComplainScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};