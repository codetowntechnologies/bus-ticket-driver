import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CallHelp from '../../screens/tabs/callForHelp/callForHelp';

const Stack = createStackNavigator();

function callForHelpStack({ navigation, route }) {
  navigation.setOptions({ tabBarVisible: route.state ? route.state.index > 0 ? false : true : null });

  return (
      <Stack.Navigator>
        <Stack.Screen name="callHelp" component={CallHelp} options={{ headerShown: false }} />
      </Stack.Navigator>
  );
}

export default callForHelpStack;