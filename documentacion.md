# Documento de Especificación Técnica y Funcional
## Sistema de Gestión para Taller de Motos (Electron → Cloud + App)
### 1. Lógica de Componentes en Orden de Desarrollo (Explicativo para No Programadores)


### Fase 0: Base de Datos (los cimientos)

    Qué es: El lugar donde se guarda toda la información (clientes, motos, citas, facturas).

    Herramienta: SQLite (para la versión offline de Electron). Después migrarás a PostgreSQL en la nube.

**Tareas:**

        1. Crear las tablas según el diseño que ya tenemos.
        2. Insertar datos de prueba (algunos clientes, motos, aceites).
        3. Hacer consultas simples para comprobar que todo funciona.

### Fase 1: Conexión de la App con la Base de Datos


**Tareas:**

        1. Configurar la conexión.
        2. Escribir funciones básicas: guardarCliente(), obtenerMotosPorCliente(), etc.
        3. Probar que desde la interfaz se puedan listar datos.

### Fase 2: Pantalla de Gestión de Clientes y Motos (las habitaciones)


        1. Listado de clientes: tabla con nombre, teléfono, email.

        2. Botón “Nuevo Cliente”: abre un formulario con campos (nombre, apellidos, identificación, etc.).

        3. Detalle de cliente: al hacer clic en un cliente, ver sus datos y sus motos.

        4. Subcomponente “Motos” dentro del detalle: botón “Añadir Moto”, formulario con placa, color, modelo, cilindraje, aceite preferido.

        5. Búsquedas: por placa, por cédula, por teléfono.

### Fase 3: Mantenimientos y Taller (el motor de la app)

    Componentes:

        1. Listado de mantenimientos (por moto o general).
        2. Botón “Nuevo Mantenimiento” -> formulario con:
        3. Fecha, kilometraje actual, kilometraje próximo sugerido.
        4. Selección de aceites usados (pueden ser varios).
        5. Selección de procedimientos realizados (cambio de frenos, ajuste de cadena…).
        6. Selección de partes usadas (bujía, pastillas de freno…) con cantidad y precio.
        7. Notas del mecánico.
        8. Botón “Finalizar Mantenimiento” que calcula costes y permite crear factura.
        9. Historial por moto: gráfico de kilometraje vs fecha.

### Fase 4: Citas y Turnos (la agenda)

    Componentes:

        1. Vista de calendario (semana o día).
        2. Botón “Nueva Cita” -> formulario: seleccionar moto, fecha/hora, tipo de servicio, notas.
        3. Listado de citas del día con estado (pendiente, confirmada, en taller, completada).

        4. Botón “Convertir cita en mantenimiento” al llegar la moto.

### Fase 5: Facturación y Pagos (la caja)

    Componentes:

        1. Listado de facturas (filtro por pagado/pendiente).
        2. Botón “Nueva Factura” -> normalmente se crea desde un mantenimiento finalizado.
        3. Detalle de factura: subtotal, IVA, descuento, total, método de pago.
        4. Botón “Registrar Pago” cambia el estado a “pagada”.

### Fase 6: Usuarios y Permisos (la seguridad)

    Componentes:

        1. Pantalla de login.
        2. Gestión de usuarios (solo admin): alta, baja, cambio de rol.
        3. Restringir botones según rol (ej: solo admin ve reportes financieros).

### Fase 7: Notificaciones y Recordatorios (el asistente automático)

    Qué es: Enviar mensajes a los clientes (por ahora internos, luego por WhatsApp/email).

    Componentes:

        1. Configuración de recordatorios: cada cuántos km o meses avisar.
        2. Panel de notificaciones pendientes (se generan automáticamente al hacer un mantenimiento).
        3. Botón “Enviar ahora” (en la versión cloud podrá ser automático).

### Fase 8: Sincronización Offline → Cloud (el puente a Internet)

    Qué es: Para cuando tengas la versión en la nube y la app móvil, los datos locales subirán automáticamente.

    Componentes:

        1. Tabla sincronizacion_pendiente guarda los cambios hechos sin Internet.
        2. Módulo “Sincronizar” con botón manual y proceso en segundo plano.
        3. Conflictos: regla (gana el servidor o gana el local según el caso).

2. Dashboard (Diseño para persona sin sentido estético)

No puedo dibujar imágenes, pero te describiré cómo debe verse y te doy un “wireframe” con caracteres.
Objetivo del Dashboard

Que de un vistazo sepa:

    Cuántas citas hay hoy.

    Cuántos mantenimientos están en curso.

    Ingresos del día/semana.

    Próximos recordatorios (motos que necesitan aceite).

Distribución (2 columnas)
text

+---------------------------------------------------+
|  LOGO          TALLER MOTOS "RUEDAS RÁPIDAS"      |
|                Hoy: 15 Abril 2026                 |
+---------------------------------------------------+
|  [Menú lateral]   |   Área principal              |
|  - Clientes       |                               |
|  - Motos          |   +-----------------------+   |
|  - Mantenimientos |   | Citas de hoy          |   |
|  - Citas          |   | 10:00 - Juan Pérez    |   |
|  - Facturación    |   | 11:30 - Ana Gómez     |   |
|  - Informes       |   | 12:00 - Moto YBR      |   |
|  - Configuración  |   +-----------------------+   |
|                   |                               |
|                   |   +-----------------------+   |
|                   |   | En taller (3)          |   |
|                   |   | • Moto ABC-123         |   |
|                   |   | • Moto DEF-456         |   |
|                   |   +-----------------------+   |
|                   |                               |
|                   |   +-----------------------+   |
|                   |   | Ingresos hoy: $85.000 |   |
|                   |   | Meta semanal: $450k   |   |
|                   |   +-----------------------+   |
|                   |                               |
|                   |   +-----------------------+   |
|                   |   | Próximos recordatorios |   |
|                   |   | • Moto XYZ (300km)     |   |
|                   |   +-----------------------+   |
+---------------------------------------------------+

Colores recomendados (si usas CSS)

    Fondo principal: Gris muy claro (#F5F5F5)

    Tarjetas: Blanco con sombra suave

    Bordes: Gris (#DDD)

    Botones primarios: Azul (#007BFF) con texto blanco

    Botones peligro (cancelar): Rojo (#DC3545)

    Texto: Negro suave (#333)

    Éxito (pagado, completado): Verde (#28A745)

Fuente

    Usa system-ui o Segoe UI – son legibles y no requieren diseño.

Mobile (para la futura app)

    El menú lateral se colapsa en un icono hamburguesa (☰).

    Las tarjetas ocupan todo el ancho y se apilan verticalmente.
