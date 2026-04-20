# NeuroSync Manager

**NeuroSync Manager** es una plataforma web especializada para la gestión de datos en entornos de investigación neurofisiológica y sistemas de Interfaz Cerebro-Computador (BCI). El sistema permite centralizar el control de sujetos de prueba y el registro detallado de sesiones de adquisición de señales (como EEG), facilitando el seguimiento clínico y técnico de los experimentos en laboratorio.

---

## 🛠️ Tecnologías Utilizadas

- **Frontend:** [Vue.js 3](https://vuejs.org/) (Composition API)
- **Routing:** Vue Router (Guards para protección de rutas)
- **Estado/Memoria:** Servicio `appMemory` (Patrón Singleton/Observer)
- **Estilos:** CSS3 Moderno con diseño sobrio y técnico.
- **Backend:** JSON Server Auth para persistencia y manejo de usuarios.

---

## 🔧 Configuración e Instalación

### 1. Prerrequisitos
Tener instalado [Node.js](https://nodejs.org/).

### 2. Instalación de dependencias
Clona el repositorio, entra en la carpeta `ProyectoFinalVue` y ejecuta:
```bash
npm install
```
### 3. Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto y añade la configuración del backend:
```env
VITE_API_URL=http://localhost:3000
VITE_TIMEOUT=45000
```

## Ejecución del Proyecto

Sigue estos pasos para poner en marcha el sistema:

### Paso 1: Iniciar el Backend (Servidor de Datos)
En una terminal dedicada, ejecuta el comando para iniciar la base de datos y el servicio de autenticación:
```bash
npx json-server-auth db.json --port 3000
```

*Nota: El archivo `db.json` se encuentra incluido en la raíz para facilitar la revisión.*

### Paso 2: Iniciar el Frontend
En una nueva terminal, ejecuta:
```bash
npm run dev
```

Accede a la aplicación mediante el enlace generado (usualmente `http://localhost:5173`).

---

## 🔐 Acceso de Prueba

Puedes registrar un nuevo usuario mediante la vista de **Registro** o utilizar las siguientes credenciales de prueba:

- **Usuario:** `dilan@test.com`
- **Contraseña:** `123456`
