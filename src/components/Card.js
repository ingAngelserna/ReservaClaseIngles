import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import EtiquetaNivel from './EtiquetaNivel';
import { colors, spacing } from '../theme';
import { formatearPrecio } from '../data/clases';

export default function Card({ clase, onPress }) {
    return (
        <Pressable style={styles.tarjeta} onPress={onPress}>
            <Image 
                source={{ uri: clase.imagen }} 
                style={styles.imagen} 
                resizeMode="cover" 
            />
            
            <View style={styles.contenido}>
                <EtiquetaNivel nivel={clase.nivel} />
                
                <Text style={styles.titulo} numberOfLines={2}>
                    {clase.titulo}
                </Text>
                
                <Text style={styles.profesor}>
                    {clase?.profesor?.nombre}
                </Text>
                
                <Text style={styles.precio}>
                    {formatearPrecio(clase.precio)}
                </Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    tarjeta: {
        backgroundColor: colors.superficie || '#ffffff',
        borderRadius: 12,
        margin: 8,
        flex: 1, 
        overflow: 'hidden', 
        elevation: 3, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    imagen: {
        width: '100%',
        height: 140, 
        backgroundColor: '#e0e0e0',
    },
    contenido: {
        padding: 12,
        gap: 4,
    },
    titulo: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.texto || '#333333',
        marginTop: 4,
    },
    profesor: {
        fontSize: 14,
        color: '#666666',
    },
    precio: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.primario || '#007BFF',
        marginTop: 4,
    }
});