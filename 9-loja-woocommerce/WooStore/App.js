import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Div, P } from './src/style/globalStyle';

import Home from './src/view/Home';
import NewCustomer from './src/view/NewCustomer';

// const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App(){

  return(
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="New Costumer" component={NewCustomer} />
      </Drawer.Navigator>
    </NavigationContainer>
    
  )
}


/*
  <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="New Customer" component={NewCustomer} />
    </Stack.Navigator>
  
*/