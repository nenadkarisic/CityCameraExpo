import React, { Component } from "react";
import {
  View,
  StyleSheet,
  // Text, BackHandler, AsyncStorage,
  Alert
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Actions } from "react-native-router-flux";
import Toast from "react-native-simple-toast";
import ImageMenuItem from "./ImageMenuItem";
import { Footer } from "./common";
import TouchableMenuItem from "./TouchableMenuItem";
import OverlayChooserItem from "./OverlayChooserItem";
import API from "../services/API";
import Session from "../services/Session";
import {
  // loginUser,
  imageAdded,
  descriptionAdded,
  addLocation,
  // postSent,
  logOut
} from "../actions";
// import {ABSOLUTE_PATH} from './StringConstants';
const ABSOLUTE_PATH: string =
  "c:/Users/pc/ReactNativeWorkspace/hyperether/CityCameraExpo/src";

interface Props {
  imageAdded: (
    image: object
  ) => {
    type: string;
    payload: object;
  };
  addLocation: (
    position: object
  ) => {
    type: string;
    payload: object;
  };
  descriptionAdded: (
    description: string
  ) => {
    type: string;
    payload: string;
  };
  logOut: () => (dispatch: any) => void;
  imagePath: string;
  imageName: string;
  imageExtension: string;
  description: string;
  longitude: number;
  latitude: number;
  logedIn: boolean;
}

interface State {
  sending: boolean;
  spinnerOn: boolean;
}

class PostCreator extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { sending: false, spinnerOn: false };
  }

  // componentDidMount(){
  //   BackHandler.addEventListener('hardwareBackPress', () => this.exitingApp())
  // }

  // exitingApp(){
  //   BackHandler.exitApp();
  //   return true
  // }

  logOutAlert() {
    Alert.alert(
      "Log Out",
      "Do you want to log out?",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => logOut() }
      ],
      { cancelable: false }
    );
  }

  resetAllStates() {
    this.props.imageAdded({});
    this.props.descriptionAdded("");
    this.props.addLocation({});
  }

  onSendPress() {
    //Data from redux
    console.log("Image name: ", this.props.imageName);
    console.log("Image path: ", this.props.imagePath);
    console.log("Image extension: ", this.props.imageExtension);
    console.log("Description: ", this.props.description);
    console.log("Longitude: ", this.props.longitude);
    console.log("Latitude: ", this.props.latitude);
    console.log("User je: ", Session.getUser());

    Toast.show("Sending...", Toast.LONG);

    this.setState({ sending: true });
    this.disableAllMenutItems();
    setInterval(() => {
      this.setState(previousState => {
        return {
          spinnerOn: !previousState.spinnerOn
        };
      });
    }, 200);

    var uploadURL, fileId;

    API.getUploadURL(
      this.props.imageName,
      this.props.imageExtension,
      this.props.description,
      { long: this.props.longitude, lat: this.props.latitude }
    )
      .then(response => {
        uploadURL = response.data.url;
        fileId = response.data.fileId;
        // console.log("Odgovor je ", uploadURL)
      })
      .then(() => {
        const xhr = new XMLHttpRequest();
        // xhr.onreadystatechange = err => {
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              this.setState({ sending: false });
              Toast.show("Successfully uploaded the file.", Toast.LONG);
              this.resetAllStates();
            } else {
              this.setState({ sending: false });
              Toast.show("The file could not be uploaded.", Toast.LONG);
            }
          }
        };
        xhr.open("PUT", uploadURL);
        // xhr.setRequestHeader('X-Amz-ACL', 'public-read')
        xhr.setRequestHeader("Content-Type", this.props.imageExtension);
        xhr.send({
          uri: "file://" + this.props.imagePath,
          name: fileId
        });
      });
  }

  disableAllMenutItems() {
    this.renderItem("photo", false);
    this.renderItem("location", false);
    this.renderItem("description", false);
    this.renderItem("send", false);
  }

  renderSpinner() {
    if (this.state.sending) {
      if (this.state.spinnerOn) {
        return (
          <OverlayChooserItem
            imagePath={require(ABSOLUTE_PATH + "/assets/square.png")}
          />
        );
      } else {
        return (
          <OverlayChooserItem
            imagePath={require(ABSOLUTE_PATH + "/assets/square_rotate.png")}
          />
        );
      }
    } else {
      return (
        <OverlayChooserItem
          imagePath={require(ABSOLUTE_PATH + "/assets/square.png")}
        />
      );
    }
  }

  renderItem(type, isTouchable) {
    switch (type) {
      case "photo":
        if (!this.state.sending && isTouchable) {
          return (
            <TouchableMenuItem
              imagePath={require(ABSOLUTE_PATH + "/assets/photo.png")}
              onPress={() => Actions.addPhoto()}
            />
          );
        } else {
          return (
            <ImageMenuItem
              imagePath={require(ABSOLUTE_PATH + "/assets/photo_pressed.png")}
            />
          );
        }
      case "location":
        if (!this.state.sending && isTouchable) {
          return (
            <TouchableMenuItem
              imagePath={require(ABSOLUTE_PATH + "/assets/location.png")}
              onPress={() => Actions.addLocation()}
            />
          );
        } else {
          return (
            <ImageMenuItem
              imagePath={require(ABSOLUTE_PATH + "/assets/location_pressed.png")}
            />
          );
        }
      case "description":
        if (!this.state.sending && isTouchable) {
          return (
            <TouchableMenuItem
              imagePath={require(ABSOLUTE_PATH + "/assets/about.png")}
              onPress={() => Actions.addDescription()}
            />
          );
        } else {
          return (
            <ImageMenuItem
              imagePath={require(ABSOLUTE_PATH + "/assets/about_pressed.png")}
            />
          );
        }

      case "send":
        if (!this.state.sending && isTouchable) {
          return (
            <TouchableMenuItem
              imagePath={require(ABSOLUTE_PATH + "/assets/send.png")}
              onPress={this.onSendPress.bind(this)}
            />
          );
        } else {
          return (
            <ImageMenuItem
              imagePath={require(ABSOLUTE_PATH + "/assets/send_pressed.png")}
            />
          );
        }
      default:
        // return;
        return null;
    }
  }

  render() {
    const {
      mainContainerStyle,
      menuItemsContainerStyle,
      menuRowStyle
    } = styles;
    return (
      <View style={mainContainerStyle}>
        <View style={menuItemsContainerStyle}>
          {this.renderSpinner()}
          <View style={menuRowStyle}>
            {this.renderItem("photo", true)}
            {this.renderItem("location", this.props.imageName)}
          </View>
          <View style={menuRowStyle}>
            {this.renderItem("description", this.props.imageName)}
            {this.renderItem(
              "send",
              this.props.imageName &&
                this.props.latitude &&
                this.props.longitude
            )}
          </View>
        </View>
        <Footer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainerStyle: {
    flex: 1,
    zIndex: 0
  },
  menuItemsContainerStyle: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 15,
    flexDirection: "column",
    // alignItems: "space-around",
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  menuRowStyle: {
    flex: 1,
    flexDirection: "row",
    zIndex: 2
  }
});

// za slanje state-ova ka reduxu i dalje
const mapDispatchToProps = dispatch => {
  return {
    imageAdded: bindActionCreators(imageAdded, dispatch),
    addLocation: bindActionCreators(addLocation, dispatch),
    descriptionAdded: bindActionCreators(descriptionAdded, dispatch),
    logOut: bindActionCreators(logOut, dispatch)
  };
};

//za primanje stateova u props-e
//<-- da bi prisli nekom od ovih propseva kucamo this.props.imagePath, npr
const mapStateToProps = state => {
  return {
    imagePath: state.post.imagePath,
    imageName: state.post.imageName,
    imageExtension: state.post.imageExtension,
    description: state.post.description,
    longitude: state.post.longitude,
    latitude: state.post.latitude,
    logedIn: state.auth.logedIn
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostCreator);
