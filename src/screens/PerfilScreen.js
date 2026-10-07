import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

// Importamos tu hook para persistencia local. 
// (Asegúrate de que la ruta '../hooks/useAlmacenamiento' sea correcta según tus carpetas)
import useAlmacenamiento from '../hooks/useAlmacenamiento'; 
import { colors, typography, spacing } from '../theme/index';

export default function PerfilScreen() {
  // Inicializamos la base de datos local para el perfil
  const [perfilGuardado, actualizarPerfil, listo] = useAlmacenamiento('@perfil_usuario', null);
  
  // Estados para los campos de texto
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');

  // Cuando el almacenamiento local cargue los datos, los ponemos en los inputs
  useEffect(() => {
    if (perfilGuardado) {
      setNombre(perfilGuardado.nombre || '');
      setCorreo(perfilGuardado.correo || '');
      setTelefono(perfilGuardado.telefono || '');
    }
  }, [perfilGuardado]);

  // Función del botón Save
  const handleSave = () => {
    if (!nombre || !correo || !telefono) {
      Alert.alert('Faltan datos', 'Por favor, llena todos los campos.');
      return;
    }
    // Guardamos la info en el disco
    actualizarPerfil({ nombre, correo, telefono });
    Alert.alert('Éxito', 'Tu perfil ha sido guardado correctamente.');
  };

  // Pantalla de espera mientras el disco lee los datos
  if (!listo) {
    return (
      <View style={styles.pantallaCentrada}>
        <Text>Cargando perfil...</Text>
      </View>
    );
  }

  // Si perfilGuardado existe, significa que ya se registró antes
  const yaRegistrado = perfilGuardado !== null;

  return (
    <View style={styles.pantalla}>
      <Text style={[typography.titulo, styles.titulo]}>Mi Perfil</Text>

      {/* Input de Nombre: Se bloquea y cambia de color si ya está registrado */}
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

      {/* Botón Save como pide el esquema */}
      <TouchableOpacity style={styles.boton} onPress={handleSave}>
        <Text style={styles.textoBoton}>Save</Text>
      </TouchableOpacity>
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
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.borde || '#ccc',
    borderRadius: 8,
    padding: spacing.md,
    marginBottom: spacing.lg,
    backgroundColor: colors.superficie,
    color: colors.texto,
    fontSize: 16,
  },
  inputBloqueado: {
    backgroundColor: '#e2e8f0', // Un tono gris para que parezca deshabilitado
    color: '#64748b',
  },
  boton: {
    backgroundColor: colors.primario || '#007BFF', 
    paddingVertical: spacing.md,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  textoBoton: {
    color: colors.superficie || '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  }
});