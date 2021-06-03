import React, { useState } from 'react';
import 'react-native-gesture-handler';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

export function Cadastro(props) {
  const [ email, setEmail ] = useState(props.email);
  const [ senha, setSenha ] = useState(props.senha);

  function cadastrar(){
    console.log(email, senha);
  }

 return (
    <View style={style.container}>
        <Text style={style.title}>Cadastrar</Text>

        <TextInput 
          placeholder="E-mail"
          value={email}
          onChangeText={(value) => setEmail(value)}
          style={style.campoText}
        />
        
        <TextInput 
          placeholder="Senha"
          value={senha}
          onChangeText={(value) => setSenha(value)}
          style={style.campoText}
        />
        <TouchableOpacity onPress={()=>{ cadastrar(); }} style={style.btn}>
          <Text style={style.textBtn}>Cadastrar</Text>
        </TouchableOpacity>
    </View>
  );
}



const style = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding:5,
  },
  title:{
    fontSize: 22,
    fontWeight: 'bold',
    margin: 20,    
  },
  campoText:{
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    borderColor: '#ddd',
    color: '#000',
    borderWidth: 1,
    margin: 5,
    width: '100%',
    height: 40,
  },
  btn:{
    margin: 5,
    backgroundColor: '#f00',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  textBtn:{
    color: '#fff',
  },
});

const mapStateToProps = (state) => {
  return {
    email: state.auth.email,
    senha: state.auth.senha,
  }
}

const CadastroConnect = connect(mapStateToProps)(Cadastro);
export default CadastroConnect;