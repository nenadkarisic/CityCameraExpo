import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import {
  View,
  Image,
  TouchableOpacity,
  AsyncStorage,
  StyleSheet,
} from "react-native";
import ImagePicker from "react-native-image-picker";
import Toast from 'react-native-simple-toast';
import { imageAdded } from "../actions";

class AddPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageExtension: ""
    };
  }
  getImageExtension(imagePath) {
    let position = imagePath.indexOf(".") + 1;
    let extension = imagePath.substring(position);
    if (position > -1) {
      this.setState({ imageExtension: extension });
    }
  }

  launchImagePicker() {
    var options = {
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };

    ImagePicker.launchImageLibrary(options, response => {
      try {
        AsyncStorage.getItem("user").then((err, user) => {
          // Toast.show('Loaded User !' + user, Toast.LONG);

          if (response.didCancel) {
            console.log("User cancelled image picker");
          } else if (response.error) {
            console.log("ImagePicker Error: ", response.error);
          } else if (response.customButton) {
            console.log("User tapped custom button: ", response.customButton);
          } else {
            Toast.show('Image selected', Toast.SHORT);
            this.getImageExtension(response.path)
            let source = {
              path: response.path,
              name: response.fileName,
              extension: this.state.imageExtension
            };
            // console.log("Android path ",response.path);
            // console.log("IOS path ",response.origURL); <-- see documentacion.
            this.props.imageAdded(source);

            Actions.pop();
          }
        });
      } catch (error) {
        console.log(error);
      }
    });
  }

  launchCamera() {
    var options = {
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };

    ImagePicker.launchCamera(options, response => {
      try {
        AsyncStorage.getItem("user").then((err, user)=>{
          if (response.didCancel) {
            console.log("User cancelled image picker");
          } else if (response.error) {
            console.log("ImagePicker Error: ", response.error);
          } else if (response.customButton) {
            console.log("User tapped custom button: ", response.customButton);
          } else {
            Toast.show('Image added', Toast.SHORT);
            this.getImageExtension(response.path);
            let source = {
              path: response.path,
              name: response.fileName,
              extension: this.state.imageExtension
            };
            this.props.imageAdded(source); //-sending image to action imageAdded

            Actions.pop();
          }
        });
      } catch (error){
        console.log('Error with uploading image: ', error)
        }
    });
  }

  render() {
    const {
      mainContainerStyle,
      imageContainerStyle,
      largeImageStyle,
      buttonsContainer,
      smallImageStyle,
      touchableStyle
    } = styles;
    return (
      <View style={mainContainerStyle}>
        <View style={imageContainerStyle}>
          <Image
            source={require("../assets/images/photo.png")}
            style={largeImageStyle}
            resizeMode="contain"
          />
        </View>
        <View style={buttonsContainer}>
          <TouchableOpacity
            style={touchableStyle}
            onPress={this.launchCamera.bind(this)}
          >
            <Image
              source={require("../assets/images/camera.png")}
              style={smallImageStyle}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={touchableStyle}
            onPress={this.launchImagePicker.bind(this)}
          >
            <Image
              source={require("../assets/images/loading.png")}
              style={smallImageStyle}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainerStyle: {
    backgroundColor: "#cdf6f7",
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 50
  },
  imageContainerStyle: {
    flex: 4,
    justifyContent: "center",
    alignItems: "flex-end",
    alignContent: "center",
    paddingVertical: 20
  },
  largeImageStyle: {
    height: 200,
    width: 230,
    alignSelf: "center"
  },
  buttonsContainer: {
    flex: 1,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "flex-start"
  },
  touchableStyle: {
    paddingHorizontal: 20
  },
  smallImageStyle: {
    height: 50,
    width: 100,
    alignSelf: "center"
  }
});

const mapStateToProps = state => {
  return {
    image: state.post.image
  };
};

export default connect(mapStateToProps, { imageAdded })(AddPhoto);
