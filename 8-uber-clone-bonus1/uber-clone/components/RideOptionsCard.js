import { useNavigation } from '@react-navigation/core';
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';

export default function RideOptionsCard() {

    const navigation = useNavigation();

    return (
        <View style={tw`pt-5 mt-5 flex-1 pl-4 pr-4`}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Icon
                        style={tw`p-2 bg-black rounded-full w-10 mt-4`} 
                        type="antdesign"
                        name="arrowleft"
                        color="white"
                    />
                </TouchableOpacity>
                <Text>pick a ride</Text>
            </View>
        </View>
    )
}
