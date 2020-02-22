import {
  USERNAME_CHANGED,
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOGOUT
} from "../actions/types";

const INITIAL_STATE = {
  //<---default podesavanja. Prazni stringovi.
  userName: "",
  password: "",
  email: "",
  error: "",
  loading: false,
  logedIn: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USERNAME_CHANGED:
      return { ...state, userName: action.payload }; // <--napravi novi objekat, uzmi sve propertije iz state objekata i ubaci ih u novi objekat. Zatim uzmi action.payload prop i ubaci ga na pocetak (ako vec postoji, pregazi ga.)

    case EMAIL_CHANGED:
      return { ...state, email: action.payload };

    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };

    case LOGIN_USER:
      return { ...state, loading: true, error: "", logedIn: true };

    case LOGIN_USER_SUCCESS:
      return { ...state, user: action.user, token: action.token };

    case LOGIN_USER_FAIL:
      return { ...state, error: "Authentication failed.", loading: false };

    case LOGOUT:
      return {
        ...state,
        loading: false,
        error: "",
        password: "",
        userName: "",
        email: ""
      };

    default:
      return state;
  }
};
