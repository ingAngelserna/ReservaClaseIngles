import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

import useAlmacenamiento from '../hooks/useAlmacenamiento'; 
import { colors, typography, spacing, radius } from '../theme/index';

export default function PerfilScreen() {
  const [perfilGuardado, actualizarPerfil, listo] = useAlmacenamiento('@perfil_usuario', null);
  
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');

  // Llenar los campos si el usuario ya se había registrado antes
  useEffect(() => {
    if (perfilGuardado) {
      setNombre(perfilGuardado.nombre || '');
      setCorreo(perfilGuardado.correo || '');
      setTelefono(perfilGuardado.telefono || '');
    }
  }, [perfilGuardado]);

  // Guardar perfil
  const handleSave = () => {
    if (!nombre || !correo || !telefono) {
      Alert.alert('Faltan datos', 'Por favor, llena todos los campos.');
      return;
    }
    actualizarPerfil({ nombre, correo, telefono });
    Alert.alert('Éxito', 'Tu perfil ha sido guardado correctamente.');
  };

  // NUEVA FUNCIÓN: Borrar perfil para reiniciar pruebas
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

  return (
    <View style={styles.pantalla}>
      <Text style={[typography.titulo, styles.titulo]}>Mi Perfil</Text>

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

      {/* NUEVO BOTÓN: Solo aparece si el usuario ya se registró */}
      {yaRegistrado && (
        <TouchableOpacity style={[styles.boton, { backgroundColor: '#DC2626', marginTop: 10 }]} onPress={handleBorrar}>
          <Text style={styles.textoBoton}>BORAR PERFIL</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  pantallaCentrada: {
    flex: 1,
    backgroundColor: colors.fondo,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pantalla: { 
    flex: 1, 
    backgroundColor: colors.fondo, 
    padding: spacing.lg,
    justifyContent: 'center',
  },
  titulo: {
    marginBottom: spacing.XL || 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.borde || '#ccc',
    borderRadius: radius?.sm || 8,
    padding: spacing.md,
    marginBottom: spacing.lg,
    backgroundColor: colors.superficie,
    color: colors.texto,
    fontSize: 16,
  },
  inputBloqueado: {
    backgroundColor: '#e2e8f0', 
    color: '#64748b',
  },
  boton: {
    backgroundColor: colors.primario || '#007BFF', 
    paddingVertical: spacing.md,
    borderRadius: radius?.full || 25,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  textoBoton: {
    color: colors.superficie || '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  }
});