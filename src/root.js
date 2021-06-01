import React from 'react';
import {Provider} from 'react-redux';
import AppStackNavigator from './navigation/appStack';
import store from './store/createStore';
import MapboxGL from '@react-native-mapbox-gl/maps';

console.disableYellowBox = true;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    MapboxGL.setAccessToken(
      'pk.eyJ1Ijoia3VsZGVlcC1yYXRob3JlIiwiYSI6ImNrZDkzZnd0ODBnejMyeHBtcnFmOGF0enoifQ.iv4SM83OYzcmSjK_wSHMOg',
    );
  }

  render() {
    return (
      <Provider store={store}>
        <AppStackNavigator />
      </Provider>
    );
  }
}
export default App;
