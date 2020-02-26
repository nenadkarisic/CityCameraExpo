import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  // Image,
  TextInput
} from "react-native";
import { connect } from "react-redux";
// import { Actions } from "react-native-router-flux";
import {
  userNameChanged,
  passwordChanged,
  emailChanged,
  registerUser
} from "../actions";
import { Button, Spinner } from "./common";
// import backgroundImage from "../assets/images/bg.jpg";
import {ABSOLUTE_PATH} from './StringConstants';
// import ValidationComponent from "react-native-form-validator";

interface Props {
  userName: string;
  email: string;
  password: string;
  error: string;
  loading: boolean;
  userNameChanged: (
    payload: string
  ) => {
    type: string;
    payload: string;
  };
  passwordChanged: (
    payload: string
  ) => {
    type: string;
    payload: string;
  };
  emailChanged: (
    payload: string
  ) => {
    type: string;
    payload: string;
  };
  registerUser: ({
    userName,
    email,
    password
  }: {
    userName: string;
    email: string;
    password: string;
  }) => (dispatch: any) => void;
}

// extends ValidationComponent  -- REMOVED from class declaration

class SignupForm extends Component<Props> {
  // userName: string;
  // email: string;
  // password: string;
  // error: string;
  onButtonPress() {
    const { userName, email, password } = this.props;
    // this.validate({
    //   email:{email: true}
    // })
    // console.log('Validacija ', this.getErrorMessages())
    registerUser({ userName, email, password });
  }

  onUserNameChange(text: string) {
    userNameChanged(text);
  }

  onEmailChange(text: string) {
    emailChanged(text);
  }

  onPasswordChange(text: string) {
    passwordChanged(text);
  }

  renderError() {
    if (this.props.error) {
      return (
        <View>
          <Text style={styles.errorTextStyle}>{this.props.error}</Text>
        </View>
      );
    }
    return null;
  }

  renderRegisterButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    return <Button onPress={this.onButtonPress.bind(this)}> Register </Button>;
  }

  render() {
    return (
      <ImageBackground source={require(ABSOLUTE_PATH + '/assets/images/bg.jpg')} style={styles.backgroundImage}>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="username"
              placeholderTextColor="white"
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              onChangeText={this.onUserNameChange.bind(this)}
              value={this.props.userName} //<-- iz mapStateToPropsa(iz reducera)
            />

            <TextInput
              style={styles.input}
              placeholder="email"
              placeholderTextColor="white"
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              onChangeText={this.onEmailChange.bind(this)}
              value={this.props.email} //<-- iz mapStateToPropsa(iz reducera)
            />

            <TextInput
              style={styles.input}
              secureTextEntry
              placeholder="password"
              placeholderTextColor="white"
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              onChangeText={this.onPasswordChange.bind(this)}
              value={this.props.password} //<-- iz mapStateToPropsa
            />
          </View>
          {this.renderError()}
          {this.renderRegisterButton()}
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  backgroundImage: {
    width: "100%",
    flex: 1
  },

  inputContainer: {
    width: "70%",
    marginBottom: 15
  },

  input: {
    color: "white",
    width: "100%",
    height: 40,
    fontSize: 20,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 5,
    paddingLeft: 15,
    margin: 8,
    borderRadius: 5
  },

  errorTextStyle: {
    fontSize: 20,
    alignSelf: "center",
    color: "white",
    backgroundColor: "transparent",
    fontWeight: "bold",
    textShadowColor: "red",
    textShadowOffset: { width: -1, height: 1 }
  }
});

const mapStateToProps = state => {
  return {
    userName: state.auth.userName,
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error,
    loading: state.auth.loading
  };
};

export default connect(mapStateToProps, {
  userNameChanged,
  emailChanged,
  passwordChanged,
  registerUser
})(SignupForm);
