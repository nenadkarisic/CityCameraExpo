import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
// import { View } from 'react-native';
// import { Header, Button, Spinner } from './components/common';
import reducers from './reducers'
import Router from './Router';


class App extends Component{

    render(){
        //ReduxThunk je midlevare zato smo ubacili apply middleware i ubacili ovo ispod kako bismo imali dodatne opcije na store-u
        return (
            <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
                <Router />
            </Provider>
        );
    }
}

export default App;