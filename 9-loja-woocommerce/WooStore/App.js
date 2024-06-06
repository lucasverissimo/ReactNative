import 'react-native-gesture-handler';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

import React from 'react';
import { SafeAreaView  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/view/Home';
import Profile from './src/view/Profile';

// const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App(){

  return(
    <SafeAreaView style={{ flex: 1}}>
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Profile" component={Profile} />
      </Drawer.Navigator>
    </NavigationContainer>
    </SafeAreaView>
  )
}


/*
  <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="New Customer" component={NewCustomer} />
    </Stack.Navigator>
  
*/