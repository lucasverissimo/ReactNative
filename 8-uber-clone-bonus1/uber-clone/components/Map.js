import React, { useRef, useEffect } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import { selectDestination, selectOrigin } from '../slices/navSlice';
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from '@env';
export default function Map() {

    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const mapRef = useRef(null);

    useEffect(()=>{
        if(!origin || !destination){
            return;
        }

        // zoom and fit to markers
        mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
            edgePadding:{top: 90, right: 50, left: 50, bottom: 25},
        });

    }, [origin, destination])

    return (
        <MapView
            style={tw`flex-1`}
            ref={mapRef}
            initialRegion={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
            }}
            zoomControlEnabled={true}
            zoomEnabled={true}
            showsUserLocation={true}
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
                    description={origin.description}
                    identifier="destination"
                />
            )}
        </MapView>
    )
}
