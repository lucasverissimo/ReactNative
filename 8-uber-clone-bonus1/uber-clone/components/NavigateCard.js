import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch } from 'react-redux';
import { setDestination } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/core';
export default function NavigateCard() {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    return (
        <SafeAreaView style={tw`bg-white flex-1`}>
            <Text style={tw`text-center py-5 text-xl`}>Good Evening, Lucas!</Text>
            <View style={tw`border-t border-gray-200 flex-shrink`}>
                <View>
                    <GooglePlacesAutocomplete 
                        placeholder="Where to?"
                        nearbyPlacesAPI="GooglePlacesSearch"
                        debounce={400}
                        styles={toInputBoxStyles}
                        enablePoweredByContainer={false}
                        query={{
                            key: GOOGLE_MAPS_APIKEY,
                            language: 'en',
                        }}
                        fetchDetails={true}
                        returnKeyType={"search"}
                        minLength={2}
                        onPress={(data, details = null)=>{
                            dispatch(setDestination({
                                location: details.geometry.location,
                                description: data.description,
                            }));

                            navigation.navigate("RideOptionsCard");
                        }}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

const toInputBoxStyles = StyleSheet.create({
    container:{
        backgroundColor: "white",
        paddingTop: 20,
        flex: 0,
    },
    textInput: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#eee',
        backgroundColor: '#fff',
    },
    textInputContainer:{
        paddingHorizontal: 20,
        paddingBottom: 0
    }
});
