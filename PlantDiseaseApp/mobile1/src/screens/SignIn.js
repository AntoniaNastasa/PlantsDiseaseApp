import React, {useState} from 'react';
import {
  Button,
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  TextInput,
} from 'react-native';
import Logo from '../../assets/images/plant_emoji.png';
import CustomInput from '../components/CustomInput/CustomInput';
import CustomButton from '../components/CustomButton/CustomButton.js';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {Auth} from 'aws-amplify';
import {signIn} from 'aws-amplify/auth';
import {currentAuthenticatedUser} from 'aws-amplify/auth';
console.log(signIn);

const SignIn = () => {
  const {height} = useWindowDimensions();

  const navigation = useNavigation();

  const {
    control,
    handleSubmit,

    formState: {errors},
  } = useForm();

  const onSignInPressed = async data => {
    try {
      console.log(data);
      // const response = await Auth.signIn(data.username, data.password);

      const response = await signIn({
        username: data.username,
        password: data.password,
      });
      console.log(response);
      // const userDetails = await currentAuthenticatedUser();
      //console.log('Detalii utilizator:', userDetails);

      navigation.navigate('HomeScreen');
    } catch (error) {
      console.error('Eroare la autentificare:', error);
    }
    navigation.navigate('HomeScreen');
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword');
  };

  const onSignUpPressed = () => {
    navigation.navigate('SignUp');
  };

  return (
    //<ScrollView showsVerticalScrollIndicator={false}>

    <View style={styles.root}>
      <Image source={Logo} style={styles.logo} resizeMode="contain" />

      <CustomInput
        name="username"
        placeholder="Username"
        control={control}
        rules={{required: 'Username is required'}}
      />

      <CustomInput
        name="password"
        placeholder="Password"
        control={control}
        secureTextEntry={true}
        rules={{
          required: 'Password is required',
          minLength: {
            value: 3,
            message: 'Password must be minimum 3 characters long',
          },
        }}
      />

      <CustomButton
        text="Sign In"
        onPress={handleSubmit(onSignInPressed)}
        type="PRIMARY"
      />

      <CustomButton
        text="Forgot password?"
        onPress={onForgotPasswordPressed}
        type="TERTIARY"
      />

      <CustomButton
        text="Don`t have an account? Create one"
        onPress={onSignUpPressed}
        type="TERTIARY"
      />
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
    width: '60%',
    maxWidth: 300,
    height: '60%',
    maxHeight: 300,
  },
});

export default SignIn;
