import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, FlatList } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { colors, spacing, typography, radius } from '../theme';
import { CLASES, NIVELES } from '../data/clases';
import NivelChip from '../components/NivelChip';
import Card from '../components/Card';
import useResponsive from '../hooks/useResponsive'; // <-- Asegúrate de que tenga la "n"
import EstadoVacio from '../components/EstadoVacio';

export default function ClasesScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const { columnas, paddingHorizontal } = useResponsive();

    // 1. CORRECCIÓN: 'Todos' con "T" mayúscula
    const [nivel, setNivel] = useState('Todos'); 
    const [busqueda, setBusqueda] = useState('');

    const resultados = useMemo(() => {
        const textoBusqueda = busqueda.trim().toLowerCase();
        return CLASES.filter((clase) => {
            const coincideNivel = nivel === 'Todos' || clase.nivel === nivel;
            const coincidetexto = textoBusqueda === '' ||
                clase.profesor.nombre.toLowerCase().includes(textoBusqueda) ||
                clase.titulo.toLowerCase().includes(textoBusqueda);
            
            return coincideNivel && coincidetexto;
        });
    }, [nivel, busqueda]);

    return (
        <View style={[style.pantalla, { padding: insets.top + spacing.md }]}>
            
            {/* Título de la aplicación */}
            <Text style={typography.titulo}>Aplicación para clases de inglés</Text>
            
            {/* 4. CORRECCIÓN: Estilos agregados al contenedor y al input */}
            <View style={style.buscador}>
                <Ionicons name="search" size={18} color={colors.primario} />
                <TextInput
                    style={style.input}
                    value={busqueda}
                    onChangeText={setBusqueda}
                    placeholder="Buscar por profesor o título..."
                    autoCorrect={false}
                    autoComplete="off"
                />
                {busqueda.length > 0 && (
                    <Ionicons 
                        name="close-circle" 
                        size={18} 
                        color={colors.primario}
                        onPress={() => setBusqueda('')}
                    />
                )}
            </View>

            {/* Selector de Niveles */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ flexGrow: 0, marginTop: spacing.md, marginBottom: spacing.sm }}
            >
                {NIVELES.map((item) => (
                    <NivelChip
                        key={item}
                        etiqueta={item}
                        // 3. CORRECCIÓN: Lógica para saber cuál está seleccionado
                        activo={nivel === item} 
                        onPress={() => setNivel(item)}
                    />
                ))}
            </ScrollView>

            {/* Lista de Clases */}
            <FlatList
                data={resultados}
                keyExtractor={(item) => item.id}
                // 2. CORRECCIÓN: Llaves {item} agregadas aquí
                renderItem={({ item }) => (
                    <Card
                        clase={item}
                        onPress={() => navigation.navigate('DetalleClase', { clase: item })}
                    />
                )}
                contentContainerStyle={{
                    paddingHorizontal: 0, // Ajustado para alinear con el buscador
                    paddingBottom: 20,
                    flexGrow: 1
                }}
                numColumns={columnas}
                ListEmptyComponent={
                    <EstadoVacio
                        icono="search-outline"
                        titulo="No encontramos resultados"
                        mensaje="Prueba con otra combinación de palabras para la búsqueda"
                        onAction={() => {
                            setNivel('Todos');
                            setBusqueda('');
                        }}
                    />
                }
            />
        </View>
    );
}

const style = StyleSheet.create({
    pantalla: { flex: 1, backgroundColor: colors.fondo, paddingHorizontal: spacing.lg },
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