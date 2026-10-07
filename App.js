import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Importamos tu Stack actual y las dos pantallas nuevas
import ClasesStack from './src/navigation/ClasesStack';
import ReservasScreen from './src/screens/ReservasScreen';
import PerfilScreen from './src/screens/PerfilScreen';

// Importamos el contexto y los colores
import { ReservaProvider } from './src/context/ReservasContext';
import { colors } from './src/theme/index.js';

const temaNavegacion = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.fondo,
    card: colors.superficie,
    primary: colors.primario,
    text: colors.texto,
    border: colors.borde,
  },
};

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ReservaProvider>
      <SafeAreaProvider>
        <NavigationContainer theme={temaNavegacion}>
          <StatusBar style="dark"/>
          
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarIcon: ({ color, size, focused }) => {
                let iconName;
                if (route.name === 'InicioTab') iconName = focused ? 'home' : 'home-outline';
                else if (route.name === 'ReservasTab') iconName = focused ? 'calendar' : 'calendar-outline';
                else if (route.name === 'PerfilTab') iconName = focused ? 'person' : 'person-outline';
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
          >
            <Tab.Screen name="InicioTab" component={ClasesStack} options={{ title: 'Clases' }} />
            <Tab.Screen name="ReservasTab" component={ReservasScreen} options={{ title: 'Reservas' }} />
            <Tab.Screen name="PerfilTab" component={PerfilScreen} options={{ title: 'Perfil' }} />
          </Tab.Navigator>

        </NavigationContainer>
      </SafeAreaProvider>
    </ReservaProvider>
  );
}