  import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { formatearPrecio } from '../data/clases';

// 1. Importamos el hook global de reservas que ya arreglaste
import useReserva from '../hooks/useReserva'; // Ajusta la ruta si es necesario (ej: '../context/useReserva')

export default function DetalleClaseScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const { clase } = route.params;

  // 2. Extraemos la función agregarReserva del contexto
  const { agregarReserva } = useReserva();

  const [cupos, setCupos] = useState(clase.cupos);
  // 3. Nuevo estado para guardar qué horario elige el usuario
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);

  // 4. Lógica de reserva actualizada
  const manejarReserva = () => {
    if (!horarioSeleccionado) {
      Alert.alert('Falta horario', 'Por favor selecciona un horario para tu clase.');
      return;
    }

    if (cupos > 0) {
      // Intentamos guardar la reserva en el Contexto Global
      const resultado = agregarReserva(clase, horarioSeleccionado);
      
      if (resultado.ok) {
        setCupos(cupos - 1);
        Alert.alert('¡Reserva exitosa!', 'Tu clase ha sido guardada en la pestaña de Reservas.');
        navigation.goBack(); // Regresamos a la lista de clases
      } else {
        // Si resultado.ok es falso, significa que el id (clase + horario) ya existe o se cruza
        Alert.alert('Cruce de horarios', 'Ya tienes una reserva para esta clase en este mismo horario.');
      }
    }
  };

  return (
    <View style={styles.pantalla}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
      >
        <Image source={{ uri: clase.imagen }} resizeMode="cover" style={styles.portada} />

        <View style={styles.contenedorInfo}>
          <Text style={styles.titulo}>{clase.titulo}</Text>
          <Text style={styles.descripcion}>{clase.descripcion}</Text>

          <View style={styles.tarjetaBlanca}>
            <View style={styles.datoColumna}>
              <Text style={styles.datoValor}>{clase.duracion} min</Text>
              <Text style={styles.datoEtiqueta}>Duración</Text>
            </View>
            <View style={styles.datoColumna}>
              <Text style={styles.datoValor}>{cupos}</Text>
              <Text style={styles.datoEtiqueta}>Cupos</Text>
            </View>
            <View style={styles.datoColumna}>
              <Text style={styles.datoValor}>{clase.modalidad}</Text>
              <Text style={styles.datoEtiqueta}>Modalidad</Text>
            </View>
          </View>

          <View style={[styles.tarjetaBlanca, styles.filaProfesor]}>
            <Image source={{ uri: clase.profesor.foto }} style={styles.avatar} />
            <View>
              <Text style={styles.profesorNombre}>{clase.profesor.nombre}</Text>
              <Text style={styles.profesorPais}>{clase.profesor.pais}</Text>
            </View>
          </View>

          {/* 5. Selector visual de horarios */}
          <View style={styles.seccionHorarios}>
            <Text style={styles.subtitulo}>Selecciona un horario:</Text>
            <View style={styles.horariosGrid}>
              {clase.horarios.map((horario, index) => {
                const seleccionado = horarioSeleccionado === horario;
                return (
                  <TouchableOpacity 
                    key={index} 
                    style={[styles.botonHorario, seleccionado && styles.botonHorarioActivo]}
                    onPress={() => setHorarioSeleccionado(horario)}
                  >
                    <Text style={[styles.textoHorario, seleccionado && styles.textoHorarioActivo]}>
                      {horario}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.barra, { paddingBottom: insets.bottom || 20 }]}>
        <View>
          <Text style={styles.precioEtiqueta}>Precio total</Text>
          <Text style={styles.precioValor}>{formatearPrecio(clase.precio)}</Text>
        </View>

        <TouchableOpacity
          style={[styles.botonReservar, cupos === 0 && styles.botonAgotado]}
          onPress={manejarReserva}
          disabled={cupos === 0}
        >
          <Text style={styles.textoBoton}>
            {cupos > 0 ? 'Reservar clase' : 'Sin cupos'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: '#c6c4c4' }, 
  portada: { width: '100%', height: 220, backgroundColor: '#e0e0e0' },
  contenedorInfo: { padding: 24 },
  titulo: { fontSize: 22, fontWeight: '800', color: '#1A1A1A', marginBottom: 12 },
  descripcion: { fontSize: 14, color: '#737373', lineHeight: 20, marginBottom: 24 },
  tarjetaBlanca: {
    flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#645656',
    borderRadius: 16, paddingVertical: 16, paddingHorizontal: 20, marginBottom: 16,
    elevation: 1, 
  },
  datoColumna: { alignItems: 'center', gap: 4 },
  datoValor: { fontSize: 15, fontWeight: '800', color: '#1A1A1A' },
  datoEtiqueta: { fontSize: 12, color: '#968f8f', fontWeight: '500' },
  filaProfesor: { justifyContent: 'flex-start', alignItems: 'center', gap: 16, paddingVertical: 12 },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#eee' },
  profesorNombre: { fontSize: 15, fontWeight: '700', color: '#1A1A1A' },
  profesorPais: { fontSize: 13, color: '#737373', marginTop: 2 },
  
  seccionHorarios: { marginTop: 16 },
  subtitulo: { fontSize: 16, fontWeight: '800', color: '#1A1A1A', marginBottom: 12 },
  horariosGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  botonHorario: {
    borderWidth: 1, borderColor: '#737373', borderRadius: 8, paddingVertical: 8, paddingHorizontal: 12,
  },
  botonHorarioActivo: {
    backgroundColor: '#007BFF', borderColor: '#007BFF',
  },
  textoHorario: { fontSize: 14, color: '#1A1A1A' },
  textoHorarioActivo: { color: '#fff', fontWeight: 'bold' },

  barra: {
    position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#999090',
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 24, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#EEEEEE', elevation: 10,
  },
  precioEtiqueta: { fontSize: 13, color: '#737373' },
  precioValor: { fontSize: 18, fontWeight: '800', color: '#1A1A1A' },
  botonReservar: { backgroundColor: '#007BFF', paddingVertical: 14, paddingHorizontal: 24, borderRadius: 25 },
  botonAgotado: { backgroundColor: '#CCCCCC' },
  textoBoton: { color: '#e2e0e0', fontSize: 16, fontWeight: 'bold' }
});