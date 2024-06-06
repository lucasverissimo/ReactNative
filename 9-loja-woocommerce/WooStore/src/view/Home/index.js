import React from "react";
import  { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Feather";
import Cart from "./Tabs/CartTab";
import Category from "./Tabs/CategoryTab";
import HomeTab from "./Tabs/HomeTab";

const Tab = createBottomTabNavigator();

const icons = {
    Home_Screen:{
        name: 'home',
        label: 'Home',
    },
    Category:{
        name: 'list',
        label: 'Categoria',        
    },
    Cart:{
        name: 'shopping-bag',
        label: 'Carrinho',
    },
};


export default function Home(){
    return(        
        <Tab.Navigator screenOptions={
           ({route}) =>({
                tabBarIcon: ({color, size}) => {
                    const { name } = icons[route.name];
                    return <Icon name={name} color={color} size={16}  />
                },
                tabBarStyle: {                                
                    paddingBottom:10,
                    paddingTop: 10,
                    height: 70,
                    backgroundColor: '#212121',
                    color: '#888',
                },
                tabBarActiveTintColor: '#fff',
                tabBarLabel: icons[route.name].label,
                tabBarLabelStyle:{
                    fontWeight: '600',
                    fontSize: 14,
                }
            })  
        }>
            <Tab.Screen name="Home_Screen" component={HomeTab} options={{ headerShown: false }} />
            <Tab.Screen name="Category" component={Category}  options={{ headerShown: false }} />
            <Tab.Screen name="Cart" component={Cart}  options={{ headerShown: false }} />
        </Tab.Navigator>        
    )
} 