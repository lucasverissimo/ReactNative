import React, {useContext, useState, useEffect} from 'react';
import { format, isBefore } from 'date-fns';
import { Alert, Platform, TouchableOpacity } from 'react-native';
import firebase from '../../services/firebaseConnection';
import { Background, Container, Nome, Saldo, Title, List, Area } from './styles';
import Header from '../../components/Header';
import DatePicker from '../../components/DatePicker';
import HistoricoList from '../../components/HistoricoList';
import { AuthContext } from '../../contexts/auth';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Home() {

 const { user } = useContext(AuthContext);
 const [historico, setHistorico] = useState([]);
 const [saldo, setSaldo] = useState('Carregando...');

 const [newDate, setNewDate] = useState(new Date());
 const [show, setShow] = useState(false);

 useEffect(() =>{
   
  async function loadList(){
    await firebase.auth().onAuthStateChanged( async function(user) {
      if(user){ 
        let uid = user.uid;
        await firebase.database().ref('users').child(uid).on('value', (snapshot) => {
          setSaldo(snapshot.val().saldo);
        });

        await firebase.database().ref('historico')
        .child(uid)
        .orderByChild('date').equalTo(format(newDate, 'dd/MM/yyyy'))       
        .limitToLast(10)
        .on('value', (snapshot) =>{
          setHistorico([]);
          snapshot.forEach((child) =>{
            let list = {
              key: child.key,
              tipo: child.val().tipo,
              nome: child.val().nome,
              valor: child.val().valor,
              date: child.val().date
            }
            setHistorico(oldArray => [...oldArray, list].reverse());
          });
        });
      }      
    });
  }

  loadList();

 }, [newDate]);

 function handleDelete(data){

  const [diaItem, mesItem, anoItem] = data.date.split('/');
  const dataItem = new Date(`${anoItem}/${mesItem}/${diaItem}`);
  console.log(dataItem);

  // pegando data de hoje
  const formatDataHoje = format(new Date(), 'dd/MM/yyyy');
  const [diaHoje, mesHoje, anoHoje] = formatDataHoje.split('/');  
  const dataHoje = new Date(`${anoHoje}/${mesHoje}/${diaHoje}`);
  console.log(dataHoje);
   
   //if(new Date(data.date) < new Date(format(new Date(), 'dd/MM/yy'))){
   if( isBefore(dataItem, dataHoje) ){
      Alert.alert('Erro', "Não é possivel excluir registros antigos!");
      return;
   }
   
   Alert.alert(
    "Cuidado!",
    'Você deseja excluir "'+data.nome+'"?',
    [
      { text: 'Cancelar', style: 'cancel'},
      { text: 'Continuar', onPress: () => handleDeleteSuccess(data)}
    ]
   );

 }

 async function handleDeleteSuccess(data){

  await firebase.auth().onAuthStateChanged( async function(user) {
    if(user){ 
      await firebase.database().ref('historico')
            .child(user.uid)
            .child(data.key)
            .remove()
            .then( async ()=>{

              let saldoAtual = saldo;
              data.tipo === 'despesa'? saldoAtual += parseFloat(data.valor) : saldoAtual -= parseFloat(data.valor);
              
              await firebase.database().ref('users').child(user.uid).child('saldo').set(saldoAtual)
              .catch((error)=>{
                console.log(error);
              });

            }).catch( (error) => {
              Alert.alert("Erro ao excluir", "Não foi possivel efetuar operação!");
              console.log(error);
            });
    }      
  });
    
 }

 function handleShowPicker(){
    setShow(true);
 }

 function handleClose(){
   setShow(false);
 }

 // datepicker: npm install @react-native-community/datetimepicker --save

 const onChangeDatePicker = (date) => {
   setShow(Platform.OS === 'ios');
   setNewDate(date);
   console.log(date);
 }

 return (   
   <Background>
     <Header/>
     <Container>
       <Nome>
        { user && user.nome }
       </Nome>

       {
         saldo === 'Carregando...'
         ?(<Saldo>Carregando...</Saldo>)
         :(<Saldo>R$ {saldo.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</Saldo>)
       }
       
     </Container>
     <Area>
        <TouchableOpacity onPress={() => handleShowPicker() }>
          <Icon name="event" color="#fff" size={30} />
        </TouchableOpacity>
        <Title>
          Ultimas movimentações
        </Title>
     </Area>
     <List 
      showsVerticalScrollIndicator={false}
      data={historico}
      keyExtractor={item => item.key}
      renderItem={({item})=>( <HistoricoList data={item} deleteItem={handleDelete} /> )}     
     />
     {show && (
       <DatePicker 
        onClose={ handleClose }
        date={newDate} 
        onChange={onChangeDatePicker}
       />
     )}
   </Background>
  );
}