import React from 'react';
import { Image, SafeAreaView, StyleSheet, View} from 'react-native';
import tw from 'tailwind-react-native-classnames';

import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';
import NavFavourites from '../components/NavFavourites';


export default function HomeScreen() {

    const dispatch = useDispatch();

 return (
   <SafeAreaView style={tw`bg-white h-full`}>
        <View style={tw`p-5 pt-8`}>
            <Image 
                source={require("../assets/simple-logo-horizontal.png")}
                style={{width: 150, height: 100, resizeMode: 'contain',}}
            />
            
            <GooglePlacesAutocomplete 
                styles={{
                    container: {
                        flex: 0,
                    },
                    textInput: {
                        fontSize: 18,
                        borderWidth: 1,
                        borderColor: '#eee',
                        backgroundColor: '#fff',
                    }
                }}
                returnKeyType={"search"}
                enablePoweredByContainer={false}
                minLength={2}                                
                query={{
                    key: GOOGLE_MAPS_APIKEY,
                    language: 'en',
                }}
                onPress={(data, details = null)=>{
                    // store coordinates in redux
                    dispatch(setOrigin({
                        location: details.geometry.location,
                        description: data.description,
                    }));

                    dispatch(setDestination(null));

                }}
                fetchDetails={true}                
                placeholder="Where from?" 
                nearbyPlacesAPI="GooglePlacesSearch"
                debounce={400}
            />
            
            
            <NavOptions />
            <NavFavourites />
        </View>
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({

});