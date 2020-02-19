import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

var user = null;
var token = null;

class Session  {

	static save(tempUser, tempToken){
		user = tempUser;
		token = tempToken;
	}

	static delete(){
		user = null;
		token = null;
	}

	static updateUser(tempUser){
		user = tempUser;
	}

	static updateToken(tempToken){
		token = tempToken;
	}

	static isAuth(){
		return user && token;
	}

	static getUser(){
		return user;
	}

	static getUserId(){
		if (!user) return;
		return user._id;
	}

	static getToken(){
		return token;
	}
	 
};
 

export default Session;
