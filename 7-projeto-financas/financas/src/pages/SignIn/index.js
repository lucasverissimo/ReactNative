import React, { useState, useContext } from 'react';
import { Platform, ActivityIndicator } from 'react-native';
import { Background, Container, Logo, AreaInput, Input, SubmitButton, SubmitText, Link, LinkText } from './styles';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth';

export default function SignIn() {

  const navigation = useNavigation();

  const [ email, setEmail ] = useState('');
  const [ pass, setPass ] = useState('');
  const { signIn, loadingAuth } = useContext(AuthContext);

function handlerLogin(){
  if(email.length == 0 || pass.length == 0){
    alert("Preencha os campos de e-mail e senha!");
  }else{
    signIn(email, pass);
  }
}

 return (
   <Background>
       <Container
        behavior={Platform.OS === 'ios' ? 'padding' : ''} 
        enabled
       >
         <Logo source={require('../../assets/Logo.png')} />

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

         <SubmitButton onPress={handlerLogin}>
           {
             loadingAuth 
             ? ( <ActivityIndicator size={20} color="#fff"></ActivityIndicator>)
             : (<SubmitText>Acessar</SubmitText>)
           }           
         </SubmitButton>
         
         <Link onPress={() => navigation.navigate('SignUp')}>
          <LinkText>
            Criar uma conta!
          </LinkText>
         </Link>

       </Container>
   </Background>
  );
}