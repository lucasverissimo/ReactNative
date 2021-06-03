import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MarkerPersonalizado({props}) {
 return (
    <View style={[style.viewMarker, {backgroundColor:'#ff0000',}]}>
        <Text style={style.textMarker}> Olá</Text>
    </View>
  );
}


const style = StyleSheet.create({
viewMarker:{
    width: 40,
    height: 40,
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 40
},
textMarker:{
    color: '#fff',
    textAlign: 'center'
}
});