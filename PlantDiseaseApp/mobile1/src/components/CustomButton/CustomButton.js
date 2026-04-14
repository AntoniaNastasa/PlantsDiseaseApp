import React from 'react';
import {Button, View, Text, Image, Pressable, StyleSheet,useWindowDimensions,ScrollView} from 'react-native';

const CustomButton = ({onPress, text, type ="PRIMARY"}) =>{
    return(
        <Pressable
        onPress={onPress}
        style={[styles.container,
        styles[`container_${type}`]]}>

        <Text style={[styles.text,
        styles[`text_${type}`]]}>{text}</Text>
        </Pressable>

    );
};

const styles=StyleSheet.create({
    container:{
        width:'100%',
        padding:15,
        marginVertical:10,
        alignItems:'center',
        borderRadius:10,
    },

    container_PRIMARY:{
        backgroundColor:'#85BB65',
    },

    container_SECONDARY:{
        borderColor:'#85BB65',
        borderWidth:2,
    },

    container_TERTIARY:{
    },

    text:{
        fontWeight:'bold',
        color:'#FFFFF0',
    },

    text_SECONDARY:{
        color:'#85BB65',
    },

    text_TERTIARY:{
        color:'#AFA88C'
    },
})
export default CustomButton;