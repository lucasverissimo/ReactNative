import React, { useContext, useState } from 'react';
import firebase from '../../services/firebaseConnection';
import { SafeAreaView, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import { Background, Nome, Input, SubmitButton, SubmitText  } from './styles';
import { AuthContext } from '../../contexts/auth';
import Header from '../../components/Header';
import PickerSelect from '../../components/Picker';

export default function New() {

 const navigation = useNavigation();

 const [nome, setNome] = useState('');
 const [valor, setValor] = useState('');
 const [tipo, setTipo] = useState(null);
 const { user, signOut } = useContext(AuthContext);
  

 function handleSubmit(){
    console.log(nome, valor, tipo);
     Keyboard.dismiss();
     if(nome.length < 3){
         Alert.alert(
             'Erro',
             'Preencha o campo nome!'
         );        
        return;
     }else
     if(isNaN(parseFloat(valor))){
        Alert.alert(
            'Erro',
            'Preencha o campo valor corretamente!'
        );
        return;
     }else
     if(tipo === null){
        Alert.alert(
            'Erro',
            'Selecione um tipo de movimentação!'
        );
        return;
     }else{
        Alert.alert(
            'Confirmando dados',
            `Nome: ${nome}\nValor: ${parseFloat(valor)}\nTipo: ${tipo}`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Continuar',
                    onPress: () => handleAdd()
                }
            ]
        );
     }     
 }

 // formatar datas: npm install date-fns --save
  async function handleAdd(){
    
    await firebase.auth().onAuthStateChanged( async function(user) {
        if (user) {          
          let uid = user.uid;
          let key = await firebase.database().ref('historico').child(uid).push().key;
          await firebase.database().ref('historico').child(uid).child(key).set({
              nome: nome,
              tipo: tipo,
              valor: parseFloat(valor),
              date: format(new Date(), 'dd/MM/yyyy')
          }).then(async (value) =>{
              let user = firebase.database().ref('users').child(uid);
              await user.once('value').then((snapshot) =>{
                  let saldo = parseFloat(snapshot.val().saldo);
                  if(tipo === 'despesa'){
                      saldo -= parseFloat(valor);
                  }else{
                      saldo +=parseFloat(valor);
                  }
                  user.child('saldo').set(saldo);
              });
              setNome('');
              setValor('');
              setTipo(null);
  
              Alert.alert(
                  'Sucesso',
                  'Item adicionado!'
              );
  
              Keyboard.dismiss();
  
              navigation.navigate('Home');
  
          }).catch((error) => {
              Alert.alert(
                  'Erro',
                  'Erro ao cadastrar!\nErro: '+error
              );
          });

        }
    });
 }

 // picker select: npm install react-native-picker-select
 return (
     <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Background>
            <Header />
            <SafeAreaView>
                <Nome>Registrar Movimentação</Nome>
                <Input 
                    placeholder="Nome da movimentação: " 
                    returnKeyType="next"
                    onSubmitEditing={() => Keyboard.dismiss()}
                    valor={nome}
                    onChangeText={(value) => setNome(value)}                
                />
                <Input 
                    placeholder="Valor: "
                    keyboardType="numeric"
                    returnKeyType="next"
                    onSubmitEditing={() => Keyboard.dismiss()}
                    valor={valor}
                    onChangeText={(value) => setValor(value)}                
                />
                <PickerSelect onChange={setTipo} tipo={tipo} />
                <SubmitButton onPress={handleSubmit}>
                    <SubmitText>Registrar</SubmitText>
                </SubmitButton>
            </SafeAreaView>        
        </Background>
    </TouchableWithoutFeedback>
  );
}