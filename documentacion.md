# Documento de Especificación Técnica y Funcional
## Sistema de Gestión para Taller de Motos (Electron → Cloud + App)
### 1. Lógica de Componentes en Orden de Desarrollo (Explicativo para No Programadores)


### Fase 0: Base de Datos (los cimientos)

    Qué es: El lugar donde se guarda toda la información (clientes, motos, citas, facturas).

    Herramienta: SQLite (para la versión offline de Electron). Después migrarás a PostgreSQL en la nube.

**Tareas:**

        1. Crear las tablas según el diseño que ya tenemos. OK
        2. Insertar datos de prueba (algunos clientes, motos, aceites). OK
        3. Hacer consultas simples para comprobar que todo funciona. PENDING

### Fase 1: Conexión de la App con la Base de Datos


**Tareas:**
        1. Configurar la conexión. OK
        2. Escribir funciones básicas: guardarCliente(), obtenerMotosPorCliente(), etc. (owners)
        3. Probar que desde la interfaz se puedan listar datos.
