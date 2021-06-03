import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Home() {

 const navigation = useNavigation();

 return (
    <View style={style.container}>
        
        <Text>Home</Text>

        <TouchableOpacity onPress={()=>{ navigation.navigate('Cadastro') }} style={style.btn}>
            <Text style={style.textbtn}>Cadastro</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={()=>{ navigation.navigate('Login') }} style={style.btn}>
            <Text style={style.textbtn}>Login</Text>
        </TouchableOpacity>

    </View>
  );
}

const style = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',    
    },
    btn:{
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f00',
        margin: 10,
    },
    textbtn:{
        color: '#fff',
    },
});