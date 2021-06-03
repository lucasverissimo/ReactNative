import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../pages/Home';
import New from '../pages/New';
import Profile from '../pages/Profile';
import CustomDrawer from '../components/CustomDrawer';


const AppDrawer = createDrawerNavigator();

function AppRoutes(){
    return(
    <AppDrawer.Navigator
    drawerContent={ (props) => <CustomDrawer {...props} /> }

    drawerStyle={{
     backgroundColor: '#171717'
    }}
    drawerContentOptions={{
        labelStyle:{
            fontWeight: 'bold'
        },
        activeTintColor: '#FFF',
        activeBackgroundColor: '#00b94a',
        inactiveBackgroundColor: '#000',
        inactiveTintColor: '#DDD',
        itemStyle: {
            marginVertical: 5,
        }
    }}
    >
        <AppDrawer.Screen name="Home" component={Home}/>
        <AppDrawer.Screen name="Registrar" component={New} />
        <AppDrawer.Screen name="Perfil" component={Profile} />
    </AppDrawer.Navigator>
    );
}

export default AppRoutes;




/*import 'react-native-gesture-handler';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from './../pages/Home';
import New from './../pages/New';
import Profile from './../pages/Profile';

import CustomDrawer from '../components/CustomDrawer';

const AppDrawer = createDrawerNavigator();

export default function AppRoutes(){
    return(
        
            <AppDrawer.Navigator

                 drawerContent={ (props) => <CustomDrawer {...props} />}
                //drawerContent={CustomDrawer}
                drawerStyle={{
                    backgroundColor: '#171717',
                }}
                drawerContentOptions={{
                    labelStyle:{
                        fontWeight: 'bold',                    
                    },
                    activeTintColor: '#fff',
                    activeBackgroundColor: '#00b94a',
                    inactiveBackgroundColor: '#000',
                    inactiveTintColor: '#888',
                    itemStyle:{
                        marginVertical: 5,
                        marginHorizontal: 25,
                    }
                }}
            >
                <AppDrawer.Screen name="Home" component={Home} />
                <AppDrawer.Screen name="Registrar" component={New} />
                <AppDrawer.Screen name="Perfil" component={Profile} />
            </AppDrawer.Navigator>
       
    );
}*/