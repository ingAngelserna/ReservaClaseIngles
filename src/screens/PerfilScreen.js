import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';

import useAlmacenamiento from '../hooks/useAlmacenamiento'; 
import useReserva from '../hooks/useReserva'; 
import { colors, typography, spacing, radius } from '../theme/index';

export default function PerfilScreen() {
  const [perfilGuardado, actualizarPerfil, listo] = useAlmacenamiento('@perfil_usuario', null);
  const { reservas } = useReserva();
  
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');

  useEffect(() => {
    if (perfilGuardado) {
      setNombre(perfilGuardado.nombre || '');
      setCorreo(perfilGuardado.correo || '');
      setTelefono(perfilGuardado.telefono || '');
    }
  }, [perfilGuardado]);

  const handleSave = () => {
    if (!nombre || !correo || !telefono) {
      Alert.alert('Faltan datos', 'Por favor, llena todos los campos.');
      return;
    }
    actualizarPerfil({ nombre, correo, telefono });
    Alert.alert('Éxito', 'Tu perfil ha sido guardado correctamente.');
  };

  const handleBorrar = () => {
    Alert.alert(
      "Borrar Perfil",
      "¿Seguro que quieres limpiar los datos para probar de nuevo?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Sí, borrar", 
          style: "destructive",
          onPress: () => {
            actualizarPerfil(null);
            setNombre('');
            setCorreo('');
            setTelefono('');
          }
        }
      ]
    );
  };

  if (!listo) {
    return (
      <View style={styles.pantallaCentrada}>
        <Text>Cargando perfil...</Text>
      </View>
    );
  }

  const yaRegistrado = perfilGuardado !== null;
  const cantidadReservas = reservas ? reservas.length : 0;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.pantalla}>
        <Text style={[typography.titulo, styles.titulo]}>Mi Perfil</Text>

        {yaRegistrado && (
          <View style={styles.tarjetaEstadisticas}>
            <Text style={styles.textoEstadisticas}>
              Hola {nombre.split(' ')[0]}, tienes {cantidadReservas} {cantidadReservas === 1 ? 'clase reservada' : 'clases reservadas'}.
            </Text>
          </View>
        )}

        <TextInput 
          style={[styles.input, yaRegistrado && styles.inputBloqueado]} 
          placeholder="Nombre completo" 
          value={nombre} 
          onChangeText={setNombre}
          editable={!yaRegistrado} 
        />

        <TextInput 
          style={styles.input} 
          placeholder="Correo electrónico" 
          value={correo} 
          onChangeText={setCorreo} 
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput 
          style={styles.input} 
          placeholder="Teléfono" 
          value={telefono} 
          onChangeText={setTelefono} 
          keyboardType="phone-pad"
        />

        <TouchableOpacity style={styles.boton} onPress={handleSave}>
          <Text style={styles.textoBoton}>Save</Text>
        </TouchableOpacity>

        {yaRegistrado && (
          <TouchableOpacity style={[styles.boton, { backgroundColor: '#DC2626', marginTop: 10 }]} onPress={handleBorrar}>
            <Text style={styles.textoBoton}>Reiniciar Pruebas</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  pantallaCentrada: { flex: 1, backgroundColor: colors.fondo, justifyContent: 'center', alignItems: 'center' },
  pantalla: { flex: 1, backgroundColor: colors.fondo, padding: spacing.lg, justifyContent: 'center' },
  titulo: { marginBottom: spacing.sm, textAlign: 'center' },
  
  tarjetaEstadisticas: {
    backgroundColor: '#10B981', 
    padding: spacing.md,
    borderRadius: radius?.md || 8,
    marginBottom: spacing.lg,
    alignItems: 'center'
  },
  textoEstadisticas: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },

  input: { borderWidth: 1, borderColor: colors.borde || '#ccc', borderRadius: radius?.sm || 8, padding: spacing.md, marginBottom: spacing.lg, backgroundColor: colors.superficie, color: colors.texto, fontSize: 16 },
  inputBloqueado: { backgroundColor: '#e2e8f0', color: '#64748b' },
  boton: { backgroundColor: colors.primario || '#007BFF', paddingVertical: spacing.md, borderRadius: radius?.full || 25, alignItems: 'center', marginTop: spacing.sm },
  textoBoton: { color: colors.superficie || '#fff', fontWeight: 'bold', fontSize: 16 }
});