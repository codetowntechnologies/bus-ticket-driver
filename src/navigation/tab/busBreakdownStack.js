import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BusBreakdown from '../../screens/tabs/busBreakdown/busBreakdown';

const Stack = createStackNavigator();

function busBreakdownStack({ navigation, route }) {
  navigation.setOptions({ tabBarVisible: route.state ? route.state.index > 0 ? false : true : null });

  return (
      <Stack.Navigator>
        <Stack.Screen name="busBreakdown" component={BusBreakdown} options={{ headerShown: false }} />
      </Stack.Navigator>
  );
}

export default busBreakdownStack;