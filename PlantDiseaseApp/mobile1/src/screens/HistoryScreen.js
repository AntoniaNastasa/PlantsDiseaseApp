import React, {useState} from 'react';
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {uploadImage} from '../services/api';
import CustomButton from '../components/CustomButton/CustomButton.js';
import {useNavigation} from '@react-navigation/native';
import Logo from '../../assets/images/plant_emoji.png';

const HistoryScreen = () => {
  const navigation = useNavigation();
  const onHomeScreenPress = () => {
    navigation.navigate('HomeScreen');
  };
  const renderItem = ({item}) => (
    <View style={styles.imageContainer}>
      <Image source={{uri: item.imageUri}} style={styles.image} />
      {/* Adaugă aici și alte informații despre predicție dacă este necesar */}
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.icon}>Back</Text>
      </TouchableOpacity>
      <FlatList
        //data={predictionsData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2} // aranjare elemente în 2 coloane
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontWeight: 'bold',
    color: '#AFA88C',
  },
});
export default HistoryScreen;
