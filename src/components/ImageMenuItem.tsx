import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const ImageMenuItem = ({ imagePath }) => {
  const { menuItemStyle, imageStyle } = styles;
  return(
    <View style={menuItemStyle}>
      <Image source={imagePath}
        style={imageStyle}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  menuItemStyle: {
    flex: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderStartWidth: 1,
    borderEndWidth: 1,
    borderColor: '#66f6f9',
    backgroundColor: '#cdf6f7',
    marginHorizontal: 3,
    marginVertical: 3,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3
  },
  imageStyle: {
    height: 150,
    width: 150,
    zIndex: 4
  }
});

export default ImageMenuItem;
