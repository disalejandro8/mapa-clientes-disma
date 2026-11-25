# Mapa de clientes Disma

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
El mapa se publica como app web de Google Apps Script, que pide iniciar sesión con Google y solo deja entrar a las cuentas de la lista `PERMITIDOS` en `apps_script/Codigo.gs`.

1. Entrar a https://script.google.com con arodriguez@dismitre.com.ar → **Nuevo proyecto**. Nombre: `Mapa clientes Disma`.
2. Reemplazar el contenido de `Código.gs` por el de `apps_script/Codigo.gs`.
3. **+ Archivos → HTML**, nombre `index` (sin .html), y pegar el contenido de `apps_script/index.html`.
4. **Implementar → Nueva implementación → Tipo: App web**.
   - Ejecutar como: **Usuario que accede a la app web**.
   - Quién tiene acceso: **Cualquier usuario con cuenta de Google** (hace falta para cuentas de fuera de dismitre.com.ar, como Gmail). Igual solo entran las cuentas de `PERMITIDOS`.
5. Autorizar los permisos que pide Google y copiar la **URL de la app web**: ese es el link para el equipo.

Para dar acceso a otra persona: agregar su mail en `PERMITIDOS` y hacer **Implementar → Administrar implementaciones → Editar → Versión nueva**.
Para actualizar el mapa: pegar el nuevo `index.html` en el archivo `index` y crear una versión nueva de la implementación (la URL no cambia).

GitHub Pages no se usa: una página de GitHub Pages es pública y no puede pedir login de Google de forma segura.
