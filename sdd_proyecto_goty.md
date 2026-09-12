# Software Design Document (SDD) - Proyecto GOTY

## 1. Introducción

### 1.1 Propósito
Este documento define la arquitectura de software, las decisiones de diseño y las pautas de implementación para el **Proyecto GOTY**. El propósito del sistema es servir como un archivo interactivo que documente los ganadores de los premios "The Game Awards" desde 2014, integrando paralelamente un sistema de votación popular ("Encuesta") para recopilar y analizar las preferencias del público frente a las decisiones de los jueces oficiales.

### 1.2 Alcance
El sistema abarcará el desarrollo de una plataforma web pública con dos vertientes principales:
1.  **Visor de Archivo:** Páginas estáticas informativas por año con buscador integrado.
2.  **Sistema de Encuestas:** Una interfaz interactiva conectada a un backend y una base de datos para registrar, almacenar y contabilizar votos de los usuarios de manera persistente.

### 1.3 Perfil de Usuarios
*   **Usuarios Finales (Gamers y Público General):** Usuarios que navegan buscando información histórica o interactuando con la encuesta para dejar su opinión.
*   **Evaluadores (Profesores/Docentes):** Usuarios que evalúan el proyecto bajo el contexto de la materia "Laboratorio de Aplicaciones", priorizando la limpieza, legibilidad y estructuración del código.

---

## 2. Orquestación y Agentes (Basado en `fefe-models`)

El proyecto se clasifica bajo el perfil **`web-con-backend`**. Para su desarrollo, el trabajo se dividirá funcionalmente entre los siguientes sub-agentes del orquestador:

*   **Orquestador:** Gestiona el ciclo de vida del desarrollo, validando que el código cumpla con los estándares de legibilidad estipulados.
*   **Diseñador Frontend:** Implementa la interfaz gráfica de navegación, el buscador y los formularios de la encuesta.
*   **Programador Backend:** Diseña el esquema de la base de datos y desarrolla los endpoints para procesar las votaciones.
*   **Investigador Web:** Recopila y estructura en JSON la base de datos histórica de nominados y ganadores.
*   **QA Tester:** Efectúa pruebas de estrés básicas y validación de formularios para evitar manipulación de votos.

---

## 3. Arquitectura del Sistema

La aplicación sigue una arquitectura tradicional **Cliente-Servidor**.

### 3.1 Frontend (Cliente)
Encargado de la presentación y la validación de entrada.
*   **Tecnologías:** HTML5, CSS3, Vanilla JavaScript.
*   **Comportamiento:** Renderizado de contenido, manejo de eventos de la interfaz (ej: filtros de búsqueda, selección de opciones en la encuesta) y peticiones asíncronas (`fetch`) al backend.

### 3.2 Backend (Servidor)
Encargado de la lógica de negocio y persistencia de la encuesta.
*   **Tecnologías:** (A definir, recomendado Node.js/Express o un script ligero en PHP/Python según conveniencia del entorno escolar).
*   **Comportamiento:** Recepción de votos, validación del origen (para evitar spam masivo), inserción en la base de datos y cálculo de estadísticas.

### 3.3 Base de Datos
*   **Modelo de Datos Propuesto:** 
    *   `Votos`: Tabla/Colección que guarda el Año, Categoría, Juego Seleccionado, y Timestamp.
    *   `Juegos_Historicos` (Opcional): JSON estático en el servidor para alimentar el buscador del frontend sin requerir peticiones constantes a la DB.

---

## 4. Diseño de Interfaz y Flujo de Usuario (UX)

1.  **Pantalla Principal (Landing):** Presenta una cuadrícula cronológica. El usuario puede seleccionar un año para ver los resultados históricos o usar el panel lateral para búsquedas rápidas.
2.  **Vista de Año Histórico:** Muestra el Juego del Año (GOTY) y desglosa a los ganadores por categoría.
3.  **Flujo de Encuesta:** 
    *   Se ingresa a través de un banner destacado.
    *   El usuario navega mediante "pestañas" (Tabs) organizadas por año.
    *   Selecciona a sus ganadores a partir de los nominados reales y envía el formulario.
    *   Recibe un feedback visual (estadísticas actuales de la votación).

---

## 5. Límites Técnicos y Requisitos No Funcionales

Para mantener el espíritu pedagógico de "Laboratorio de Aplicaciones" y seguir las `.agyrules.md`, se aplican los siguientes límites:

### 5.1 Regla de Simplicidad Absoluta
El código debe estar escrito para ser interpretado a simple vista por un estudiante nivel principiante/intermedio. Se priorizan estructuras de control clásicas y verbosidad en nombres de variables por sobre "one-liners" complejos.

### 5.2 Restricción de Frameworks y Bibliotecas
*   **Prohibidos los Frameworks:** No se utilizará React, Angular, Vue, Tailwind, ni herramientas similares. Todo debe ser estructurado manualmente.
*   **Excepción con Bibliotecas:** El uso de librerías externas de terceros (ej: gráficos para estadísticas) **sólo está permitido en última instancia**, y exclusivamente si la implementación manual en Vanilla JS resulta ser desproporcionadamente compleja o bloquea el avance del proyecto.

### 5.3 Estándares de Codificación
*   **Separación de Responsabilidades:** Prohibidos los estilos en línea (`style=""`). Todo el código CSS debe residir en `/Css` y todo JavaScript en `/js`.
*   **Idioma:** Todo el código (nombres de funciones, variables) y la documentación o comentarios explicativos deberán estar en **Español**. Se espera un código ampliamente comentado explicando los flujos principales (Modo Tutor).
*   **Reutilización:** Antes de instanciar nuevos scripts u hojas de estilos, el agente correspondiente debe validar si la lógica puede acoplarse modularmente a un archivo existente sin perder legibilidad.

---

## 6. Entregables Esperados

1.  **Directorio Frontend Finalizado:** Vistas HTML (`index`, `encuesta`, páginas por año), `/Css` modularizado y scripts en `/js` (buscador y lógica de encuesta).
2.  **JSON Histórico de Datos:** Un archivo de datos curado con todos los nominados y ganadores.
3.  **API de Votación (Backend):** Scripts listos para ser desplegados que gestionen el CRUD de la encuesta.
4.  **Esquema de Base de Datos:** Archivo `.sql` o modelo de base de datos necesario para correr el proyecto.
