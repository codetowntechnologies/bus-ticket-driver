import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import History from '../../screens/tabs/history/history';

const Stack = createStackNavigator();

function historyStack({ navigation, route }) {
  navigation.setOptions({ tabBarVisible: route.state ? route.state.index > 0 ? false : true : null });

  return (
      <Stack.Navigator>
        <Stack.Screen name="history" component={History} options={{ headerShown: false }} />
      </Stack.Navigator>
  );
}

export default historyStack;