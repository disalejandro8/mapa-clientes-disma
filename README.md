# Mapa de clientes Disma

**Link para entrar (login con Google):** https://script.google.com/macros/s/AKfycbzjZx6uqqpowzzUW9JYnkdCgS3P-AF1HjvgjDDFi3H7UYp5nYyLhMfU9vyf1s8RqI9AOQ/exec

Cuentas con acceso: arodriguez@dismitre.com.ar, ppaez@dismitre.com.ar, disalejandro@gmail.com.
La primera vez Google pide autorizar la app ("Revisar permisos" → Configuración avanzada → Ir a Mapa clientes Disma).

Herramienta para cortar la base de clientes de Disma por zonas, asignar vendedor, equipo y día de visita, y bajar el resultado a Excel.

## Cómo se usa
1. Abrir `index.html` en Chrome o Edge (con internet, para ver las calles).
2. Cargar el CSV o Excel de la base, bajado de BigQuery:
   ```sql
   SELECT * FROM `sigma-bigquery.cruce_clientes.base_final_8000` ORDER BY total_comprado DESC
   ```
3. Elegir la capa de trabajo (Autoservicios, Mayoristas y perfupaña, Resto / call center), dibujar cuadrantes, asignar vendedor y día.
4. Bajar el Excel: trae las columnas `vendedor_asignado`, `dia_visita`, `equipo` y `cuadrante`, y las hojas Asignados, Clientes, Resumen y Cuadrantes.

El archivo no contiene datos de clientes: la base se carga cada vez que se abre.
Las asignaciones y los cuadrantes se guardan en el navegador de cada usuario; para pasarlos a otra persona se le manda el Excel bajado del mapa.

## Colores
- Por defecto, cada vendedor tiene un color fijo. Los clientes que ya son de Disma tienen borde fino; los nuevos que se le asignan, anillo negro.
- También se puede colorear por categoría, clase de autoservicio (A/B/C por compra), acción (queda / entra), equipo o día.

## Publicar con login de Google (Apps Script)
El mapa se publica como app web de Google Apps Script (cuenta arodriguez@dismitre.com.ar). Pide iniciar sesión con Google y solo deja entrar a las cuentas de la lista `PERMITIDOS` en `apps_script/Codigo.gs`.
La app lee el `index.html` de este repositorio, así que **cada cambio que se sube a GitHub queda publicado solo** (hasta 10 minutos de demora por la caché).

Configuración de la implementación (App web):
- Ejecutar como: **Usuario que accede a la app web**.
- Quién tiene acceso: **Cualquier usuario con cuenta de Google** (hace falta para cuentas de fuera de dismitre.com.ar). Igual solo entran las cuentas de `PERMITIDOS`.

Para dar acceso a otra persona: agregar su mail en `PERMITIDOS` (en Apps Script) y hacer **Implementar → Administrar implementaciones → Editar → Versión nueva**. La URL no cambia.

GitHub Pages no se usa: una página de GitHub Pages es pública y no puede pedir login de Google de forma segura.
