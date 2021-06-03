import React, {useState, useContext} from 'react';
import { Alert } from 'react-native';
import { Background, Container, TitlePage, SubTitlePage, RVI } from '../styles/homeStyle';
import { Input, SubmitButton, SubmitText } from '../styles/formUsuariosStyle';
import Header from '../../components/Header';

import { AuthContext } from '../../contexts/authContext';

import api from '../../services/api';

export default function styles() {

  const [ nome, setNome ] = useState('');
  const [ usuario, setUsuario ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ senha, setSenha ] = useState('');
  const [ confSenha, setConfSenha ] = useState('');

  const { user } = useContext(AuthContext);
  

  async function CadastrarUsuario(){
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
    }else
    if(senha.length < 8 || senha.length > 16){
      Alert.alert("Erro no campo senha", "A senha deve possuir entre 8 e 16 caracteres!");      
      return;
    }else
    if(confSenha != senha){
      Alert.alert("Senhas incorretas", "As senhas digitadas não conferem!");      
      return;
    }else{
      let data = {
        "action":"new", 
        "dadosLogin":{
          "email":user.email, 
          "senha":user.senha
        },
        "user":{
          'nome': nome,
          'usuario': usuario,
          'email': email,
          'senha': senha,
        }
      };

      try{
        response = await api.post('/users.php', data)
        .then((response)=>{
          if(response.status === 200){
            var info = response.data;    
            console.log(info);        
            if(typeof info.Erro === 'undefined'){
              setNome('');
              setUsuario('');
              setEmail('');
              setSenha('');
              setConfSenha('');
              Alert.alert("Sucesso", info.response); 
            }else{              
              Alert.alert("Erro", info.Erro); 
              return;
            }
          }else{
            Alert.alert("Erro ao fazer requisição", "Erro ao realizar requisição com o servidor, por favor tente mais tarde."); 
          }
        }).catch((error)=>{
          alert("Erro ao realizar solicitação!");
          console.log(error);
        });
      }catch(e){

      }

    }
    
  }

 return (
   <Background>
       <Header noDrawer name="Cadastrar usuário"/>
       <Container>
          <TitlePage>Cadastrar usuário</TitlePage>
          <SubTitlePage>Preencha os campos abaixo:</SubTitlePage>
          
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

          <SubmitButton onPress={()=>CadastrarUsuario()}>
            <SubmitText>Cadastrar Usuário</SubmitText>
          </SubmitButton>
       </Container>
   </Background>
  );
}