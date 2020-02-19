import API from "../services/API";
import Session from "../services/Session";
import { Actions } from "react-native-router-flux";
import { AsyncStorage, Alert } from "react-native";
import {
  USERNAME_CHANGED,
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGOUT,
  POST_IMAGE_ADDED,
  POST_DESCRIPTION_ADDED,
  POST_LOCATION_ADDED,
  // POST_IMAGE_EXTENSION_ADDED,
  POST_SENT
} from "./types";
// import PostCreator from "../components/PostCreator";
import Toast from "react-native-simple-toast";

export const userNameChanged = text => {
  return {
    type: USERNAME_CHANGED,
    payload: text
  };
};

export const emailChanged = text => {
  return {
    type: EMAIL_CHANGED,
    payload: text //<--novi email koji korisnik kuca
  };
};

export const passwordChanged = text => {
  return {
    type: PASSWORD_CHANGED,
    payload: text //<--novi pass koji korisnik kuca
  };
};

// export const loginUser = ({ userName, password }) => {
//   console.log({ userName, password });

//   return dispatch => {
//     // disptach({type: LOGIN_USER});cs

//     API.login(userName, password)
//       .then(response => {
//         dispatch({ type: "LOGIN_USER_SUCCESS", payload: response });

//         try {
//           AsyncStorage.setItem("user", JSON.stringify(response.data.user))

//             .then(() => {
//               AsyncStorage.setItem(
//                 "token",
//                 JSON.stringify(response.data.token)
//               ).then(() => {
//                 console.log('User login data saved in storage');
//                 Session.save(response.data.user, response.data.token);
//                 console.log('User session',Session.getUser());
//                 Actions.postCreator();
//               });
//             })
//             .catch(() => {
//               console.log("Greska prilikom snimanja korisnika.");
//             });
//         } catch (error) {
//           console.log(error);
//         }
//       })
//       .catch(error => {
//         console.log("Logovanje nije uspelo: " + error);
//       });
//   };
// };

export const loginUser = ({ userName, password }) => {
  return dispatch => {
    dispatch({ type: LOGIN_USER });
    API.login(userName, password)
      .then(response => {
        try {
          AsyncStorage.setItem("user", JSON.stringify(response.data.user))
            .then(() => {
              AsyncStorage.setItem(
                "token",
                JSON.stringify(response.data.token)
              ).then(_data => {
                Session.save(response.data.user, response.data.token);

                loginUserSuccess(dispatch, response.data.user, response.data.token);
                Actions.postCreator();
                //for reseting all fields on login
                dispatch({ type: LOGOUT });
              });
            })
            .catch(() => {
              console.log("Error saving credentials.");
            });
        } catch (error) {
          console.log("Error is: ", error);
        }
      })
      .catch(error => {
        console.log("Login failed: " + error);
        loginUserFail(dispatch);
      });
  };
};

const loginUserSuccess = (dispatch, user, token) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    user: user,
    token: token
  });
};
const loginUserFail = dispatch => {
  dispatch({
    type: LOGIN_USER_FAIL
  });
};

const logOutJump = dispatch => {
  dispatch({ type: LOGOUT });
  AsyncStorage.removeItem("user", err => {
    if (err) {
      console.log(err);
    }
    //TODO obrisi i token
  });
  AsyncStorage.removeItem("token", err => {
    if (err) {
      console.log(err);
    }
  });
  Session.delete();
  Actions.login();
};

export const logOut = _logOut => {
  return dispatch => {
    Alert.alert(
      "Log Out",
      "Do you want to log out?",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => logOutJump(dispatch) }
      ],
      { cancelable: false }
    );
  };
};

export const registerUser = ({ userName, email, password }) => {
  console.log({ userName, email, password });
  return dispatch => {
    API.register(userName, email, password)
      .then(user => {
        dispatch({ type: "REGISTER_USER_SUCCESS", payload: user });
        Toast.show("Registration successful.", Toast.LONG);
        Actions.login();
        //for reseting all fields on login
        dispatch({ type: LOGOUT });
      })
      .catch(error => {
        Toast.show(
          "Username is already in use. Please try again with diferent username.",
          Toast.LONG
        );
        console.log("Registration failed." + error);
      });
  };
};

//Action creator preko readux-thunk-a vraca funkciju koja ce se kasnije pozvati preko dispatch - a.
//------------Post Actions --------------------
//akciju treba povezati sa reducerom preko POST_IMAGE_ADDED
export const imageAdded = image => {
  return {
    type: POST_IMAGE_ADDED,
    payload: image
  };
};

export const descriptionAdded = description => {
  return {
    type: POST_DESCRIPTION_ADDED,
    payload: description
  };
};

export const addLocation = position => {
  return {
    type: POST_LOCATION_ADDED,
    payload: position
  };
};

export const postSent = post => {
  return {
    type: POST_SENT,
    payload: post
  };
};
