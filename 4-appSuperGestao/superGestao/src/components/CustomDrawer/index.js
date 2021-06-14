import React, { useState, useEffect, useContext } from 'react';
import { HeaderDrawer, LogoDrawer, MessageDrawer, NameDrawer } from './drawerStyle';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

import { AuthContext } from '../../contexts/authContext';

export default function CustomDrawer(props) {

    const [ nomeUsuarioLogado, setNomeUsuarioLogado ] = useState('');

    const { user, logout } = useContext(AuthContext);
    
    useEffect(()=>{
        setNomeUsuarioLogado(user.nome.toString());
    }, [user])

    

 return (
   <DrawerContentScrollView {...props}>
    
        <HeaderDrawer>
            <LogoDrawer source={require('../../assets/simple-logo.png')} resizeMode="contain" />
            <MessageDrawer>
                Seja bem-vindo!
            </MessageDrawer>
            <NameDrawer>
                {nomeUsuarioLogado}
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