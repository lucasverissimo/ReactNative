import React, { useEffect, useState, useContext } from 'react';
import { Alert } from 'react-native';
import { Background, Container, ContainerLista, ButtonHeaderTitle, TextButtonHT, SubTitlePage } from '../styles/homeStyle';

import { useNavigation } from '@react-navigation/native';

import Header from '../../components/Header';
import TitleHeader from '../../components/TitleHeader';
import Categoria from '../../components/Categoria';
import Icon from 'react-native-vector-icons/Feather';

import { AuthContext } from '../../contexts/authContext';

import api from '../../services/api';

export default function Categorias() {

    const [ listaCategorias, setListaCategorias ] = useState([]);

    const [ isLoading, setIsloading ] = useState(true);

    const navigation = useNavigation();
    const { user } = useContext(AuthContext);

    useEffect(()=>{

        carregarLista();
    }, []);

    async function InitAPI(data){
        setListaCategorias([]);
        setIsloading(true);
        try{
            

            await api.post('/categorias.php', data)
            .then((response)=>{

                if(response.status === 200){
                    let info = response.data;                        
                    if(typeof info.Erro === 'undefined'){
                        if(data.action === "list"){                        
                            setListaCategorias(info);
                        }else{
                            recarregarLista();
                        }
                    }else{
                        Alert.alert("Erro", info.Erro);      
                        setListaCategorias([]);
                    }
                    setIsloading(false);
                }else{
                    console.log(response.status);
                    setIsloading(false);
                    setListaCategorias([]);
                }

            }).catch((error)=>{
                Alert.alert("Erro", "Erro ao contactar servidor, por favor tente mais tarde!");
                console.log(error);
                setIsloading(false);
                setListaCategorias([]);
            });               

        }catch(e){
            Alert.alert("Erro", "Erro ao realizar consulta, por favor verifique o log de erros!");
            console.log(e);
            setIsloading(false);
        }
        setIsloading(false);
    }

    function carregarLista(){
        setIsloading(true);
        setListaCategorias([]);
        let data = {
            "action":"list",
            "dadosLogin":{
                "email":user.email, 
                "senha":user.senha
            }
        }

        InitAPI(data);
    }


    function deletar( id ){
        alert("Deletou "+id);
    }

    function editar( id ){
        alert("Editou "+id);
    }

 return (
   <Background>
       <Header name="Categorias" />
       <Container>

       <TitleHeader name="Lista de cadastrados">
            <ButtonHeaderTitle onPress={()=>navigation.navigate("FormCategorias")}>
                <TextButtonHT>
                    <Icon name="user-plus" color="#fff" size={20}  />                    
                </TextButtonHT>
            </ButtonHeaderTitle>
            <ButtonHeaderTitle onPress={()=>carregarLista()}>
                <TextButtonHT>
                    <Icon name="refresh-cw" color="#fff" size={20}  />
                </TextButtonHT>
            </ButtonHeaderTitle>                    
        </TitleHeader>

        {isLoading === true ? (
            <ContainerLista>
                <SubTitlePage>Carregando...</SubTitlePage>
            </ContainerLista>
        ) : (
            <ContainerLista>
                {listaCategorias.map(item => {
                    return(
                        <Categoria data={item} deletar={deletar} editar={editar} />
                    )
                })}
            </ContainerLista>
        )}
        
        

       </Container>
   </Background>
  );
}