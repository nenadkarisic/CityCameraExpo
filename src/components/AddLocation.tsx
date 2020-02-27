import React, { Component, LegacyRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  // Button,
  Keyboard
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { addLocation } from "../actions";
import {
  LOCATION_DISABLED_ALERT_TITLE,
  LOCATION_DISABLED_MSG,
  NO_LOCATION_SELECTED_ALERT_TITLE,
  NO_LOCATION_SELECTED_MSG,
  // ABSOLUTE_PATH
} from "./StringConstants";
import {
  // GEOCODING_API_KEY,
  GOOGLE_PLACES_API_KEY
} from "./googleAPIKeys";

import Images from '../../src/assets/images/images';
// const ABSOLUTE_PATH: string =
//   "c:/Users/pc/ReactNativeWorkspace/hyperether/CityCameraExpo/src";

const INITIAL_LONGITUDE_DELTA = 80;
const INITIAL_LATITUDE_DELTA = 80;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

// type LatLng = {
//   latitude: Number,
//   longitude: Number,
// }

// type Mark = {
//   coordinates: LatLng;
// }

interface Props {
  addLocation: (
    position: object
  ) => {
    type: string;
    payload: object;
  };
}

interface State {
  isMounted: boolean;
  // bilo je markers: object[]; i nije na liniji 271 mogao da pronadje property od mark.coordinates
  markers: Array<any>;
  isDeviceLocationOn: boolean;
  askedForLocation: boolean;
  keepCheckingForLocation: boolean;
  region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
}

// API keys relocated

class AddLocation extends Component<Props, State> {
  // constructor() {
  //   super();

  watchID: number;
  setMarkerRef: LegacyRef<Marker>;

  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      markers: [],
      isDeviceLocationOn: false,
      askedForLocation: false,
      keepCheckingForLocation: false,
      region: {
        latitude: 34.553127,
        longitude: 18.048012,
        latitudeDelta: INITIAL_LATITUDE_DELTA,
        longitudeDelta: INITIAL_LONGITUDE_DELTA
      }
    };
  }

  // if the device location is off, ask the user to turn it on
  onLocationOff = error => {
    if (!this.state.askedForLocation && error.code === 2) {
      // make sure that the user is asked only once to turn their location on
      // start checking if the location was turned on after the last check
      this.setState({ askedForLocation: true, keepCheckingForLocation: true });
      Alert.alert(LOCATION_DISABLED_ALERT_TITLE, LOCATION_DISABLED_MSG);
    }
    // check every second and a half if the user turned their location on in the meantime
    if (this.state.keepCheckingForLocation) {
      setTimeout(() => this.checkCurrentPosition(), 1500);
    }
  };

  // obtain the user's location using the navigator object and zoom the map on it
  checkCurrentPosition() {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position);
        this.setState({
          isDeviceLocationOn: true,
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }
        });
      },
      error => {
        this.onLocationOff(error);
      },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
    );
  }

  componentDidMount() {
    this.setState({ isMounted: true });
    this.checkCurrentPosition();
    this.watchID = navigator.geolocation.watchPosition(position => {
      console.log(position);
      this.setState({
        region: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }
      });
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
    this.setState({ isMounted: false });
  }

  saveLocation() {
    // if there is no marker on the map, no location is selected, show error message
    if (this.state.markers.length < 1) {
      Alert.alert(NO_LOCATION_SELECTED_ALERT_TITLE, NO_LOCATION_SELECTED_MSG);
    } else {
      // the component is about to unmount, stop checking if the location is on
      this.setState({ keepCheckingForLocation: false });
      const { latitude, longitude } = this.state.region;
      const position = { latitude, longitude };
      this.props.addLocation(position);
      Actions.pop();
    }
  }

  // long pressing a point on the map creates a marker and selects that location
  onLongPress(e) {
    const latlng = {
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude
    };
    if (this.state.isMounted) {
      this.setState({
        region: {
          latitude: latlng.latitude,
          longitude: latlng.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        },
        markers: [
          {
            coordinates: {
              longitude: latlng.longitude,
              latitude: latlng.latitude
            }
          }
        ]
      });
    }
  }

  renderGooglePlacesSearchBox() {
    return (
      <GooglePlacesAutocomplete
        placeholder="Search"
        minLength={5} // minimum length of text to search
        autoFocus={false}
        listViewDisplayed="auto"
        fetchDetails={true}
        renderDescription={row => row.description}
        // onPress={(data, details = null) => {
        onPress={(details = null) => {
          Keyboard.dismiss();
          const { location } = details.geometry;
          this.setState({
            region: {
              latitude: location.lat,
              longitude: location.lng,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA
            },
            markers: [
              {
                coordinates: {
                  longitude: location.lng,
                  latitude: location.lat
                }
              }
            ]
          });
        }}
        getDefaultValue={() => ""}
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: "en"
        }}
        styles={{
          textInputContainer: {
            width: "100%",
            backgroundColor: "#efefef"
          },
          predefinedPlacesDescription: {
            color: "#1faadb"
          }
        }}
        nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GooglePlacesSearchQuery={{
          rankby: "distance",
          types: "street_address"
        }}
        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      />
    );
  }

  render() {
    const {
      mainContainerStyle,
      mapContainerStyle,
      mapStyle,
      searchAndConfirmationViewStyle,
      searchAddressContainerStyle,
      buttonsContainer,
      touchableStyle,
      smallImageStyle
    } = styles;
    return (
      <View style={mainContainerStyle}>
        <View style={mapContainerStyle}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={mapStyle}
            showsUserLocation={true}
            showsMyLocationButton={this.state.isDeviceLocationOn}
            onLongPress={newPosition => this.onLongPress(newPosition)}
            region={this.state.region}
            onRegionChangeComplete={region => this.setState({ region })}
          >
            {this.state.markers.map((mark, i) => (
              <Marker
                key={i}
                ref={this.setMarkerRef}
                draggable
                coordinate={mark.coordinates}
                pinColor="#E64A19"
              />
            ))}
          </MapView>
        </View>
        <View style={searchAndConfirmationViewStyle}>
          <View style={searchAddressContainerStyle}>
            {this.renderGooglePlacesSearchBox()}
          </View>
          <View style={buttonsContainer}>
            <TouchableOpacity
              style={touchableStyle}
              onPress={this.saveLocation.bind(this)}
            >
              <Image
                source={Images.yes1}
                style={smallImageStyle}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={touchableStyle}
              onPress={() => Actions.pop()}
            >
              <Image
                source={Images.no1}
                style={smallImageStyle}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainerStyle: {
    flex: 1,
    flexDirection: "column",
    padding: 5,
    backgroundColor: "#efefef"
  },
  mapContainerStyle: {
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  mapStyle: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  searchAndConfirmationViewStyle: {
    position: "relative"
  },
  searchAddressContainerStyle: {
    flexDirection: "row"
  },
  buttonsContainer: {
    paddingTop: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignSelf: "stretch"
  },
  touchableStyle: {
    alignContent: "center"
  },
  smallImageStyle: {
    height: 30,
    width: 70
  }
});

export default connect(null, { addLocation })(AddLocation);
