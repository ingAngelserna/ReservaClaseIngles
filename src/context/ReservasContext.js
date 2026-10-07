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
        
        let resultados = {ok: true, mensaje: ''};
        
        setReservas((prev)=>{
            // 1. Verificamos si hay ALGUNA clase (así sea distinta) a la misma hora
            const claseCruzada = prev.find((r) => r.horario === horario);
            
            if(claseCruzada){
                resultados = {
                    ok: false, 
                    mensaje: `Cruce de horarios: Ya tienes la clase "${claseCruzada.titulo}" apartada para este mismo día y hora.`
                };
                return prev;
            }
            
            return [nueva, ...prev];
        });
        
        return resultados;
    },[]);

    const eliminarReserva = useCallback((idReserva) => {
        setReservas((prev) => prev.filter((r) => r.id !== idReserva));
    }, []);

    return (
        <ReservaContext.Provider value={{ reservas, agregarReserva, eliminarReserva, cargando }}>
            {children}
        </ReservaContext.Provider>
    );
}   