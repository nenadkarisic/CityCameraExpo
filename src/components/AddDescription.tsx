import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  View,
  Image,
  TouchableOpacity,
  AsyncStorage,
  TextInput,
  StyleSheet
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { descriptionAdded } from '../actions';

class AddDescription extends Component {

  onDescriptionAdded(text){
    this.props.descriptionAdded(text)
  };

  // onButtonPress(){
  //   this.props.onDescriptionAdded({this.props})
  // }

  render(){
    const {
      menuItemsContainerStyle,
      textInputStyle,
      buttonsContainer,
      touchableStyle,
      smallImageStyle
    } = styles;

    return (
      <View
        style={menuItemsContainerStyle}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            placeholder={'Enter your description here.'}
            onChangeText={this.onDescriptionAdded.bind(this)}
            value={this.props.description}
            style={textInputStyle}
          />
        <View style={buttonsContainer}>
          <TouchableOpacity
            style={touchableStyle}
              onPress={()=> {Actions.pop()}}
              >
              <Image
                style={smallImageStyle}
                source={require('../assets/images/yes1.png')}
                // resizeMode='contain'
              />
            </TouchableOpacity>
          </View>
      </View>
    );
  };
};


const styles = StyleSheet.create({

  menuItemsContainerStyle: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 15,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  buttonsContainer: {
    flex:1,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'flex-start',
  },

  touchableStyle:{
    paddingHorizontal: 20
  },

  smallImageStyle: {
    height: 50,
    width: 100,
    alignSelf: 'center'
  },

  textInputStyle: {
    flex: 3,
    borderWidth: 1,
    borderColor: '#66f6f9',
    backgroundColor: '#cdf6f7',
    borderRadius: 7,
    marginHorizontal: 3,
    marginVertical: 3,
    alignItems: 'center',
    fontSize: 24,
  }
});

const mapStateToProps = state => {
  return {
    description: state.post.description,
  }
}

export default connect (mapStateToProps,{descriptionAdded})(AddDescription);
