import * as React from 'react';
import {Linking} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BusRouteStack from './busRouteStack';
import HistoryStack from './historyStack';
import CallForHelpStack from './callForHelpStack';
import BusBreakdownStack from './busBreakdownStack';
import MoreStack from './moreStack';

import { Image, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Images, Colors, Fonts, AppStyles } from '../../theme';
const tabName = {
  busRoute: "Bus Route",
  history: "History",
  callForHelp: "Call for Help",
  busBreakdown: "Bus Breakdown",
  more: "More",
}
const Tab = createBottomTabNavigator();

export default function TabbarNavigation() {
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen name="busRoute" component={BusRouteStack} />
      <Tab.Screen name="history" component={HistoryStack} />
      <Tab.Screen name="callForHelp" component={CallForHelpStack} />
      <Tab.Screen name="busBreakdown" component={BusBreakdownStack} />
      <Tab.Screen name="more" component={MoreStack} />
    </Tab.Navigator>
  );
}

function MyTabBar({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) return null;

  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        let iconName = isFocused ? Images[`${route.name}Active`] : Images[`${route.name}Inactive`]
        
        const onPress = () => {
          if(route.name == "callForHelp") {
            Linking.openURL(`tel:7568547177`)

            return
          }
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name);
        };

        const onLongPress = () => {
          navigation.emit({ type: 'tabLongPress', target: route.key });
        };

        return (
          <TouchableOpacity
            key={label}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tab}
          >
            <Image source={iconName} style={styles.tabImage} resizeMode={'contain'} />
            <Text style={styles[`tabLabel${isFocused}`]}>{tabName[route.name]}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabbar: {
    flexDirection: 'row', 
    backgroundColor: Colors.whiteFF,
    height: 70,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 23,
    borderTopColor: Colors.greyEb,
    borderTopWidth: 2
  },
  tab: {
    alignItems: 'center'
  },
  tabImage: { 
    height: 19, 
    width: 19,
    marginBottom: 5
  },
  tabLabeltrue: {
    color: Colors.green27,
    fontSize: Fonts.size.font10,
    fontFamily: Fonts.type.light
  },
  tabLabelfalse: {
    color: Colors.black2b,
    fontSize: Fonts.size.font10,
    fontFamily: Fonts.type.light
  }
})