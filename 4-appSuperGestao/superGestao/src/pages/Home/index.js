import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

import TabAlerta from './tabs/TabAlerta';
import TabVendas from './tabs/TabVendas';
import TabDespesas from './tabs/TabDespesas';

const Tab = createBottomTabNavigator();

const icons = {
    Vendas:{
        name: 'dollar-sign',
    },
    Despesas:{
        name: 'activity',
    },
    Alertas:{
        name: 'alert-circle',
    },
};

export default function Home() {
 return (
        
            <Tab.Navigator
                screenOptions={ ({route}) =>({
                    tabBarIcon: ({color, size}) => {
                        const { name } = icons[route.name];
                        return <Icon name={name} color={color} size={20}  />
                    }
                }) }
                tabBarOptions={
                    {
                    style:{
                        backgroundColor: '#212121',
                        paddingBottom: 15,
                        paddingTop: 10,
                        height: 60,
                    },
                    activeTintColor: '#02a343',
                    inactiveTintColor: '#888'
                    }
                }                
            >
                <Tab.Screen name="Vendas" component={TabVendas} />
                <Tab.Screen name="Despesas" component={TabDespesas} />
                <Tab.Screen name="Alertas" component={TabAlerta} />
            </Tab.Navigator>  
        
  );

}