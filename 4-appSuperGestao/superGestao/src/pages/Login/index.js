import React, {useState, useContext} from 'react';
import { ActivityIndicator } from 'react-native';
import { Container, Center, Logo, ContainerInputs, Input, SubmitButton, SubmitText } from '../styles/loginStyle';
import { AuthContext } from '../../contexts/authContext';

export default function Login() {

    const [email, setEmail] = useState('lucas_verissimo@outlook.com');
    const [senha, setSenha] = useState('lucas123');

    const { signIn, loadingBtnLogin } = useContext(AuthContext);

    function login(){
        signIn(email, senha);
    };
    return (
        <Container>
            <Center>
                <Logo source={require('../../assets/simple-logo.png')} />
                <ContainerInputs>
                    <Input 
                        placeholder="E-mail: " 
                        autoCapitaliza="none" 
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
                </ContainerInputs>
                <SubmitButton onPress={() => login()} disabled={loadingBtnLogin}>
                    {
                        loadingBtnLogin == false
                        ? (<SubmitText>Entrar</SubmitText>)
                        : (<ActivityIndicator size={20} color="#fff" />)
                    }                    
                </SubmitButton>
            </Center>
        </Container>
    );
}