import React, { useState, useEffect, useCallback, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CLAVE_RESERVAS = '@reservas_ingles';

export const ReservaContext = createContext(null);

export function ReservaProvider({children}){
    const [reservas, setReservas] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(()=>{
        const cargar = async () =>{
            try{
                const guardado = await AsyncStorage.getItem(CLAVE_RESERVAS);
                if(guardado !== null){
                    setReservas(JSON.parse(guardado));
                }
            }catch(error){
                console.log('error leyendo las reservas: ',error);
            }finally{
                setCargando(false);
            }
        };
        cargar();
    },[]);

    useEffect(()=>{
        if(cargando) return;
        AsyncStorage.setItem(CLAVE_RESERVAS, JSON.stringify(reservas)).catch((error)=>
            console.log('Error guardando reservas: ', error)
        );
    },[reservas, cargando]);

    const agregarReserva = useCallback((clase, horario)=>{
        const nueva ={
            id: clase.id + '-' + horario,
            titulo: clase.titulo,
            nivel: clase.nivel,
            profesor: clase.profesor.nombre + ' ' + clase.profesor.apellido,
            precio: clase.precio,
            horario,
            creadoEn: new Date().toISOString(),
        };
        let resultados = {ok: true};
        setReservas((prev)=>{
            if(prev.some((r)=> r.id === nueva.id)){
                resultados = {ok: false};
                return prev;
            }
            return [nueva, ...prev];
        });
        return resultados;
    },[]);

    // ESTO ES LO QUE DEVUELVE LA VISTA Y QUITA LA PANTALLA NEGRA
    return (
        <ReservaContext.Provider value={{ reservas, agregarReserva, cargando }}>
            {children}
        </ReservaContext.Provider>
    );
}