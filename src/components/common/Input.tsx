import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

const Input = ( { value, onChangeText, placeholder, secureTextEntry } ) =>{
    const { inputStyle, containerStyle} = styles;

    return(
        <View style={containerStyle}>
            {/* <Text style={labelStyle}> {label} </Text> */}
            <TextInput
                secureTextEntry = {secureTextEntry || false}
                placeholder = {placeholder} 
                autoCorrect = {false}
                value = {value}
                onChangeText = {onChangeText}
                style = {inputStyle}
            />

        </View>    
    )
};

const styles = StyleSheet.create({
    inputStyle:{
        color: '#000',
        paddingLeft:5,
        paddingRight: 5,
        fontSize: 18,
        lineHeight: 23,
        flex:2
    },
    labelStyle:{
        paddingLeft:5,
        paddingRight: 5,
        fontSize: 18,
        flex:1
    },
    containerStyle:{
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export { Input }