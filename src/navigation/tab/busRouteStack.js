import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BusRoute from '../../screens/tabs/busRoute/busRoute';
import TripAnalysis from '../../screens/tabs/busRoute/tripAnalysis/tripAnalysis';

const Stack = createStackNavigator();

function busRouteStack({ navigation, route }) {
  navigation.setOptions({ tabBarVisible: route.state ? route.state.index > 0 ? false : true : null });

  return (
      <Stack.Navigator>
        <Stack.Screen name="busRoute" component={BusRoute} options={{ headerShown: false }} />
        <Stack.Screen name="tripAnalysis" component={TripAnalysis} options={{ headerShown: false }} />
      </Stack.Navigator>
  );
}

export default busRouteStack;