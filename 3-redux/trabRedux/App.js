import React from 'react';
import { View, Text, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Reducers from './src/services/Reducers';

import Cadastro from './src/pages/Cadastro';
import Home from './src/pages/Home';
import Login from './src/pages/Login';

LogBox.ignoreAllLogs();

const Stack = createStackNavigator();
export default function App() {

 let store = createStore(Reducers);

 return (
   <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{headerShown:false,}} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
      </Stack.Navigator>
    </NavigationContainer>
   </Provider>
  );

}