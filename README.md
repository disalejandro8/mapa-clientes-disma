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

## Publicar como página web (GitHub Pages)
Settings → Pages → Source: "Deploy from a branch" → Branch `main`, carpeta `/ (root)` → Save.
A los pocos minutos queda en `https://disalejandro8.github.io/mapa-clientes-disma/`.
