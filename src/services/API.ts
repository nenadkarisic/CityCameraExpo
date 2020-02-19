import axios from "axios";
import Session from "./Session";

let SERVER_URL = "http://mycitycamera.com";

// Add a request interceptor
axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    if (!config.headers) config.headers = {};
    config.headers["x-access-token"] = Session.getToken();
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error

    //------Ispisi toast za error---------
    return Promise.reject(error);
  }
);

class API {
  login(userName, password) {
    return axios.post(SERVER_URL + "/user/login", {
      username: userName,
      password: password
    });
  }

  register(userName, email, password) {
    return axios.post(SERVER_URL + "/user/register", {
      username: userName,
      email: email,
      password: password
    });
  }

  getUploadURL(fileName, ext, description, location) {
    return axios.post(
      SERVER_URL + "/file/" + Session.getUserId() + "/getUploadURL",
      {
        file: fileName,
        ext: ext,
        description: description,
        location: location
      }
    );
  }
}

export default new API();
