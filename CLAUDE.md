@AGENTS.md

# Bitácora de Desarrollo - Pair Review (IA)

## Datos de Sesión
* **Usuario:** Ángel
* **Ubicación:** Medellín, Antioquia, Colombia
* **Fecha de Sesión:** Miércoles, 7 de octubre de 2026
* **Hora de Cierre Parcial:** 1:28 PM (Hora de Colombia)
* **Proyecto:** Reserva de Clases de Inglés (React Native, Expo, Context API, AsyncStorage)
* **Reglas Activas:** Cero instalaciones de librerías externas.

---

## Historial de Consultas y Soluciones Arquitectónicas

### Consulta 1: Definición de la Arquitectura y Reglas del Proyecto
**Ángel:** Presentó el contexto del proyecto, reglas estrictas de no usar dependencias externas (`npm install`), uso obligatorio de Context API y AsyncStorage, y requerimientos de pantallas (Inicio, Reservas, Perfil).
**IA:** Desglosó la arquitectura lógica requerida en 4 áreas: Sincronización de Persistencia y Memoria, Lógica de Cruce de Horarios, Renderizado Condicional del Perfil, y Coherencia Visual (Design Tokens en `index.js`).

### Consulta 2: Estructura Inicial de Navegación
**Ángel:** ¿Cómo puedo iniciar para hacer el tab de las tres pantallas?
**IA:** Explicó el funcionamiento interno de un Tab Navigator (Registro, Estado Activo, Renderizado Eficiente) y propuso 3 pasos: identificar el enrutador actual, crear componentes "cascarón" (Stubs) y orquestar el contenedor.

### Consulta 3: Geometría de Componentes Visuales
**Ángel:** ¿Qué hacen específicamente las propiedades como `borderWidth`, `borderRadius` y `padding` en los campos de entrada?
**IA:** Explicó el "Box Model" en el motor Yoga de React Native: `borderWidth` (límite físico), `borderRadius` (suavizado matemático de vértices) y `padding` (área segura para el texto).

### Consulta 4: Debugging - Pantalla Negra Inicial
**Ángel:** Me apareció la pantalla negra totalmente en expo go ¿Por qué?
**IA:** Diagnosticó posibles causas: desincronización del Metro Bundler o un error estructural grave en React. Sugirió limpiar caché (`npx expo start -c`) y revisar los retornos (`return`) de los componentes.

### Consultas 5 y 6: Herencia de Estilos y Design Tokens
**Ángel:** ¿Cómo puedo asegurarme de que los nuevos componentes hereden las variables dinámicas? / Dame un ejemplo.
**IA:** Diferenció entre "Nivel Estático" (herencia por referencia de memoria) y "Nivel Dinámico" (reactividad vía Context API). Proporcionó la estructura del archivo `index.js` y demostró cómo inyectarlo en `StyleSheet.create`.

### Consulta 7: Renderizado de Imágenes Circulares
**Ángel:** ¿Cómo poner la imagen en el componente de perfil?
**IA:** Explicó el componente nativo `<Image>`. Detalló el cálculo matemático para avatares circulares: aplicar un `borderRadius` equivalente a la mitad exacta del `width` y `height`.

### Consulta 8: Debugging - Error de Rutas
**Ángel:** La consola arroja el error de React Navigation: "The action 'NAVIGATE' with payload was not handled".
**IA:** Explicó que el enrutador no encuentra el identificador de la pantalla. Recomendó revisar la capitalización de las rutas (case-sensitivity) y asegurar que la función reciba la propiedad `navigation`.

### Consultas 9 y 10: Validación de Formularios (RegEx)
**Ángel:** ¿Cómo puedo hacer para obligar a que el correo tenga un @ y un punto?
**IA:** Introdujo la "Cláusula de Guarda". Proveó una Expresión Regular (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`) y sugirió propiedades nativas de UX (`keyboardType="email-address"` y `autoCapitalize="none"`).

### Consulta 11: Interacción del Teclado Nativo
**Ángel:** El teclado se queda abierto y bloquea la vista de la interfaz.
**IA:** Instruyó envolver la vista principal en un `TouchableWithoutFeedback` conectado al método `Keyboard.dismiss()` para cerrar el teclado al tocar la pantalla, y el uso de `KeyboardAvoidingView` para empujar la interfaz.

### Consulta 12: Bloqueo de Reservas sin Perfil
**Ángel:** ¿Cómo puedo hacer si el usuario no tiene cuenta, no pueda hacer una reserva?
**IA:** Integró el Context API con la vista de Detalle. Mostró cómo leer el `perfilUsuario` e interceptar la reserva con un `Alert` nativo si los datos están vacíos.

### Consulta 13: Validación de Cruce de Horarios y Guardado
**Ángel:** ¿Cómo puedo hacer que guarde AsyncStorage dentro del Contexto, o en la validación de arreglos para evitar el cruce de horarios?
**IA:** Explicó cómo el Contexto (memoria rápida) y AsyncStorage (disco duro) trabajan juntos. Implementó la validación usando el método de arreglos `.some()` para detectar si ya existe una clase con el mismo día y hora antes de guardar.

### Consulta 14: Cancelación Inmutable de Reservas
**Ángel:** ¿Cómo poner el cancelar en reservas ejemplo?
**IA:** Detalló el uso del método `.filter()` para lograr la eliminación inmutable en React. Proveó la lógica para sacar la clase del arreglo y guardar el nuevo arreglo en AsyncStorage, complementado con un `Alert.alert` de confirmación.

### Consulta 15: Hidratación del Estado (Lectura Inicial)
**Ángel:** ¿Ya implementaste el useEffect en el Contexto para cargar la información de AsyncStorage al iniciar la aplicación? No.
**IA:** Explicó el ciclo de "hidratación" usando `useEffect` con un arreglo de dependencias vacío `[]`. Mostró cómo leer datos mediante funciones asíncronas internas y usar `JSON.parse()` para convertir las cadenas de texto nuevamente en arreglos y objetos utilizables.

### Consulta 16: Debugging - Pantalla Negra por AsyncStorage
**Ángel:** La aplicación se volvió negra cuando voy a utilizar el async storage.
**IA:** Identificó tres causas críticas: importar desde `react-native` en lugar de `@react-native-async-storage/async-storage`, intentar renderizar objetos crudos en el JSX (ej. `<Text>{perfil}</Text>`), o usar la palabra `async` directamente en el `useEffect`. Sugirió comentar el bloque de lectura y limpiar caché para aislar el error.
