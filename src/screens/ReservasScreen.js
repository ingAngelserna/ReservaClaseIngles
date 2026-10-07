import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; 

import { colors, typography, spacing, radius } from '../theme/index';
import useReserva from '../hooks/useReserva'; 
import EstadoVacio from '../components/EstadoVacio';

export default function ReservasScreen() {
    const insets = useSafeAreaInsets();
    
    // Traemos la lista de reservas y la función para borrarlas
    const { reservas, eliminarReserva } = useReserva();

    const totalClases = reservas.length;
    const totalCosto = reservas.reduce((suma, item) => suma + item.precio, 0);

    // Función que muestra la alerta y elimina la reserva si el usuario confirma
    const handleCancelar = (idReserva) => {
        Alert.alert(
            "Cancelar Reserva",
            "¿Estás seguro de que deseas cancelar esta clase? Perderás tu cupo.",
            [
                { text: "No, mantener", style: "cancel" },
                { 
                    text: "Sí, cancelar", 
                    onPress: () => eliminarReserva(idReserva), 
                    style: 'destructive' 
                }
            ]
        );
    };

    // Diseño de cada tarjeta de reserva en la lista
    const renderReserva = ({ item }) => (
        <View style={styles.tarjeta}>
            <View style={styles.info}>
                <Text style={styles.tituloClase}>{item.titulo}</Text>
                <Text style={styles.detalle}>Profesor: {item.profesor}</Text>
                <Text style={styles.detalleHorario}>Horario: {item.horario}</Text>
                <Text style={styles.detallePrecio}>Precio: ${item.precio}</Text>
            </View>
            
            <TouchableOpacity style={styles.botonCancelar} onPress={() => handleCancelar(item.id)}>
                <Ionicons name="trash-outline" size={18} color="#FFFFFF" style={styles.iconoBasura} />
                <Text style={styles.textoBoton}>Cancelar Reserva</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={[styles.pantalla, { paddingTop: insets.top + spacing.md }]}>
            <Text style={[typography.titulo, styles.tituloPantalla]}>Mis Reservas</Text>
            
            {/* Resumen superior de costos y cantidad */}
            {totalClases > 0 && (
                <View style={styles.resumen}>
                    <Text style={styles.textoResumen}>Clases apartadas: {totalClases}</Text>
                    <Text style={styles.textoResumen}>Total: ${totalCosto}</Text>
                </View>
            )}
            
            {/* Lista dinámica que dibuja las reservas o muestra el estado vacío */}
            <FlatList
                data={reservas}
                keyExtractor={(item) => item.id}
                renderItem={renderReserva}
                contentContainerStyle={{ paddingBottom: 20, flexGrow: 1 }}
                ListEmptyComponent={
                    <EstadoVacio 
                        icono="calendar-outline"
                        titulo="No tienes reservas"
                        mensaje="Explora las clases disponibles en el Inicio y aparta tu cupo."
                    />
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    pantalla: { flex: 1, backgroundColor: colors.fondo, paddingHorizontal: spacing.lg },
    tituloPantalla: { marginBottom: spacing.sm },
    
    resumen: { 
        backgroundColor: colors.primario || '#007BFF', 
        padding: spacing.md, 
        borderRadius: radius?.md || 8, 
        marginBottom: spacing.lg, 
        flexDirection: 'row', 
        justifyContent: 'space-between' 
    },
    textoResumen: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
    
    tarjeta: { 
        backgroundColor: colors.superficie, 
        borderWidth: 1, 
        borderColor: colors.borde || '#ccc', 
        borderRadius: radius?.md || 12, 
        padding: spacing.lg, 
        marginBottom: spacing.md,
        // Efecto de sombra profesional
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3 
    },
    info: { marginBottom: spacing.md },
    tituloClase: { fontSize: 18, fontWeight: 'bold', color: colors.texto, marginBottom: 4 },
    detalle: { fontSize: 14, color: '#666', marginBottom: 2 },
    detalleHorario: { fontSize: 14, fontWeight: '600', color: colors.primario || '#007BFF', marginBottom: 2 },
    detallePrecio: { fontSize: 14, fontWeight: 'bold', color: '#10B981' },
    
    botonCancelar: { 
        backgroundColor: '#DC2626', 
        paddingVertical: spacing.sm, 
        borderRadius: radius?.sm || 8, 
        alignItems: 'center',
        flexDirection: 'row', 
        justifyContent: 'center' 
    },
    iconoBasura: { marginRight: 6 },
    textoBoton: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 14 }
});