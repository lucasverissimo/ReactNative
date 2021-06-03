import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Background, Container } from '../styles/homeStyle';
import { AreaListaUsuarios, HeaderAreaListaUsuarios, NomeUsuario, BtnAcoes, BtnEditarUsuario, BtnExcluirUsuario } from '../styles/usuariosStyle';
import TitleHeader from '../../components/TitleHeader';

import Header from '../../components/Header';
import Icon from 'react-native-vector-icons/Feather';


export default function Usuarios() {
    
    const [ listaUsuarios, setListaUsuarios ] = useState([]);
    const navigation = useNavigation();

    useEffect(()=>{
        
        function carregarListaUsuarios(){
            let data = [
                {id:1, 'nome':'Lucas Veríssimo', 'usuario': 'lvgarcez', 'email':'lucas_verissimo@outlook.com'},
                {id:2, 'nome':'Lucas Veríssimo', 'usuario': 'lvgarcez', 'email':'lucas_verissimo@outlook.com'},
                {id:3, 'nome':'Lucas Veríssimo', 'usuario': 'lvgarcez', 'email':'lucas_verissimo@outlook.com'},
                {id:4, 'nome':'Lucas Veríssimo', 'usuario': 'lvgarcez', 'email':'lucas_verissimo@outlook.com'},
                {id:5, 'nome':'Lucas Veríssimo', 'usuario': 'lvgarcez', 'email':'lucas_verissimo@outlook.com'},
            ];

            setListaUsuarios(data);
        }

        carregarListaUsuarios();

    },[]);


    function cadastrarUsuario(){
        navigation.navigate('FormUsuarios');
    }

    function excluirUsuario(){
        alert("Exluir");
    }

    
    function editarUsuario(){
        alert("editar");
    }

    return (
        <Background>
            <Header name="Usuários" />
            <Container>
                <TitleHeader name="Usuários cadastrados" pressButtonFunc={cadastrarUsuario}>
                    <Icon name="user-plus" color="#fff" size={20}  />
                </TitleHeader>
                {listaUsuarios.map((value)=>{
                    return(
                        <AreaListaUsuarios key={value.id}>
                            <HeaderAreaListaUsuarios>
                                <NomeUsuario>{value.nome}</NomeUsuario>
                                <BtnAcoes>                                    
                                    <BtnExcluirUsuario onPress={()=> excluirUsuario()}>
                                        <Icon name="user-minus" color="#fff" size={15}  />
                                    </BtnExcluirUsuario>
                                    <BtnEditarUsuario onPress={()=> editarUsuario() }> 
                                        <Icon name="edit" color="#fff" size={15}  />
                                    </BtnEditarUsuario>
                                </BtnAcoes>
                            </HeaderAreaListaUsuarios>
                        </AreaListaUsuarios>
                    );
                })}
            </Container>
        </Background>
    );
}