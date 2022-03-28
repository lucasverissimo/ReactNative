import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import { selectTravelTimeInformation } from '../slices/navSlice';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';


const data = [
    {
        id: "Uber-X-123",
        title: "UberX",
        multiplier: 1,
        image: "https://links.papareact.com/3pn",
    },
    {
        id: "Uber-XL-456",
        title: "Uber XL",
        multiplier: 1.2,
        image: "https://links.papareact.com/5w8",
    },
    {
        id: "Uber-LUX-789",
        title: "Uber LUX",
        multiplier: 1.75,
        image: "https://links.papareact.com/7pf",
    }
];

const SURGE_CHARGE_RATE = 1.5;

export default function RideOptionsCard() {

    const navigation = useNavigation();

    const [selected, setSelected] = useState(null);  
    
    const travelTimeInformation = useSelector(selectTravelTimeInformation);

    return(
        <SafeAreaView style={tw`bg-white flex-grow`}>
            <View style={tw`z-50 h-1/6`}>
                <TouchableOpacity onPress={()=>navigation.navigate("NavigateCard")} style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}> 
                    <Icon name="chevron-left" type="fontawesome" />
                </TouchableOpacity>
                <Text style={tw`text-center py-5 text-xl`}>
                    Select a Ride - {travelTimeInformation?.distance.text}
                </Text>
            </View>
            <FlatList 
                data={data}
                style={tw`h-3/5 z-10`}
                keyExtractor={item => item.id}
                renderItem={({item:{id, title, multiplier, image}, item})=>(
                    <TouchableOpacity 
                        onPress={()=>setSelected(item)}
                        style={tw`flex-row items-center justify-between px-10 ${ id === selected?.id && 'bg-gray-200'}`}
                    >
                        <Image 
                           style={{
                               width: 100,
                               height: 100,
                               resizeMode: "contain",
                           }} 
                           source={{uri: image}}
                        />
                        <View style={tw`-ml-6`}>
                            <Text style={tw`text-xl font-semibold`}>{title}</Text>
                            <Text>{travelTimeInformation?.duration.text} travel time</Text>
                        </View>
                        <Text style={tw`text-xl`}>                            
                            {new Intl.NumberFormat("pt-br", {
                                style: 'currency',
                                currency: 'BRL',
                            }).format(
                                (travelTimeInformation?.duration.value * SURGE_CHARGE_RATE * multiplier) / 100
                            )}
                        </Text>
                    </TouchableOpacity>
                )}
            />
            <View style={tw`flex-auto z-50 border-t border-gray-200`}>
                <TouchableOpacity disabled={!selected} style={tw`bg-black py-3 m-3 ${!selected && 'bg-gray-300'}`}>
                    <Text style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );

    /*return (
        <SafeAreaView style={tw`bg-white flex-grow`}>
            <View style={tw`pt-5 mt-5 flex-1 pl-4 pr-4 mb-5`}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '50%'}}>
                    <TouchableOpacity onPress={()=>navigation.goBack()} style={tw`h-20 w-10 mr-5`}>
                        <Icon
                            style={tw`p-2 bg-black rounded-full w-10 mt-4`} 
                            type="antdesign"
                            name="arrowleft"
                            color="white"
                        />
                    </TouchableOpacity>
                    <Text style={tw`text-xl`}>Select a Ride</Text>
                </View>                
            </View>

            <View style={tw`flex pl-5 pr-5 mt-5 bg-red-100`}>
                <Text>Ride</Text>
            </View>
        </SafeAreaView>
    )*/
}
