import React, { useRef, useEffect } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../slices/navSlice';
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from '@env';
export default function Map() {

    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const mapRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(!origin || !destination){
            return;
        }

        console.log('has origin and destination');
        // zoom and fit to markers
        setTimeout(function(){
            console.log("fit window");
            mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
                edgePadding:{top: 90, right: 50, left: 50, bottom: 25},
            });
        }, 1000)
        

    }, [origin, destination])


    useEffect(()=>{

        if(!origin || !destination) return;

        const getTravelTime = async() => {
            fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?
            units=imperial&origins=${origin.description}&destinations=${destination.description}
            &key=${GOOGLE_MAPS_APIKEY}`)
            .then((res)=> res.json())
            .then(data =>{                
                dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
            });
        }
 
        getTravelTime();

    },[origin, destination, GOOGLE_MAPS_APIKEY]);

    
    return (
        <MapView
            style={tw`flex-1`}
            ref={mapRef}           
            region={{
                latitude: origin.location.lat,
                longitude: origin.location.lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
            onMapReady={()=>{ console.log("Mapa carregado");}}
            onMapLoaded={()=>{ console.log("Mapa pronto"); }}
            mapType="standard"
            zoomControlEnabled={true}
            zoomEnabled={true}
            //showsUserLocation={true}
            loadingEnabled={true}
        >
            {origin && destination && (
                <MapViewDirections 
                    origin={origin.description}
                    destination={destination.description}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeColor="black"
                    strokeWidth={3}
                />
            )}

            {origin?.location &&(
                <Marker 
                    coordinate={{
                        latitude: origin.location.lat,
                        longitude: origin.location.lng,
                    }}
                    title="Origin"
                    description={origin.description}
                    identifier="origin"
                />
            )}

            {destination?.location &&(
                <Marker 
                    coordinate={{
                        latitude: destination.location.lat,
                        longitude: destination.location.lng,
                    }}
                    title="Destination"
                    description={destination.description}
                    identifier="destination"
                />
            )}
        </MapView>
    )
}
