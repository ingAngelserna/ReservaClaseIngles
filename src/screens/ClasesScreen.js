import React, {useState, useEffect, useMemo} from 'react';
import { View, Text, Image, Pressable, StyleSheet, TextInput, ScrollView, FlatList} from 'react-native';

import { useSafeAreaInsets} from 'react-native-safe-area-context';
import { Ionicons} from '@expo/vector-icons';

import EtiquetaNivel from '../components/EtiquetaNivel';
import { colors,  spacing, typography, radius} from '../theme';
import {formatearPrecio, CLASES, NIVELES} from '../data/clases'
import NivelChip from '../components/NivelChip';
import Card from '../components/Card';
import useResposive from '../hooks/useResponsive';
import EstadoVacio from '../components/EstadoVacio';


export default function ClasesScreen ({ navigation }){
    const insets = useSafeAreaInsets();
    const {columnas, paddingHorizontal} = useResposive ();

    const [ nivel, setNivel] = useState ('todos');
    const [busqueda, setBusqueda] = useState('');

    const resultados = useMemo(()=>{
        const textoBusqueda = busqueda.trim().toLowerCase();
        return CLASES.filter((clase)=>{
            const coincideNivel = nivel === 'Todos' || clase.nivel === nivel;
            const coincidetexto = textoBusqueda ||
            textoBusqueda === '' ||
            clase.profesor.nombre.toLowerCase().includes(textoBusqueda) ||
            clase.titulo.toLowerCase().includes(textoBusqueda)
            return coincideNivel && coincidetexto

        });
        
    }, [nivel, busqueda]);

    return( 
        <View style={[style.pantalla, {padding: insets.top + spacing.md}]}>
            <View>
                <Text style={typography.titulo}>Aplicacion para clase de ingles</Text>
                <Ionicons name="search" size={18} color={colors.primario}/>
                <TextInput
                    value={busqueda}
                    onChangeText={setBusqueda}
                    placeholder="Busacar por nivel"
                    autoCorrect= {false}
                    autoComplete= {false}
                />
                {
                    busqueda.length > 0 && (
                        <Ionicons name="close-circle" 
                        size={18} 
                        color={colors.primario}
                        onPress={()=> setBusqueda('')}
                        />
                    )
                }
            </View>
            <ScrollView
               horizontal
               showsHorizontalScrollIndicator = {false}
               style={{flexGrow: 0}}
            >
                {
                    NIVELES.map((item) => (
                        <NivelChip
                            key={item}
                            etiqueta={item}
                            activo={item}
                            onPress={()=> setNivel(item)}
                        
                        />
                    ))
                }







            </ScrollView>
            <FlatList
                data={resultados}
                keyExtractor={(item)=> item.id}
                renderItem={(item)=>(
                    <Card
                        clase={item}
                        onPress={()=> navigation.navigate('DetalleClase', {clase:item})}
                    />

                )}
                contentContainerStyle={{
                    paddingHorizontal:,  
                    flexGrow:1
                }}
                numColumns={columnas}
                ListEmptyComponent={
                    <EstadoVacio
                        icono="search-outline"
                        titulo="No econtramos resultados"
                        mensaje="prueba con otra combinacion de palabras para la buequeda"
                        onAction={()=>{
                            setNivel('Todos');
                            setBusqueda('');
                        }}
                    
                    />

                }


            />

             
        </View>
    )

}

const style = StyleSheet.create({

  pantalla: { flex: 1, backgroundColor: colors.fondo },

  buscador: {

    flexDirection: 'row',

    alignItems: 'center',

    gap: spacing.sm,

    backgroundColor: colors.superficie,

    borderRadius: radius.md,

    paddingHorizontal: spacing.lg,

    height: 46,

    marginTop: spacing.lg,

    borderWidth: 1,

    borderColor: colors.borde,

  },

  input: { flex: 1, fontSize: 14, color: colors.texto, paddingVertical: 0 },

});

