import React, {useState, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation'

export default function MinhaLocalidade() {

 const [region, setRegion] = useState(null);
 console.log(region);


 useEffect(()=>{

    function mapaCarregado(){    
        Geolocation.getCurrentPosition(
            position => {          
                let positionMap = {
                latitude: position.coords.latitude, 
                longitude: position.coords.longitude, 
                latitudeDelta: 0.0008, 
                longitudeDelta:0.0008
                };
                
                setRegion(positionMap);
            },
            error => Alert.alert('Error', JSON.stringify(error)),
            {enableHighAccuracy: true, timeout: 1000, maximumAge: 1000},
        ); 
        Geolocation.watchPosition(position => {
            
            let positionMap = {
                latitude: position.coords.latitude, 
                longitude: position.coords.longitude, 
                latitudeDelta: 0.0008, 
                longitudeDelta:0.0008
            };
                
            setRegion(positionMap);
            
        });  
    }

    mapaCarregado();

 }, []);
 
 

 return (
   <View style={style.container}>
       {region != null && (
           <MapView
                mapType="standard"
                region={region}
                style={style.map}
                mapType="standard"
                zoomControlEnabled={true}
                zoomEnabled={true}
                showsUserLocation={true}
                loadingEnabled={true}
                minZoomLevel={18}
            ></MapView>
       )}
       
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
  });