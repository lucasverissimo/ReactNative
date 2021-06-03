import React, { useContext } from 'react';
import { HeaderDrawer, LogoDrawer, MessageDrawer, NameDrawer } from './drawerStyle';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

import { AuthContext } from '../../contexts/authContext';

export default function CustomDrawer(props) {

    const { user, logout } = useContext(AuthContext);

 return (
   <DrawerContentScrollView {...props}>
    
        <HeaderDrawer>
            <LogoDrawer source={require('../../assets/simple-logo.png')} resizeMode="contain" />
            <MessageDrawer>
                Seja bem-vindo!
            </MessageDrawer>
            <NameDrawer>
                {user.nome.toString()}
            </NameDrawer>
        </HeaderDrawer>

       <DrawerItemList { ...props } />
       <DrawerItem 
        {...props} 
        label="Sair" 
        inactiveBackgroundColor="#000"
        labelStyle={{color: '#02a343', fontSize: 15}}
        onPress={() => logout() }
       />
   </DrawerContentScrollView>
  );
}