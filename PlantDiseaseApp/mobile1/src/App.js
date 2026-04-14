// App.js
import React from 'react';
import HomeScreen from './screens/HomeScreen';
import SignIn from './screens/SignIn';
import {
  SafeAreaView,
  Button,
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import SignUpScreen from './screens/SignUpScreen';
import ConfirmSignUpScreen from './screens/ConfirmSignUpScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import ResetScreen from './screens/ResetScreen';
import Navigation from './navigation';
import {Amplify, Auth} from 'aws-amplify';
import config from './aws-exports.js';
import axios from 'axios';

//import 'aws-amplify-react-native';
//import { SafeAreaView } from 'react-native-safe-area-context';

Amplify.configure(config);
/**console.log('AWS Amplify configured:', Amplify);
console.log(Auth);

const functionsToCheck = [
  'signIn',
  'signUp',
  'signOut',
  'confirmSignUp',
  'forgotPassword',
  'forgotPasswordSubmit',
];

functionsToCheck.forEach(func => {
  console.log(`${func} available:`, typeof Auth[func] === 'function');
});*/

const App = () => {
  return (
    //<SafeAreaView style={styles.root}>
    <Navigation />
    //</SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '##FFFFF0',
  },
});

export default App;
