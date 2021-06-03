import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/Home';
import Usuarios from '../pages/Usuarios';
import CustomDrawer from '../components/CustomDrawer';

import FormUsuarios from '../pages/FormUsuarios';


const AppDrawer = createDrawerNavigator();
const StackNav = createStackNavigator();

function ScreenDrawerRoutes(){
    return(
        <AppDrawer.Navigator
            drawerContent={ (props) => <CustomDrawer {...props} /> }
            drawerStyle={{
                backgroundColor: '#212121',
            }}
            drawerContentOptions={{            
                activeTintColor: '#fff',
                activeBackgroundColor: '#02a343',
                inactiveBackgroundColor: '#000',
                fontSize: 15,            
                inactiveTintColor: '#02a343'
            }}
        >
            <AppDrawer.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <AppDrawer.Screen name="Usuarios" component={Usuarios} options={{ headerShown: false }} />            
        </AppDrawer.Navigator>
    );
}

export default function AuthRoutes() {
 return (
     <StackNav.Navigator>
        <StackNav.Screen name="ScreenDrawerRoutes"  component={ScreenDrawerRoutes} options={{headerShown: false }}/>
        <StackNav.Screen name="FormUsuarios"  component={FormUsuarios} options={{headerShown: false }} />
     </StackNav.Navigator>
  );
}