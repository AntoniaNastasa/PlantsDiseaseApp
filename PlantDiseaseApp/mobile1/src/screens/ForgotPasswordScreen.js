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
import {resetPassword, signOut} from 'aws-amplify/auth';
import {Auth, ResetPasswordInput, ConfirmResetPasswordInput} from 'aws-amplify';
import {forgotPassword} from 'aws-amplify/auth';
//console.log(forgotPassword);

const ForgotPasswordScreen = () => {
  const {control, handleSubmit} = useForm();

  const navigation = useNavigation();

  const onSendPressed = async data => {
    try {
      console.log(data);
      const response = await resetPassword({username: data.username});
      console.log(response);
      navigation.navigate('ResetScreen');
    } catch (e) {
      console.error(e);
    }
  };

  const onSignInPress = async () => {
    try {
      await signOut(); // Acest apel deloghează utilizatorul
      navigation.navigate('SignIn'); // Navighează înapoi la ecranul de SignIn după delogare
    } catch (error) {
      console.error('Eroare la delogare:', error);
    }
  };

  return (
    //<ScrollView showsVerticalScrollIndicator={false}>

    <View style={styles.root}>
      <Text style={styles.title}>Reset your password</Text>

      <CustomInput
        name="username"
        control={control}
        placeholder="Username"
        rules={{
          required: 'Username is required',
        }}
      />

      <CustomButton
        text="Send"
        onPress={handleSubmit(onSendPressed)}
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

export default ForgotPasswordScreen;
