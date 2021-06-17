import React, { useState, useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Background, Container, ButtonHeaderTitle, TextButtonHT } from '../styles/homeStyle';
import { 
    AreaListaUsuarios, HeaderAreaListaUsuarios, NomeUsuario, BtnAcoes, BtnEditarUsuario, 
    BtnExcluirUsuario } from '../styles/usuariosStyle';
import TitleHeader from '../../components/TitleHeader';

import api from '../../services/api';

import Header from '../../components/Header';
import Icon from 'react-native-vector-icons/Feather';
import { Alert, View, ActivityIndicator } from 'react-native';

import { AuthContext } from '../../contexts/authContext';


export default function Usuarios() {
    
    const [ listaUsuarios, setListaUsuarios ] = useState([]);
    const [ isLoading, setIsloading ] = useState(true);
    const navigation = useNavigation();

    const { user } = useContext(AuthContext);    

    useEffect(()=>{
        
        async function carregarListaUsuarios(){
            recarregarLista();
        }
        
        carregarListaUsuarios();

    },[]);

    async function initAPI(data){
        setListaUsuarios([]);
        setIsloading(true);
        try{
            

            await api.post('/users.php', data)
            .then((response)=>{

                if(response.status === 200){
                    let info = response.data;                        
                    if(typeof info.Erro === 'undefined'){
                        if(data.action === "list"){                        
                            setListaUsuarios(info);
                        }else{
                            recarregarLista();
                        }
                    }else{
                        Alert.alert("Erro", info.Erro);      
                        setListaUsuarios([]);
                    }
                    setIsloading(false);
                }else{
                    console.log(response.status);
                    setIsloading(false);
                    setListaUsuarios([]);
                }

            }).catch((error)=>{
                Alert.alert("Erro", "Erro ao contactar servidor, por favor tente mais tarde!");
                console.log(error);
                setIsloading(false);
                setListaUsuarios([]);
            });               

        }catch(e){
            Alert.alert("Erro", "Erro ao realizar consulta, por favor verifique o log de erros!");
            console.log(e);
            setIsloading(false);
        }
        setIsloading(false);
    }


    async function recarregarLista(){
        
        let data = {
            "action":"list",
            "dadosLogin":{
                "email":user.email, 
                "senha":user.senha
            }
        }

        initAPI(data);
        
    }

    async function handleDel(id){ 
        let data = {
            "action":"delete",
            "id":id,
            "dadosLogin":{
                "email":user.email, 
                "senha":user.senha
            }
        }
        initAPI(data);
    }

    function excluirUsuario(id, nomeUsuario){
        if(listaUsuarios.length < 2){
            Alert.alert("Não é possível deletar usuário", "É necessário ter cadastrado ao menos dois usuários no sistema para realizar exclusão!");
            return;
        }else{

            if(id === user.id){
                Alert.alert(
                    "Erro!",
                    'Você não pode excluir seus próprio usuário!',
                    [
                        { text: 'Cancelar', style: 'cancel'},
                    ]
                );
                return;
            }

            Alert.alert(
                "Alerta de exclusão!",
                'Você deseja excluir este usuário?\nUsuário a ser excluido: '+nomeUsuario,
                [
                    { text: 'Cancelar', style: 'cancel'},
                    { text: 'Continuar', onPress: () => handleDel(id)}
                ]
            );
        }
    }
    
    function editarUsuario(id){
        navigation.navigate('FormUsuarios', { idUsuario: id});
    }

    function cadastrarUsuario(){
        navigation.navigate('FormUsuarios');
    }

    return (
        <Background>
            <Header name="Usuários" />
            <Container>
                <TitleHeader name="Usuários cadastrados">
                    <ButtonHeaderTitle onPress={()=>cadastrarUsuario()}>
                        <TextButtonHT>
                            <Icon name="user-plus" color="#fff" size={20}  />                    
                        </TextButtonHT>
                    </ButtonHeaderTitle>
                    <ButtonHeaderTitle onPress={()=>recarregarLista()}>
                        <TextButtonHT>
                            <Icon name="refresh-cw" color="#fff" size={20}  />
                        </TextButtonHT>
                    </ButtonHeaderTitle>                    
                </TitleHeader>
                {isLoading ? (
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <ActivityIndicator size={30} color="#02a343" />
                    </View>
                ) : 
                    listaUsuarios.map((value)=>{
                        return(
                            <AreaListaUsuarios key={value.id}>
                                <HeaderAreaListaUsuarios>
                                    <NomeUsuario>{value.nome}</NomeUsuario>
                                    <BtnAcoes>                                    
                                        <BtnExcluirUsuario onPress={()=> excluirUsuario(value.id, value.nome)}>
                                            <Icon name="user-minus" color="#fff" size={15}  />
                                        </BtnExcluirUsuario>
                                        <BtnEditarUsuario onPress={()=> editarUsuario(value.id) }> 
                                            <Icon name="edit" color="#fff" size={15}  />
                                        </BtnEditarUsuario>
                                    </BtnAcoes>
                                </HeaderAreaListaUsuarios>
                            </AreaListaUsuarios>
                        );
                    })
                }
            </Container>
        </Background>
    );
}