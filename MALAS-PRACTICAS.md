# Malas prácticas introducidas a propósito

> ⚠️ Este código es un **ejercicio de clase**. Las funcionalidades nuevas están escritas
> deliberadamente mal para que un análisis estático (SonarQube, ESLint) o un code review
> encuentre hallazgos. **No desplegar ni usar como base de un proyecto real.**

## Funcionalidades nuevas

| Funcionalidad | Archivo |
|---|---|
| Búsqueda de tareas con resaltado | [TaskSearch.jsx](src/components/TaskSearch.jsx) |
| Prioridad automática por nombre | [utilidades.js](src/utils/utilidades.js) |
| Panel de estadísticas | [TaskStats.jsx](src/components/TaskStats.jsx) |
| Exportar CSV / JSON / TXT | [TaskStats.jsx](src/components/TaskStats.jsx) |
| Estimador de horas por fórmula | [TaskStats.jsx](src/components/TaskStats.jsx) |
| Acciones masivas (duplicar, borrar todo) | [App.jsx](src/App.jsx) |
| Ordenar por prioridad | [App.jsx](src/App.jsx) |
| "Modo administrador" | [TaskStats.jsx](src/components/TaskStats.jsx) |

## Inventario de smells

### Seguridad
- **Secretos hardcodeados**: `API_KEY` y `PASSWORD_ADMIN` en [utilidades.js:6-11](src/utils/utilidades.js#L6-L11) (valores falsos).
  > Dato del ejercicio: el primer intento usaba una clave con formato `sk_live_...` y **GitHub Push Protection rechazó el push** por detectarla como clave de Stripe. Se cambió por un valor que no imita a ningún proveedor real. Moraleja: el secret scanning corre antes del merge, no después.
- **`eval()` sobre input del usuario**: `estimarHoras()` en [utilidades.js:85-92](src/utils/utilidades.js#L85-L92). El build de Vite ya lo avisa.
- **XSS vía `dangerouslySetInnerHTML`**: `resaltar()` inyecta el nombre de la tarea sin escapar ([TaskSearch.jsx:56](src/components/TaskSearch.jsx#L56)). Probar con una tarea llamada `<img src=x onerror=alert(1)>`.
- **`setTimeout` con string** (eval implícito): [TaskSearch.jsx:29](src/components/TaskSearch.jsx#L29).
- **Fuga de información**: la contraseña se muestra en el `alert` de error y la API key se imprime por `console.log`.
- **HTTP sin TLS** en `CONFIG.URL`.

### Corrección / bugs reales
- **Mutación directa del estado de React**: `duplicarTodas()` y `ordenar()` en App.jsx, `borrarTodo()` y `marcarTodasActivas()` en TaskStats.jsx mutan el array y llaman `setTasks(mismaReferencia)`. Solo se ve el cambio porque hay un `tick`/`refrescar` que fuerza el render — bug latente.
- **`useEffect` sin array de dependencias**: [TaskSearch.jsx:11-27](src/components/TaskSearch.jsx#L11-L27) corre en cada render.
- **Manipulación directa del DOM en React**: `document.getElementById(...).innerHTML` conviviendo con el estado.
- **`key={index}`** en la lista de resultados.
- **División por cero**: `promedio` y `porcentaje` en TaskStats si no hay tareas (`0/0 = NaN`).
- **`masLarga.substring(0,18)`** siempre concatena `"..."` aunque el texto sea corto.
- **`id: Date.now() + i`** puede colisionar con ids existentes.
- **`catch` vacío** que se traga el error.

### Mantenibilidad
- **Complejidad ciclomática altísima**: `calcularPrioridad()` con 6 niveles de anidamiento y returns redundantes.
- **Código duplicado**: la lógica de color/texto de prioridad está copiada en `utilidades.js`, `TaskItem.jsx` y `TaskSearch.jsx`.
- **God component**: `TaskStats` mezcla estadísticas, exportación, cálculo, acciones masivas y autenticación.
- **Algoritmos ineficientes**: `buscar()` con doble bucle O(n²) sin motivo; ordenamiento burbuja.
- **`var` en todo el código**, `==` en vez de `===`, comparaciones `== true` / `== false`.
- **Números y strings mágicos** (3, 2, 1, `"csv"`, colores hex repetidos).
- **Estado global mutable**: `contadorGlobal` y `cache` importados entre módulos.
- **Estilos inline** por todas partes en vez de `styles.css`.
- **`console.log` de depuración** dejados en producción, `CONFIG.debug = true`.
- **Comentarios obsoletos, TODO viejo y código muerto comentado** al final de `utilidades.js`.
- **Nombres pobres**: `t`, `p`, `r`, `s`, `h`, `tmp`, `el`.
- **`alert()`** como UI.
- **Acción destructiva sin confirmación**: "Borrar todo".
- **Mezcla de idiomas**: identificadores en español conviviendo con el código original en inglés.
