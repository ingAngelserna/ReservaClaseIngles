import React from 'react';
import { View, Text, Image, Pressable, StyleSheet} from 'react-native';
import EtiquetaNivel from './EtiquetaNivel';
import { colors,  spacing, typography} from '../theme';
import { formatearPrecio, CLASES } from '../data/clases';



export default function Card({clase, onPress}){


    return (
        <Pressable onPress={onPress}>
            <Image source={{uri: clase.image}}/>
            <View>
                <EtiquetaNivel nivel={clase.nivel}/>
                <Text  style= {styles.titulo}> {clase.titulo}</Text>
                <Text> {clase.nivel}</Text>
                <Text> {clase?.profesor?.nombre}</Text>
                <Text> {formatearPrecio(clase.precio)}</Text>
            </View>
        </Pressable>
    )

}

const styles = StyleSheet.create({
    titulo: {fontSize: 16, color: colors.texto}


})