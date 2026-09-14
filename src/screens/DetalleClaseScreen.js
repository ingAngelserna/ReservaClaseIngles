import React from 'react';
import { View, Text, Image, ScrollView,StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {useResponsive} from '../hooks/useResponsive'
import EtiquetaNivel from '../components/EtiquetaNivel';
import { colors, spacing, typography, sombra } from '../theme';

export default function DetalleClaseScreen({route, navigation}){
  const insets = useSafeAreaInsets ();
  const {clase} = route.params;

  return (
    <View  style={styles.pantalla}>
      <ScrollView
          showsVerticalScrollIndicator = {false}
          contentContainerStyle = {{paddingBottom: 120}}
      >
        <Image source={{uri: clase.imagen}} resizeMode="cover" style = {styles.portada}/>
        
        //foto del frofesor al ladonombre y apellido
        //precio
        //duracion 
        //cupos
        //horarios
        // boton q se llame reservar clase "no haga nada "




      </ScrollView>
    </View>
    
  )
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colors.fondo },
  portada: { width: '100%', backgroundColor: colors.primarioSuave },
  datos: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.superficie,
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
  },
  dato: { alignItems: 'center', gap: 2 },
  datoValor: { fontSize: 16, fontWeight: '800', color: colors.texto },
  profesor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.superficie,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.borde },
  profesorNombre: { fontSize: 15, fontWeight: '700', color: colors.texto },
  descripcion: { ...typography.cuerpo, color: colors.textoSuave, lineHeight: 22, marginTop: spacing.sm },
  barra: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.superficie,
    borderTopWidth: 1,
    borderTopColor: colors.borde,
    paddingVertical: spacing.lg,
    paddingTop: spacing.lg
  },
  precio: { fontSize: 18, fontWeight: '800', color: colors.primario },
});