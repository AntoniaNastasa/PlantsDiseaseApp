import React, {useState} from 'react';
import {
  Button,
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {uploadImage} from '../services/api';
import CustomButton from '../components/CustomButton/CustomButton.js';
import {useNavigation} from '@react-navigation/native';
import Logo from '../../assets/images/plant_emoji.png';
import {Auth} from 'aws-amplify';
import {signOut} from 'aws-amplify/auth';

const HomeScreen = () => {
  const [imageUri, setImageUri] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);

  const navigation = useNavigation();

  const onSignInPress = async () => {
    try {
      await signOut(); // Acest apel deloghează utilizatorul
      navigation.navigate('SignIn'); // Navighează înapoi la ecranul de SignIn după delogare
    } catch (error) {
      console.error('Eroare la delogare:', error);
    }
  };

  const onHistoryPressed = () => {
    navigation.navigate('HistoryScreen');
  };

  const handleSelectImage = () => {
    setPredictionResult(null);
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        const newImageUri = response.assets[0].uri;
        console.log('Imagine selectată:', newImageUri);
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const handleTakePhoto = () => {
    setPredictionResult(null);
    launchCamera({mediaType: 'photo', saveToPhotos: true}, response => {
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const handlePredict = async () => {
    if (imageUri) {
      try {
        const prediction = await uploadImage(imageUri);
        setPredictionResult(
          `Prediction: ${prediction.class} with confidence ${prediction.confidence}`,
        );
      } catch (error) {
        console.error(error);
        setPredictionResult('Failed to predict image.');
      }
    } else {
      alert('Please select or capture an image first.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuButton} onPress={onHistoryPressed}>
        <View style={styles.line} />
        <View style={styles.line} />
        <View style={styles.line} />
      </TouchableOpacity>
      <CustomButton text="Select Image" onPress={handleSelectImage} />
      <CustomButton text="Take Photo" onPress={handleTakePhoto} />
      <CustomButton text="Predict" onPress={handlePredict} />
      <CustomButton
        text="Back to Sign In"
        onPress={onSignInPress}
        type="TERTIARY"
      />
      {!imageUri && (
        <Image source={Logo} style={styles.logo} resizeMode="contain" />
      )}
      {imageUri && (
        <View style={styles.previewContainer}>
          <Image source={{uri: imageUri}} style={styles.image} />
          {predictionResult && (
            <View style={styles.predictionContainer}>
              <Text style={styles.predictionText}>{predictionResult}</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    marginTop: 20,
    width: 300,
    height: 300,
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
  menuButton: {
    width: 35,
    height: 35,
    position: 'absolute',
    top: 10,
    left: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  line: {
    width: 25,
    height: 3,
    backgroundColor: 'black',
    marginVertical: 3,
  },
});

export default HomeScreen;
