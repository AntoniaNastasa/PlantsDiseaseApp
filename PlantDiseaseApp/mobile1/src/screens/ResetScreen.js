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
import {useForm, Controller} from 'react-hook-form';
import {confirmResetPassword} from 'aws-amplify/auth';
//console.log(forgotPasswordSubmit);

const ResetScreen = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm();
  const navigation = useNavigation();

  const onSubmitPressed = async data => {
    try {
      console.log(data); // Verifică datele primite
      console.log('Username:', username); // Verifică valoarea lui `username`
      console.log('Code:', code); // Verifică valoarea lui `code`

      const response = await confirmResetPassword({
        code: data.code,
        newPassword: data.newPassword,
        username: data.username,
      });

      console.log(response);
      navigation.navigate('SignIn');
    } catch (error) {
      console.error('Eroare la autentificare:', error.message);
    }
    navigation.navigate('SignIn');
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };

  return (
    //<ScrollView showsVerticalScrollIndicator={false}>

    <View style={styles.root}>
      <Text style={styles.title}>Reset your password</Text>

      <CustomInput
        placeholder="Username"
        name="username"
        control={control}
        rules={{required: 'Username is required'}}
      />

      <CustomInput
        name="code"
        placeholder="Enter your code"
        control={control}
        rules={{required: 'Code is required'}}
      />

      <CustomInput
        name="newPassword"
        placeholder="Enter new password"
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

      <CustomButton
        text="Submit"
        onPress={handleSubmit(onSubmitPressed)}
        type="PRIMARY"
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

export default ResetScreen;
