import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SignIn from '../screens/SignIn';
import {
  Button,
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import SignUpScreen from '../screens/SignUpScreen';
import ConfirmSignUpScreen from '../screens/ConfirmSignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ResetScreen from '../screens/ResetScreen';
import HistoryScreen from '../screens/HistoryScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ConfirmSignUp" component={ConfirmSignUpScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="ResetScreen" component={ResetScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
