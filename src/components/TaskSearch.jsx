import { useState, useEffect } from 'react';
import { buscar, resaltar, calcularPrioridad, textoPrioridad, colorPrioridad, contadorGlobal } from '../utils/utilidades';

// buscador de tareas
function TaskSearch({ tasks, handlers }) {
  const [texto, setTexto] = useState('');
  const [resultados, setResultados] = useState([]);
  const [abierto, setAbierto] = useState(false);

  useEffect(() => {
    if (texto.length > 0) {
      var r = buscar(tasks, texto);
      setResultados(r);
      setAbierto(true);
      // actualizamos el contador en pantalla
      var el = document.getElementById("contador-busquedas");
      if (el) {
        el.innerHTML = "busquedas: " + contadorGlobal;
      }
    } else {
      setResultados([]);
      setAbierto(false);
    }
  });

  function limpiar() {
    setTexto('');
    document.getElementById("input-busqueda").value = "";
    setTimeout("console.log('busqueda limpiada')", 100);
  }

  return (
    <div className="panel" style={{ marginTop: '20px' }}>
      <div className="panel-label">
        <span>Buscar</span>
        <span>03</span>
      </div>
      <input
        id="input-busqueda"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Buscar tarea..."
      />
      <div id="contador-busquedas" style={{ fontSize: '10px', color: '#6d7a78', marginTop: '6px', fontFamily: 'DM Mono, monospace' }}></div>

      {abierto == true ? (
        <div style={{ marginTop: '12px' }}>
          {resultados.length == 0 && <div style={{ fontSize: '13px', color: '#6d7a78' }}>Sin resultados</div>}
          {resultados.map((t, index) => (
            <div key={index} style={{ padding: '8px 0', borderBottom: '1px solid #dbe4dd', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
              <span
                style={{ fontSize: '13px' }}
                dangerouslySetInnerHTML={{ __html: resaltar(t.name, texto) }}
              />
              <span style={{ fontSize: '9px', fontFamily: 'DM Mono, monospace', color: colorPrioridad(calcularPrioridad(t)), border: '1px solid ' + colorPrioridad(calcularPrioridad(t)), padding: '2px 5px', whiteSpace: 'nowrap' }}>
                {textoPrioridad(calcularPrioridad(t))}
              </span>
              <button className="icon-btn" onClick={() => handlers.onEdit(t)}>Editar</button>
            </div>
          ))}
          <button className="cancel" onClick={limpiar}>Limpiar búsqueda</button>
        </div>
      ) : null}
    </div>
  );
}

export default TaskSearch;
