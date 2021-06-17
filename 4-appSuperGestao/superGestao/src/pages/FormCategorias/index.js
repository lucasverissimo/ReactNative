import React, {useState, useContext, useEffect} from 'react';
import { Alert } from 'react-native';
import { Background, Container, TitlePage, SubTitlePage } from '../styles/homeStyle';
import { Input, SubmitButton, SubmitText } from '../styles/formUsuariosStyle';
import Header from '../../components/Header';

import { AuthContext } from '../../contexts/authContext';

import api from '../../services/api';

export default function FormCategorias() {

  

  const [ nome, setNome ] = useState('');
  const [ editUsuario, setEditUsuario ] = useState(false);
  const [ loadingInfo, setLoadingInfo ] = useState(false);

  const { user, setUser, setStorageData } = useContext(AuthContext);
 

  useEffect(()=>{

  },[]);


  async function InitAPI(data, action){
    try{
        await api.post('/categorias.php', data)
        .then(async (response)=>{
          setLoadingInfo(false);
          if(response.status === 200){
            var info = response.data;               
            if(typeof info.Erro === 'undefined'){
                console.log(info);
  
              switch(action){
                case 'cadastrar':
                    setNome('');
                    Alert.alert("Sucesso", info.response);
                  break;
                case 'editar':
                  Alert.alert("Sucesso", info.response);

                  break;  
                case 'ler':                
                  setNome(info.nome);                
                  break;  
              }
               
            }else{              
              Alert.alert("Erro", info.Erro); 
              return;
            }
          }else{
            Alert.alert("Erro ao fazer requisição", "Erro ao realizar requisição com o servidor, por favor tente mais tarde."); 
          }
        }).catch((error)=>{
          setLoadingInfo(false);
          alert("Erro ao realizar solicitação!");
          console.log(error);
        });
      }catch(e){
        setLoadingInfo(false);
        Alert.alert("Erro ao acessar API!", "Tente novamente mais tarde!");
        console.log(e);
      }
  }
  

  async function ActionForm(){
    
    if(nome.length < 5){
        Alert.alert("Erro", "Preencha o campo nome!");
        return;
    }else{

        let data = {
            "action": editUsuario === false ? "new" : "update", 
            "dadosLogin":{
              "email":user.email, 
              "senha":user.senha
            },
            "categoria":  {
                "nome":nome
            }
          };


         await InitAPI(data, "cadastrar");

    }

  }  


 return (
   <Background>
       <Header noDrawer name={editUsuario === false ? 'Cadastrar categoria' : 'Editar categoria'}/>
       <Container>
          <TitlePage>{editUsuario === false ? 'Cadastrar categoria' : 'Editar categoria'}</TitlePage>
          <SubTitlePage>
            {editUsuario === false ? 'Preencha os campos abaixo:' : 'Altere os campos abaixo:'}            
          </SubTitlePage>
          
          <Input 
            placeholder="Nome: "
            value={nome}
            onChangeText={(value) => setNome(value)}
          />


          {loadingInfo === true ? (
            <SubTitlePage>
              Aguarde...
            </SubTitlePage>
          ) : (
            <SubmitButton onPress={()=>ActionForm()}>
              <SubmitText>
                {editUsuario === false ? 'Cadastrar' : 'Salvar alterações'}
              </SubmitText>
            </SubmitButton>
          )}
          
       </Container>
   </Background>
  );
}