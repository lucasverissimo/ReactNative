import React, { useContext } from 'react';
import {View, ActivityIndicator } from 'react-native';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import { AuthContext } from '../contexts/auth';

export default function Routes(){

    const { signed, loading } = useContext(AuthContext);
    // verifica se esta logado. Se signed for true, ele joga o cara para as rotas internas do app (approutes)
    // se for false, joga para as rotas de autentiacão (authroutes)

    if(loading){
        return(
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" color="#131313" />
            </View>
        );
    }
    return (
        signed ? <AppRoutes /> : <AuthRoutes />
    );
}