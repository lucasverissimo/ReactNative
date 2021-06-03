import React, {useState, useRef, useEffect} from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
import { getPixel } from './src/utils/utils';

export default function MDirections() {
    

 const [region, setRegion] = useState(null);
 const [destino, setDestino] = useState(null);
 const mapView = useRef(null); 


 useEffect(()=>{

    function mapaCarregado(){    
        Geolocation.getCurrentPosition(
            position => {          
                let positionMap = {
                latitude: position.coords.latitude, 
                longitude: position.coords.longitude, 
                latitudeDelta: 0.008, 
                longitudeDelta:0.008
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
                latitudeDelta: 0.008, 
                longitudeDelta:0.008
            };
                
            setRegion(positionMap);
            console.log(positionMap);
            
        });  
    }

    mapaCarregado();

 }, []);

 function inserindoDestino(lat, long){
    
    let rotaDestino = {
        latitude: lat, 
        longitude: long, 
        latitudeDelta: 0.008, 
        longitudeDelta:0.008
    };

   setDestino(rotaDestino);
  // console.log(rotaDestino);
 }
 

 return (
   <View style={style.container}>
       {region != null && (
           <MapView
                ref={mapView}
                provider={PROVIDER_GOOGLE}
                mapType="standard"
                region={region}
                style={style.map}
                mapType="standard"
                zoomTapEnabled={true}
                zoomEnabled={true}
                showsUserLocation
                showsMyLocationButton
                zoomControlEnabled
                loadingEnabled={true}
                minZoomLevel={18}
                followsUserLocation={true}  
                maxZoomLevel={20}
                minZoomLevel={0}
            >
                {destino && (
                    <MapViewDirections 
                        origin={region}
                        destination={destino}
                        apikey="AIzaSyCV2AMtwlimj7yDgMazeTktWkQTgPAPXYQ" 
                        strokeWidth={5}
                        strokeColor="#f00"
                        onReady={result => {                            
                          
                          //console.log(result.coordinates);
                          mapView.current.fitToCoordinates(result.coordinates,{
                            edgePadding:{
                                top: getPixel(50),
                                bottom: getPixel(50),
                                left: getPixel(50),
                                right: getPixel(50),
                            }
                          });
                          
                        }}
                    />
                )}
            </MapView>
       )}
       <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={style.box}>
           <View style={style.localView}>
               <TouchableOpacity style={style.localBtn} onPress={()=>inserindoDestino(-23.483084, -46.353398)}>
                   <Text style={style.txtBtn}>Burguer King Itaquaquecetuba</Text>
               </TouchableOpacity>               
           </View>
           
           <View style={style.localView}>
               <TouchableOpacity style={style.localBtn} onPress={()=>inserindoDestino(-23.500960, -46.357474)}>
                   <Text style={style.txtBtn}>Amor</Text>
               </TouchableOpacity>               
           </View>
           
           <View style={style.localView}>
               <TouchableOpacity style={style.localBtn} onPress={()=>inserindoDestino(-23.475103, -46.351405)}>
                   <Text style={style.txtBtn}>Centro</Text>
               </TouchableOpacity>               
           </View>
                      
           <View style={style.localView}>
               <TouchableOpacity style={style.localBtn} onPress={()=>inserindoDestino(-23.426345, -46.344486)}>
                   <Text style={style.txtBtn}>Padaria</Text>
               </TouchableOpacity>               
           </View>         
           
           <View style={style.localView}>
               <TouchableOpacity style={style.localBtn} onPress={()=>inserindoDestino(-23.420975, -46.350034)}>
                   <Text style={style.txtBtn}>Mamãe supermercado</Text>
               </TouchableOpacity>               
           </View>
       </ScrollView>
   </View>
  );
}

const style = StyleSheet.create({
    container:{
      flex: 1, justifyContent: 'center', alignItems: 'center'
    },
    map:{
      height: '100%', width: '100%'
    },
    box:{
        position: 'absolute',
        top: 30,
        left: 0,
        margin: 10,
        height: 70,
    },
    localView:{
        height: 40,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    localBtn:{
        backgroundColor: '#f00',
        height: 40,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtBtn:{
        color: '#fff'
    },
  });