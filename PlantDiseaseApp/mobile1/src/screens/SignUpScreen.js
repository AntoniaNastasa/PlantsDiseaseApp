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
import CustomInput from '../components/CustomInput/CustomInput';
import CustomButton from '../components/CustomButton/CustomButton.js';
import {useNavigation} from '@react-navigation/native';
import Logo from '../../assets/images/plant_emoji.png';
import {useForm, Controller} from 'react-hook-form';

import {signUp} from 'aws-amplify/auth';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignUpScreen = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm();
  const pass = watch('password');

  const navigation = useNavigation();

  const onRegisterPressed = async data => {
    try {
      console.log(data);
      const {username, email, password} = data;
      console.log(username, password, email);

      const response = await signUp({
        username: username,
        password: password,
        options: {
          userAttributes: {
            email,
          },
        },
      });

      console.log(response);

      navigation.navigate('ConfirmSignUp');
    } catch (error) {
      console.error('Eroare la autentificare:', error);
    }
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };

  return (
    //<ScrollView showsVerticalScrollIndicator={false}>

    <View style={styles.root}>
      <Text style={styles.title}>Create an account</Text>

      <CustomInput
        name="username"
        placeholder="Username"
        control={control}
        rules={{required: 'Username is required'}}
      />

      <CustomInput
        name="email"
        placeholder="Email"
        control={control}
        rules={{
          required: 'Email is required',
          pattern: {
            value: EMAIL_REGEX,
            message: 'Please provide a correct address',
          },
        }}
      />

      <CustomInput
        name="password"
        placeholder="Password"
        control={control}
        rules={{
          required: 'Password is required',
          minLength: {
            value: 3,
            message: 'Password must be minimum 3 characters long',
          },
        }}
        secureTextEntry={true}
      />

      <CustomInput
        name="repeatPassword"
        placeholder="Repeat Password"
        control={control}
        rules={{
          validate: value => value == pass || 'Passwords don`t match',
          required: 'Password is required again',
        }}
        secureTextEntry={true}
      />

      <CustomButton
        text="Register"
        onPress={handleSubmit(onRegisterPressed)}
        type="PRIMARY"
      />

      <CustomButton
        text="Already have an account? Sign In"
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

export default SignUpScreen;
