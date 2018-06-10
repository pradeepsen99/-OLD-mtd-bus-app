import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import nearbyScreen from '../screens/nearest';
import LinksScreen from '../screens/LinksScreen';
//import mapScreen from '../screens/SettingsScreen';

export default TabNavigator(
  {
    //Search:{
      //screen: LinksScreen,
    //},
    Nearby: {
      screen: nearbyScreen,
    },
    //Map: {
      //screen: mapScreen,
    //},
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Nearby':
            iconName = Platform.OS === 'ios' ? `ios-compass${focused ? '' : '-outline'}` : 'md-compass';
            break;
          //case 'Map':
            //iconName = Platform.OS === 'ios' ? `ios-map${focused ? '' : '-outline'}` : 'md-map';
            //break;
          case 'Search':
            iconName = Platform.OS === 'ios' ? `ios-search${focused ? '' : '-outline'}` : 'md-search';
            break;
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: true,
  }
);
