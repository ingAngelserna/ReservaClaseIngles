import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../theme/index';

export default function ReservasScreen() {
    return (
        <View style={styles.pantalla}>
            <Text style={typography.titulo}>Mis Reservas</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    pantalla: { 
        flex: 1, 
        backgroundColor: colors.fondo, 
        padding: spacing.lg,
        justifyContent: 'center',
        alignItems: 'center'
    },
});