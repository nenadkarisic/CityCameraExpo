import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

const TouchableMenuItem = ({ imagePath, onPress }) => {
  const { menuItemStyle, imageStyle } = styles;
  return(
    <TouchableOpacity
      style={menuItemStyle}
      onPress={onPress}
    >
      <Image source={imagePath}
        style={imageStyle}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

const styles = {
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
};

export default TouchableMenuItem;
