import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MarkerPersonalizado from './src/components/MarkerPersonalizado';
import Geolocation from '@react-native-community/geolocation';

export default function App() {
  const [region, setRegion] = useState(null);
  /*{
    latitude: -23.427250, 
    longitude: -46.345639, 
    latitudeDelta: 0.002, 
    longitudeDelta: 0.002
  }*/

  const[region1, setRegion1] = useState({
    latitude: -23.427250, 
    longitude: -46.345639, 
    latitudeDelta: 0.002, 
    longitudeDelta: 0.002
  });

  
  const[region2, setRegion2] = useState({
    latitude: -23.426552, 
    longitude: -46.351473, 
    latitudeDelta: 0.002, 
    longitudeDelta: 0.002
  });

  
  const[region3, setRegion3] = useState({
    latitude: -23.427250, 
    longitude: -46.351473, 
    latitudeDelta: 0.002, 
    longitudeDelta: 0.002
  });

  const[multipleRegions, setMultipleRegions] = useState([
    {
      key: 0,
      latitude: -23.427250, 
      longitude: -46.345639, 
      latitudeDelta: 0.002, 
      longitudeDelta: 0.002,
      image: require('./assets/images/carro.png'),
    },
    {
      key: 1,
      latitude: -23.426552, 
      longitude: -46.351473, 
      latitudeDelta: 0.002, 
      longitudeDelta: 0.002,
      image: require('./assets/images/carro.png'),
    },
    {
      key: 2,
      latitude: -23.427250, 
      longitude: -46.351473, 
      latitudeDelta: 0.002, 
      longitudeDelta: 0.002,
      image: require('./assets/images/carro.png'),
    },
  ])

  function mudouMapa(region) {}

  function minhaLocalizacao(){
      Geolocation.getCurrentPosition(
        (position) => {
          setRegion({
            latitude: position.coords.latitude, 
            longitude: position.coords.latitude, 
            latitudeDelta: 10, 
            longitudeDelta:10
          });
          
        },
        error => Alert.alert('Error', JSON.stringify(error)),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
     /* this.watchID = Geolocation.watchPosition(position => {
        const lastPosition = JSON.stringify(position);
       // console.log(lastPosition);
      });*/

      console.log(region);
      setRegion({
        latitude: -23.427250, 
        longitude: -46.345639, 
        latitudeDelta: 0.002, 
        longitudeDelta: 0.002
      });
      console.log(region);
  }

  function clicouMapa(e){
    
    let coordinates = e.nativeEvent.coordinate;
    let arr = [
      ...multipleRegions,
      {
        key: multipleRegions.length,
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        latitudeDelta: 0.002, 
        longitudeDelta:0.002,
        image: require('./assets/images/carro.png'),
      }
    ];
    setMultipleRegions(arr);

  }

 return (
   <View style={style.container}>
     <View style={style.viewButton}>
        <TouchableOpacity style={style.button} onPress={() => setRegion(region1)}>
          <Text style={style.buttonText}>Casa</Text>
        </TouchableOpacity>

        <TouchableOpacity style={style.button} onPress={() => setRegion(region2)}>
          <Text style={style.buttonText}>Amigos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={style.button} onPress={() => setRegion(region3)}>
          <Text style={style.buttonText}>Random</Text>
        </TouchableOpacity> 
        
     </View>
     <MapView
       /* initialRegion={{latitude: -23.427250, longitude: -46.345639, latitudeDelta: 0.0922, longitudeDelta: 0.0421}}*/
        style={style.map}
        mapType="standard"    
        //scrollEnabled={false}     // desativa o scroll do mapa
        //zoomEnabled={false} // desativa / ativa zoom (ao clicar)
        //zoomControlEnabled={false} 
        //rotateEnabled={true}    
        //showsTraffic={true}  // exibe a intensidade do trafego na via
        region={region} 
        onMapReady={ () => { minhaLocalizacao(); }}
        onRegionChangeComplete={ (region) => mudouMapa(region) }
        onPress={(value) => clicouMapa(value)}
     >       
       {multipleRegions.map((value)=>{
         return(
            <Marker 
              key={value.key} 
              coordinate={{latitude:value.latitude, longitude: value.longitude, latitudeDelta: 0.002, longitudeDelta: 0.002}}
              // image={value.image}
            >
              <MarkerPersonalizado />
            </Marker>
         );
       })}
     </MapView>
   </View>
  );
}

const style = StyleSheet.create({
  container:{
    flex: 1, justifyContent: 'center', alignItems: 'center'
  },
  map:{
    height: '90%', width: '100%'
  },
  viewButton:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
    padding: 15,
    backgroundColor: '#00aaff',
    borderRadius: 4,
    margin: 5,
  },
  buttonText:{
    fontSize: 16,
    color: '#fff'
  },
});