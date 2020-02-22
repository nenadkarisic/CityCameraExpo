import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

const Button = ({onPress, children}) =>{
    const {buttonStyle, textStyle} = styles;
    
    return (
        <TouchableOpacity onPress={onPress} style={buttonStyle}>
            <Text style={textStyle}>
                {children}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    textStyle: {

        alignSelf: 'center',
        color: '#ff6600',
        fontSize: 20,
        fontWeight: '600',
        paddingTop: 1,
        paddingBottom: 5
    },

    buttonStyle: {
        width: "30%",
        height: 30,
        backgroundColor: '#cdf6f7',
        borderRadius: 5,
        margin: 10,
    }
});

// export { Button: Button};
export  { Button };