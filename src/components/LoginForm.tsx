import React, { Component } from "react";
import Session from "../services/Session";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  Keyboard,
  Image,
  AsyncStorage
} from "react-native";
import { connect } from "react-redux";
import {
  userNameChanged,
  passwordChanged,
  loginUser,
  LoginUserPayload
} from "../actions";
import { Actions } from "react-native-router-flux";
import { Spinner, Button } from "./common";
// import backgroundImage from "../assets/images/bg.jpg";
import { ABSOLUTE_PATH } from "./StringConstants";

interface Props {
  userName: string;
  password: string;
  error: string;
  loading: boolean;
  loginUser: (payload: LoginUserPayload) => void;
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
}

class LoginForm extends Component<Props> {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    AsyncStorage.getItem("token")
      .then(token => {
        // var token = JSON.parse(token);
        // if(currentUser){
        //   this.props.userNameChanged(currentUser.username)
        //   this.props.passwordChanged(currentUser.password)

        //   const { userName, password } = this.props;
        //   this.props.loginUser({userName, password}) //<--from mapStateToProps
        // }

        if (token) {
          AsyncStorage.getItem("user").then(user => {
            Session.save(JSON.parse(user), token);
            Actions.postCreator();
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  onButtonPress() {
    const { userName, password, loginUser } = this.props;
    loginUser({ userName, password });
    Keyboard.dismiss();
    // this.onUserNameChange('');
    // this.onPasswordChange('')
  }

  onUserNameChange(text: string) {
    userNameChanged(text);
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

  renderLogInButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    return <Button onPress={this.onButtonPress.bind(this)}> Login </Button>;
  }

  render() {
    return (
      <ImageBackground
        source={require(ABSOLUTE_PATH + "/assets/images/bg.jpg")}
        style={styles.backgroundImage}
      >
        <View style={styles.header}>
          <Image
            source={require(ABSOLUTE_PATH + "/assets/images/whiteCamera.png")}
            style={{ width: 25, height: 25, marginLeft: 10, marginRight: 10 }}
          />
          <Text style={styles.headerText}>CityCam</Text>
        </View>

        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="username"
              autoCapitalize="none"
              placeholderTextColor="white"
              underlineColorAndroid="transparent"
              onChangeText={this.onUserNameChange.bind(this)}
              value={this.props.userName} //<-- iz mapStateToPropsa(iz reducera)
            />
            <TextInput
              style={styles.input}
              secureTextEntry
              placeholder="password"
              autoCapitalize="none"
              placeholderTextColor="white"
              underlineColorAndroid="transparent"
              onChangeText={this.onPasswordChange.bind(this)}
              value={this.props.password} //<-- iz mapStateToPropsa
            />
          </View>
          {this.renderError()}
          {this.renderLogInButton()}
          <View>
            <Text style={styles.signUpTextStyle} onPress={Actions.signup}>
              Register
            </Text>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    justifyContent: "center",
    alignItems: "center"
  },

  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)"
  },

  headerText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold"
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

  signUpTextStyle: {
    flexDirection: "row",
    alignItems: "center",
    color: "white",
    fontWeight: "bold",
    marginTop: 10
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

//mapStateToProps helper služi za komunikaciju iz reducera u komponentu, tj da vratimo properti koji hoćemo iz
//reducera u komponentu.
const mapStateToProps = state => {
  return {
    userName: state.auth.userName, //<--iz AuthReducer-a
    password: state.auth.password,
    error: state.auth.error,
    loading: state.auth.loading,
    logedIn: state.auth.logedIn
  };
};

export default connect(mapStateToProps, {
  userNameChanged,
  passwordChanged,
  loginUser
})(LoginForm);
