import React from "react";
import { TouchableOpacity, Image, Linking, StyleSheet } from "react-native";
import {
  HYPERETHER_URL
  // ABSOLUTE_PATH
} from "../StringConstants";

import Images from '../../../src/assets/images/images';

// const ABSOLUTE_PATH: string =
//   "c:/Users/pc/ReactNativeWorkspace/hyperether/CityCameraExpo/src";

const Footer = () => {
  const { logoContainterStyle, imageStyle } = styles;
  return (
    <TouchableOpacity
      style={logoContainterStyle}
      onPress={() =>
        Linking.canOpenURL(HYPERETHER_URL)
          .then(supported => {
            if (!supported) {
              // console.log(NO_BROWSER_ERROR_MESSAGE);
              throw Error("An error occurred");
            } else {
              return Linking.openURL(HYPERETHER_URL);
            }
          })
          .catch(err => console.error("An error occurred", err))
      }
    >
      <Image
        style={imageStyle}
        source={Images.logo_hyperether}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  logoContainterStyle: {
    marginVertical: 5,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderColor: "black"
  },
  imageStyle: {
    alignSelf: "center",
    height: 30,
    width: 100
  }
});

export { Footer };
