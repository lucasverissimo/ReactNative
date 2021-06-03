import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { PickerView } from './styles';

export default function PickerSelect({ onChange, tipo }){
    return(
        <PickerView>
           <Picker 
            style={{
                width: '100%'
            }}
            selectedValue={tipo}
            onValueChange={ (value) => onChange(value) }>
                <Picker.Item label="-- Selecione um tipo" value={null} />
                <Picker.Item label="Receita" value="receita" />
                <Picker.Item label="Despesa" value="despesa" />
            </Picker>
        </PickerView>
    );
}