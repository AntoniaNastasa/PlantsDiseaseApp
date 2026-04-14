import React from 'react';
import {Button, View, Text,TextInput, Image, StyleSheet,useWindowDimensions} from 'react-native';
import{useForm,Controller} from 'react-hook-form';

const CustomInput = ({control, name, rules={},placeholder, secureTextEntry}) =>{
    return(

        

        <Controller 
        control={control}
        name={name}
        rules={rules}
        render={({field:{value, onChange, onBlur}, fieldState:{error}})=> (
        <>
        <View 
        style={[styles.container, {borderColor: error ? 'red' : '#F5EED2'}]}>
            <TextInput 
            value={value} 
            onChangeText={onChange}  
            on Blur={onBlur} 
            placeholder={placeholder}
            style={styles.input}
            secureTextEntry={secureTextEntry}
            />
            </View>
            {error && (<Text style={{color:'red', alignSelf:'stretch'}}>{error.message || 'Error'}</Text>
            )}
           </>
        )}
        />
        
    );
};
const styles= StyleSheet.create({
    container: {
        backgroundColor:'white',
        width:'100%',
        borderColor:'#F5EED2',
        borderWidth:1,
        borderRadius:5,

        paddingHorizontal: 10,
        marginVertical: 10,
    },

    input: {},
});

export default CustomInput