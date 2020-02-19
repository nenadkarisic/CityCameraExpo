import {
  POST_IMAGE_ADDED,
  POST_IMAGE_EXTENSION_ADDED,
  POST_DESCRIPTION_ADDED,
  POST_LOCATION_ADDED,
  POST_SENT
} from "../actions/types";

const INITIAL_STATE = {
  image: "",
  description: "",
  latitude: "",
  longitude: "",
  sent: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case POST_IMAGE_ADDED:
    console.log('POST_IMAGE_ADDED', action);
      return {...state, 
        imagePath: action.payload.path ? action.payload.path : '',
        imageExtension: action.payload.extension ? action.payload.extension : '',
        imageName: action.payload.name ? action.payload.name : ''
       };
   

    case POST_DESCRIPTION_ADDED:
      return { ...state, description: action.payload };

    case POST_LOCATION_ADDED:
      // console.log("lat and long added to state: ", action.payload);
      return {
        ...state,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude
      };

    case POST_SENT:
      return { ...state, 
        imagePath: action.payload.path,
        imageExtension: action.payload.extension,
        imageName: action.payload.name,
        description: action.payload.description,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude
       };

    default:
      return state;
  }
};
