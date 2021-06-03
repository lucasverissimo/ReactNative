import React, { createContext, useState, useEffect } from 'react';
import firebase from '../services/firebaseConnection';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

export default function AuthProvider({ children }){

    const [user, setUser] = useState(null);
    const [loading, setLoading ] = useState(true);
    const [loadingAuth, setLoadingAuth ] = useState(false);

    useEffect(()=>{
        async function loadStorage(){
            const storageUser = await AsyncStorage.getItem('Auth_user');
            if(storageUser){
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }else{
                setLoading(false);
            }
        }

        //setTimeout(function(){
            loadStorage();
        // }, 3000);
        
    }, []);

    async function signIn(email, pass){
        // setLoading(true);
        setLoadingAuth(true);
        await firebase.auth().signInWithEmailAndPassword(email, pass)
        .then(async (firebaseUser)=>{
            let uid = firebaseUser.user.uid;
            await firebase.database().ref('users').child(uid).once('value')
            .then((snapshot)=>{
                let data = {
                    uid: uid,
                    nome: snapshot.val().nome,
                    email: firebaseUser.user.email,
                };

                setUser(data);
                storageUser(data);
            }).catch((error)=>{
                alert("Erro ao consultar a base de dados!");
                console.log(error);
            });
            //setLoading(false);
            setLoadingAuth(false);

        }).catch((error)=>{
            alert("Usuário ou senha incorretos!");
            //setLoading(false);
            setLoadingAuth(false);
            console.log(error);
        });
    }

    async function signUp(email, pass, nome){
        // setLoading(true);
        setLoadingAuth(true);
        await firebase.auth().createUserWithEmailAndPassword(email, pass)
        .then(async (firebaseUser) =>{
            let uid = firebaseUser.user.uid;
            await firebase.database().ref('users').child(uid).set({
                saldo: 0,
                nome: nome,
            }).then(()=>{
                let data = {
                    uid: uid,
                    nome: nome,
                    email: firebaseUser.user.email
                };
                setUser(data);
                storageUser(data);
                //setLoading(false);
                setLoadingAuth(false);
            }).catch((error) => {
                //setLoading(false);
                setLoadingAuth(false);
                alert("Erro ao inserir na base de dados, verifique o log de erros!");
                console.log(error);
            });
        }).catch((error)=>{
            //setLoading(false);
            setLoadingAuth(false);
            alert("Erro ao cadastrar!");
            console.log(error);
        });
    }

    async function storageUser(data){
        await AsyncStorage.setItem('Auth_user', JSON.stringify(data));
    }

    async function signOut(){
        setLoading(true);
        await firebase.auth().signOut();
        await AsyncStorage.clear()
        .then(()=>{
            setUser(null);
            setLoading(false);
        });
    }

    // signed verifica se o usuario esta logado. No caso se tiver null (como no começo), ele vai ser falso, se tiver alguma outra coisa, vai ser true
    return(
        <AuthContext.Provider value={{ signed: !!user, user, loading, signUp, signIn, signOut, loadingAuth}}> 
            {children}
        </AuthContext.Provider>
    );
}