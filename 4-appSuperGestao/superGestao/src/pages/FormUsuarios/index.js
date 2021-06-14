import React, {useState, useContext, useEffect} from 'react';
import { Alert } from 'react-native';
import { Background, Container, TitlePage, SubTitlePage, RVI } from '../styles/homeStyle';
import { Input, SubmitButton, SubmitText } from '../styles/formUsuariosStyle';
import Header from '../../components/Header';

import { AuthContext } from '../../contexts/authContext';

import api from '../../services/api';

export default function FormUsuarios({route, navigation}) {

  

  const [ nome, setNome ] = useState('');
  const [ usuario, setUsuario ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ senha, setSenha ] = useState('');
  const [ confSenha, setConfSenha ] = useState('');
  const [ idUsuario, setIdUsuario ] = useState(null);
  const [ editUsuario, setEditUsuario ] = useState(false);
  const [ loadingInfo, setLoadingInfo ] = useState(true);

  const { user, setUser, setStorageData } = useContext(AuthContext);

  useEffect(()=>{

    if(route.params){
      if(route.params.idUsuario){        
        setIdUsuario(route.params.idUsuario);

        let data = {
          "action":"read",
          "id":route.params.idUsuario,
          "dadosLogin":{
              "email":user.email, 
              "senha":user.senha
          }
        }

        InitAPI(data, 'ler');

        setEditUsuario(true);
      }else{
        setLoadingInfo(false);
      }
    }else{
      setLoadingInfo(false);
    }

  },[]);


  async function InitAPI(data, action){
    try{
      await api.post('/users.php', data)
      .then(async (response)=>{
        setLoadingInfo(false);
        if(response.status === 200){
          var info = response.data;               
          if(typeof info.Erro === 'undefined'){

            switch(action){
              case 'cadastrar':
                  setNome('');
                  setUsuario('');
                  setEmail('');
                  setSenha('');
                  setConfSenha('');
                  Alert.alert("Sucesso", info.response);
                break;
              case 'editar':
                Alert.alert("Sucesso", info.response);

                if(user.id === idUsuario){
                  let newData = {};
                  if(typeof info.newpass === 'undefined'){
                    newData = {
                      nome: nome,
                      email: email,
                      usuario: usuario,
                      senha: user.senha,
                    }
                  }else{
                    newData = {
                      nome: nome,
                      email: email,
                      senha: info.newpass,
                      usuario: usuario,
                    }
                  }
                  setUser(newData);
                  await setStorageData("auth_user", newData);
                  setSenha('');
                  setConfSenha('');
                  
                }

                break;  
              case 'ler':
              
                setNome(info.nome);
                setUsuario(info.usuario);
                setEmail(info.email);
              
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
    

    if(nome.length < 3 || nome.length > 100){
      Alert.alert("Erro no campo nome", "Preencha o campo nome corretamente!");
      return;
    }else
    if(usuario.length < 5 || usuario.length > 30){
      Alert.alert("Erro no campo usuário", "Preencha o campo usuário corretamente!");      
      return;
    }else
    if(email.length < 8 || email.indexOf('@', 0) == -1 || email.indexOf('.', 0) == -1 ){
      Alert.alert("Erro no campo e-mail", "Preencha com um e-mail válido!");      
      return;
    }else{

      let dadosUser = {};

      if(editUsuario === false ){
        if(senha.length < 8 || senha.length > 16){
          Alert.alert("Erro no campo senha", "A senha deve possuir entre 8 e 16 caracteres!");      
          return;
        }else
        if(confSenha != senha){
          Alert.alert("Senhas incorretas", "As senhas digitadas não conferem!");      
          return;
        }

        dadosUser = {
          'nome': nome,
          'usuario': usuario,
          'email': email,
          'senha': senha,
        };

      }else{
        if(senha.length !== 0){
          if(senha.length < 8 || senha.length > 16){
            Alert.alert("Erro no campo senha", "A senha deve possuir entre 8 e 16 caracteres!");      
            return;
          }else
          if(confSenha != senha){
            Alert.alert("Senhas incorretas", "As senhas digitadas não conferem!");      
            return;
          }
          dadosUser = {
            'id':idUsuario,
            'nome': nome,
            'usuario': usuario,
            'email': email,
            'senha': senha,
          };
        }else{
          dadosUser = {
            'id':idUsuario,
            'nome': nome,
            'usuario': usuario,
            'email': email,
          };
        }
      }


      let data = {
        "action": editUsuario === false ? "new" : "update", 
        "dadosLogin":{
          "email":user.email, 
          "senha":user.senha
        },
        "user": dadosUser
      };

      setLoadingInfo(true);
      if(editUsuario === false){
        await InitAPI(data, 'cadastrar');
      }else{
        await InitAPI(data, 'editar');
      }

    }
    
  }  


 return (
   <Background>
       <Header noDrawer name="Cadastrar usuário"/>
       <Container>
          <TitlePage>{editUsuario === false ? 'Cadastrar usuário' : 'Editar usuário'}</TitlePage>
          <SubTitlePage>
            {editUsuario === false ? 'Preencha os campos abaixo:' : 'Altere os campos abaixo:'}            
          </SubTitlePage>
          
          <Input 
            placeholder="Nome: "
            value={nome}
            onChangeText={(value) => setNome(value)}
          />
          

          <Input 
            placeholder="Usuário: "
            value={usuario}
            onChangeText={(value) => setUsuario(value)}
          />

          <Input 
            placeholder="E-mail: "
            value={email}
            onChangeText={(value) => setEmail(value)}
          />

          <Input 
            placeholder="Senha: "
            autoCapitaliza="none" 
            value={senha}
            onChangeText={(value) => setSenha(value)}
            secureTextEntry={true}
          />

          <Input 
            placeholder="Confirmar senha: "
            autoCapitaliza="none" 
            value={confSenha}
            onChangeText={(value) => setConfSenha(value)}
            secureTextEntry={true}
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