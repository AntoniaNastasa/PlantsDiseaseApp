import React, {useState} from 'react';
import {
  Button,
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import CustomInput from '../components/CustomInput/CustomInput.js';
import CustomButton from '../components/CustomButton/CustomButton.js';
import {useNavigation} from '@react-navigation/native';
import Logo from '../../assets/images/plant_emoji.png';
import {useForm} from 'react-hook-form';
import {confirmSignUp} from 'aws-amplify/auth';
import {Auth} from 'aws-amplify';
import {useRoute} from '@react-navigation/native';
console.log(confirmSignUp);
//console.log(Auth.confirmSignUp);

const ConfirmSignUpScreen = () => {
  //const route = useRoute();
  const {control, handleSubmit, watch} = useForm();
  const navigation = useNavigation();

  const onConfirmPressed = async data => {
    try {
      console.log(data); // Verifică datele primite
      const {username, code} = data;
      console.log('Username:', username); // Verifică valoarea lui `username`
      console.log('Code:', code); // Verifică valoarea lui `code`

      if (!username || !code) {
        throw new Error('Username and code are required');
      }

      const response = await confirmSignUp({
        username: data.username,
        confirmationCode: code,
      });

      //console.log(response);
      navigation.navigate('SignIn');
    } catch (error) {
      console.error('Eroare la autentificare:', error.message);
    }
  };

  const onResendPress = async () => {
    try {
      const username = watch('username');
      await resendSignUp(username);
      console.log('Codul de confirmare a fost retrimis');
    } catch (error) {
      console.error('Eroare la retrimiterea codului:', error);
    }
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };

  return (
    //<ScrollView showsVerticalScrollIndicator={false}>

    <View style={styles.root}>
      <Text style={styles.title}>Confirm your email</Text>

      <CustomInput
        name="username"
        control={control}
        placeholder="Username"
        rules={{
          required: 'Username code is required',
        }}
      />

      <CustomInput
        name="code"
        control={control}
        placeholder="Enter your confirmation code"
        rules={{
          required: 'Confirmation code is required',
        }}
      />

      <CustomButton
        text="Confirm"
        onPress={handleSubmit(onConfirmPressed)}
        type="PRIMARY"
      />

      <CustomButton
        text="Resend code"
        onPress={onResendPress}
        type="SECONDARY"
      />

      <CustomButton
        text="Back to Sign In"
        onPress={onSignInPress}
        type="TERTIARY"
      />

      <Image source={Logo} style={styles.logo} resizeMode="contain" />
    </View>
    //</ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },

  logo: {
    width: '25%',
    maxWidth: 300,
    height: '25%',
    maxHeight: 300,
    flex: 1,
    position: 'absolute',
    bottom: 10,
    right: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D260A',
    margin: 10,
  },
});

export default ConfirmSignUpScreen;
