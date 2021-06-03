import React, { useState } from 'react';
import { Container, Header } from './styles';
import { Text, Platform, TouchableOpacity } from 'react-native';
import DateTimerPicker from '@react-native-community/datetimepicker';


export default function DatePicker({date, onClose, onChange}) {

 const [dateNow, setDateNow] = useState(new Date(date));

 return (
   <Container>
       {Platform.OS === 'ios' && (
           <Header>
               <TouchableOpacity onPress={ onClose }>
                   <Text>Fechar</Text>
               </TouchableOpacity>
           </Header>
       )}
       <DateTimerPicker 
        value={dateNow}
        mode="date"
        display="compact"
        onChange={(event, date) => {
            const currentDate = date || dateNow;
            setDateNow(currentDate);
            onChange(currentDate);
        }}
        style={{ backgroundColor: 'white'}}
       />
   </Container>
  );
}