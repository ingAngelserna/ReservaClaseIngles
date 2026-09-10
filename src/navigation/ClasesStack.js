
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ClasesScreen from "../screens/ClasesScreen";
import DetalleClaseScreen from "../screens/DetalleClaseScreen";
import { StackScreen } from "react-native-screens";


const Stack = createNativeStackNavigator ();

export default function clasesStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={ClasesScreen}
                options={{headersShown: false}}
            />
            <Stack.Screen
                name="DetalleClase"
                component={DetalleClaseScreen}
                options={{title: 'Detalle', headerBackTitle: 'atras'}}
            />
        </Stack.Navigator>
    )
}