import React, { Component } from 'react';
// import Reactotron from 'reactotron-react-native';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import ReduxThunk from 'redux-thunk'; // this is middleware
import reducers from './reducers';
import RouterComponent from './Router';
import firebase from 'firebase';

class App extends Component {
  componentWillMount() {
    //Prod
    var config = {
      apiKey: "AIzaSyDZknvS8hVAtek6b8zWqmFtfzva5iVY3og",
      authDomain: "the-decision-smith.firebaseapp.com",
      databaseURL: "https://the-decision-smith.firebaseio.com",
      projectId: "the-decision-smith",
      storageBucket: "",
      messagingSenderId: "242855249601"
    };

    // Dev
    // var config = {
    //   apiKey: "AIzaSyAXD-ZKcsoLc12q7XK9vYwz3qBbBaDH_90",
    //   authDomain: "decision-smith-test.firebaseapp.com",
    //   databaseURL: "https://decision-smith-test.firebaseio.com",
    //   projectId: "decision-smith-test",
    //   storageBucket: "decision-smith-test.appspot.com",
    //   messagingSenderId: "922180006087"
    // };

    if (!firebase?.apps?.length) {
      firebase.initializeApp(config);
    }
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    return (
      <Provider store={store}>
        <RouterComponent/>
      </Provider> 
    )
  }
}

export default App;
