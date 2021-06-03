import React, { useState, useContext } from 'react';
import { Platform, ActivityIndicator } from 'react-native';
import { Background, Container, AreaInput, Input, SubmitButton, SubmitText } from '../SignIn/styles';
import { AuthContext } from '../../contexts/auth';

export default function SignIn() {

  const [ email, setEmail ] = useState('');
  const [ pass, setPass ] = useState('');
  const [ nome, setName ] = useState('');

  const { signUp, loadingAuth } = useContext(AuthContext);

  function handleSignUp(){
    signUp(email, pass, nome);
  }

 return (
   <Background>
       <Container
        behavior={Platform.OS === 'ios' ? 'padding' : ''} 
        enabled
       >         

         <AreaInput>
          <Input 
            placeholder="Nome"
            autoCorrect={false}
            autoCapitalize="none"
            value={nome}
            onChangeText={(value)=>setName(value)}
          />
         </AreaInput>

         <AreaInput>
          <Input 
            placeholder="E-mail"
            autoCorrect={false}
            autoCapitalize="none"
            value={email}
            onChangeText={(value)=>setEmail(value)}
          />
         </AreaInput>

         <AreaInput>
          <Input 
            placeholder="Senha"
            autoCorrect={false}
            autoCapitalize="none"
            value={pass}
            onChangeText={(value)=>setPass(value)}
            secureTextEntry={true}
          />
         </AreaInput>

         <SubmitButton onPress={handleSignUp}>
         {
             loadingAuth 
             ? ( <ActivityIndicator size={20} color="#fff"></ActivityIndicator>)
             : (<SubmitText>Cadastrar</SubmitText>)
           } 
         </SubmitButton>
         

       </Container>
   </Background>
  );
}