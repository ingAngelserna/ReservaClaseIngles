import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { formatearPrecio } from '../data/clases';

export default function DetalleClaseScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const { clase } = route.params;


  const [cupos, setCupos] = useState(clase.cupos);


  const reservar = () => {
    if (cupos > 0) {
      setCupos(cupos - 1);
      Alert.alert('¡Reserva exitosa!', 'Se ha descontado un cupo.');
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


          <View style={styles.seccionHorarios}>
            <Text style={styles.subtitulo}>Horarios disponibles</Text>
            {clase.horarios.map((horario, index) => (
              <Text key={index} style={styles.textoHorario}>
                {horario}
              </Text>
            ))}
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
          onPress={reservar}
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
  pantalla: { 
    flex: 1, 
    backgroundColor: '#c6c4c4' 
  }, 
  portada: { 
    width: '100%', 
    height: 220, 
    backgroundColor: '#e0e0e0' 
  },
  contenedorInfo: { 
    padding: 24, 
  },
  titulo: { 
    fontSize: 22, 
    fontWeight: '800', 
    color: '#1A1A1A',
    marginBottom: 12
  },
  descripcion: { 
    fontSize: 14, 
    color: '#737373', 
    lineHeight: 20,
    marginBottom: 24
  },
  tarjetaBlanca: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#645656',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1, 
  },
  datoColumna: { 
    alignItems: 'center', 
    gap: 4 
  },
  datoValor: { 
    fontSize: 15, 
    fontWeight: '800', 
    color: '#1A1A1A' 
  },
  datoEtiqueta: { 
    fontSize: 12, 
    color: '#968f8f',
    fontWeight: '500'
  },
  filaProfesor: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 12,
  },
  avatar: { 
    width: 48, 
    height: 48, 
    borderRadius: 24, 
    backgroundColor: '#eee' 
  },
  profesorNombre: { 
    fontSize: 15, 
    fontWeight: '700', 
    color: '#1A1A1A' 
  },
  profesorPais: { 
    fontSize: 13, 
    color: '#737373', 
    marginTop: 2 
  },
  seccionHorarios: { 
    marginTop: 16 
  },
  subtitulo: { 
    fontSize: 16, 
    fontWeight: '800', 
    color: '#1A1A1A', 
    marginBottom: 16 
  },
  textoHorario: { 
    fontSize: 14, 
    color: '#737373', 
    marginBottom: 14 
  },
  barra: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#999090',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 10,
  },
  precioEtiqueta: { 
    fontSize: 13, 
    color: '#737373' 
  },
  precioValor: { 
    fontSize: 18, 
    fontWeight: '800', 
    color: '#1A1A1A' 
  },
  botonReservar: {
    backgroundColor: '#007BFF',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 25, 
  },
  botonAgotado: {
    backgroundColor: '#CCCCCC',
  },
  textoBoton: { 
    color: '#e2e0e0', 
    fontSize: 16, 
    fontWeight: 'bold' 
  }
});