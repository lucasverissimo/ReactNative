import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import { Alert } from 'react-native';

export const AuthContext = createContext({});

export default function AuthProvider({ children }){
    const [ user, setUser ] = useState();
    const [ signed, setSigned ] = useState(false);
    const [ loadingBtnLogin, setLoadingBtnLogin] = useState(false);
    const [ loadingScreen, setLoadingScreen ] = useState(false);

    useEffect(()=>{
        async function verificaUsuarioLogado(){
            const usuario = await getStorageData("auth_user");
            if(usuario){   
                console.log("Existe usuario");
                //console.log(usuario);
                setUser(usuario);
                setSigned(true);
                setLoadingScreen(true);
                // signIn(usuario.email, usuario.senha);
            }else{
               console.log("Nao Existe usuario");
               setSigned(false);
               setLoadingScreen(true);
            }
        }

        setTimeout(function(){
            verificaUsuarioLogado();
        }, 500);
    }, []);

    async function signIn(email, pass){
        setLoadingBtnLogin(true);
        
        try{

            const response = await api.post('/auth.php', {
                action: 'login',
                dadosLogin:{
                    "email":email, 
                    "senha":pass
                }
            })
            .then(async function (response) {
                 console.log("Deu certo o request: ");
                 //console.log(response.data);
                 if(response.status == 200){
                    let info = response.data;
                    if(typeof info.Erro === 'undefined'){
                        setUser(info);
                        setStorageData("auth_user", info);
                        setSigned(true);  
                        setLoadingScreen(true);
                    }else{
                        Alert.alert("Erro", "E-mail ou senha estão incoretos!"); 
                        setSigned(false);
                        setLoadingBtnLogin(false);
                        const usuario = await getStorageData("auth_user");
                        if(usuario){
                            await delStorageData("auth_user");
                        }
                        setLoadingScreen(true);
                    }
                }else{
                    setLoadingBtnLogin(false);
                    const usuario = await getStorageData("auth_user");
                    if(usuario){
                        await delStorageData("auth_user");
                    }
                    setSigned(false);
                    setLoadingScreen(true);
                    Alert.alert("Erro ao fazer requisição", "Erro ao realizar requisição com o servidor, por favor tente mais tarde."); 
                }
                 
            })
            .catch(async function (error) {
                 console.log("Erro de conexão: "+ error);
                 Alert.alert(
                     "Erro ao se conectar com o servidor",
                     "Erro ao se conectar com o servidor, verifique se seu aparelho esta conectado a internet. Caso o erro persista, contate o administrador do sistema."
                 );
                 if(user){
                    await delStorageData("auth_user");
                    setLoadingScreen(true);
                 }
                 setSigned(false);
                 setLoadingBtnLogin(false);
            });           
            setLoadingBtnLogin(false);
        }catch(e){
            console.log("Erro: "+e);
            setLoadingBtnLogin(false);
            setSigned(false);
        }
        
    }

    async function setStorageData(name, data){
        await AsyncStorage.setItem(name, JSON.stringify(data));
    }

    async function getStorageData(name){
        const storageData = await AsyncStorage.getItem(name);
        if(storageData){
            return JSON.parse(storageData);
        }else{
            return null;
        }
    }

    async function delStorageData(name){
        await AsyncStorage.removeItem(name);
        return true;
    }

    async function logout(){
        setLoadingScreen(false);
        await delStorageData("auth_user");
        setLoadingScreen(true);
        setSigned(false);
    }

    return(
        <AuthContext.Provider value={{ signed, signIn, user, loadingBtnLogin, loadingScreen, logout }}>
            {children}
        </AuthContext.Provider>
    );
}