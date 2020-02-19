import React from 'react';
import { View, Image } from 'react-native';

const OverlayChooserItem = ({ imagePath }) => {
  const { overlayItemStyle, imageStyle } = styles;
  return(
    <View style={overlayItemStyle}>
      <Image
        source={imagePath}
        style={imageStyle} />
    </View>
  );
};

const styles = {
  overlayItemStyle: {
    position: 'absolute',
    zIndex: 5
  },
  imageStyle: {
    height: 110,
    width: 110
  }
};

export default OverlayChooserItem;
