import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { View, Image, TouchableOpacity } from "react-native";
import { Scene, Router } from "react-native-router-flux";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import AddPhoto from "./components/AddPhoto";
import AddDescription from "./components/AddDescription";
import AddLocation from "./components/AddLocation";
import PostCreator from "./components/PostCreator";
import {
  // imageAdded,
  // descriptionAdded,
  // addLocation,
  // loginUser,
  // postSent,
  logOut
} from "./actions";
// import { Session } from "./services/Session";
const exitImg = require("./assets/images/exit.png");

interface Props {
  logout?: () => (dispatch: any) => void;
}

class RouterComponent extends Component<Props> {
  constructor(props) {
    super(props);
  }

  renderBackButton = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          logOut();
        }}
      >
        <View
          style={{ flexDirection: "row", alignItems: "center", marginLeft: 18 }}
        >
          <Image
            source={exitImg}
            resizeMode={"contain"}
          />
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene
            hideNavBar
            key="login"
            type="reset"
            title="Welcome to CityCam"
            component={LoginForm}
            initial
          />
          <Scene key="signup" title="Please signup" component={SignupForm} />

          <Scene
            key="postCreator"
            type="reset"
            title="Create a new post"
            component={PostCreator}
            renderBackButton={this.renderBackButton}
          />
          <Scene key="addPhoto" title="Add a photo" component={AddPhoto} />
          <Scene
            key="addLocation"
            title="Select a location"
            component={AddLocation}
          />
          <Scene
            key="addDescription"
            title="Add description"
            component={AddDescription}
          />
        </Scene>
      </Router>
    );
  }
}

// docs: React Redux - API Reference - connect()
const mapDispatchToProps = (dispatch) => {
  return {
    // loginUser: bindActionCreators(loginUser, dispatch),
    // postSent: bindActionCreators(postSent, dispatch),
    logOut: bindActionCreators(logOut, dispatch)
  };
};
// If you don't want to subscribe to store updates, pass null or undefined in place of mapStateToProps.
export default connect(null, mapDispatchToProps)(RouterComponent);
