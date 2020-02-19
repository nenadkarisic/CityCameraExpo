import React from 'react';
import { TouchableOpacity, Image, Linking } from 'react-native';
import { NO_BROWSER_ERROR_MESSAGE, HYPERETHER_URL } from '../StringConstants';

const Footer = () => {
  const { logoContainterStyle, imageStyle } = styles;
  return (
    <TouchableOpacity
      style={logoContainterStyle}
      onPress={
        () => Linking.canOpenURL(HYPERETHER_URL).then(supported => {
          if (!supported) {
            console.log(NO_BROWSER_ERROR_MESSAGE);
          } else {
            return Linking.openURL(HYPERETHER_URL);
          }
        }).catch(err => console.error('An error occurred', err))}
    >
      <Image 
        style={imageStyle}
        source={require('../../assets/images/logo_hyperether.png')}
      />
    </TouchableOpacity>
  );
};

const styles = {
  logoContainterStyle: {
    marginVertical: 5,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderColor: 'black',

  },
  imageStyle: {
    alignSelf: 'center',
    height: 30,
    width: 100
  }
};

export { Footer };
