import React, { useState, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../pages/Login';
import AuthRoutes from './auth.routes';

import { View, ActivityIndicator } from 'react-native';

import { AuthContext } from '../contexts/authContext';

const StackNav = createStackNavigator();

export default function Routes() {
    
    const { signed, loadingScreen } = useContext(AuthContext);

    if(loadingScreen == false){
        return(
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <ActivityIndicator size={30} color="#02a343" />
            </View>
        );
    }else{
        if(signed == false){
            return(
                <StackNav.Navigator>
                    <StackNav.Screen name="Login" component={Login} options={{ headerShown: false }}/>                    
                </StackNav.Navigator>
            );
        }else{
            return(
                <AuthRoutes />
            );
        }
    }
    
}