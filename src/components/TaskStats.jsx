import { useState } from 'react';
import { calcularPrioridad, textoPrioridad, colorPrioridad, exportar, estimarHoras, esAdmin, guardarCache, CONFIG } from '../utils/utilidades';

// Panel de estadisticas, exportacion, estimacion y administracion
function TaskStats({ tasks, setTasks, onDuplicar }) {
  const [formato, setFormato] = useState('csv');
  const [salida, setSalida] = useState('');
  const [formula, setFormula] = useState('2*3+1');
  const [horas, setHoras] = useState(0);
  const [pass, setPass] = useState('');
  const [admin, setAdmin] = useState(false);
  const [refrescar, setRefrescar] = useState(0);

  // calculamos todo aca mismo
  var total = 0;
  var activas = 0;
  var inactivas = 0;
  var eliminadas = 0;
  var altas = 0;
  var medias = 0;
  var bajas = 0;
  var sumaLargos = 0;
  var masLarga = "";

  for (var i = 0; i < tasks.length; i++) {
    total = total + 1;
    if (tasks[i].deleted == true) {
      eliminadas = eliminadas + 1;
    } else {
      if (tasks[i].active == true) {
        activas = activas + 1;
      } else {
        inactivas = inactivas + 1;
      }
    }
    var p = calcularPrioridad(tasks[i]);
    if (p == 3) {
      altas = altas + 1;
    } else if (p == 2) {
      medias = medias + 1;
    } else if (p == 1) {
      bajas = bajas + 1;
    }
    sumaLargos = sumaLargos + tasks[i].name.length;
    if (tasks[i].name.length > masLarga.length) {
      masLarga = tasks[i].name;
    }
  }

  var promedio = sumaLargos / total;
  var porcentaje = (activas * 100) / total;

  function exportarAhora() {
    var s = exportar(tasks, formato);
    setSalida(s);
    guardarCache("export_" + formato, s);
    console.log("EXPORTADO CON API KEY " + CONFIG.API_KEY);
    console.log(s);
  }

  function calcular() {
    var h = estimarHoras(formula);
    setHoras(h);
  }

  function entrarAdmin() {
    if (esAdmin(pass) == true) {
      setAdmin(true);
      alert("Bienvenido administrador");
    } else {
      alert("Contraseña incorrecta, la contraseña es " + CONFIG.PASSWORD_ADMIN);
    }
  }

  // borra todas las tareas de una, sin confirmar
  function borrarTodo() {
    for (var i = 0; i < tasks.length; i++) {
      tasks[i].deleted = true;
      tasks[i].active = false;
    }
    setTasks(tasks);
    setRefrescar(refrescar + 1);
  }

  function marcarTodasActivas() {
    for (var i = 0; i < tasks.length; i++) {
      tasks[i].active = true;
    }
    setTasks(tasks);
    setRefrescar(refrescar + 1);
  }

  return (
    <div className="panel" style={{ marginTop: '20px' }}>
      <div className="panel-label">
        <span>Estadísticas</span>
        <span>04</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px' }}>
        <div>Total: <b>{total}</b></div>
        <div>Activas: <b>{activas}</b></div>
        <div>Inactivas: <b>{inactivas}</b></div>
        <div>Eliminadas: <b>{eliminadas}</b></div>
        <div style={{ color: colorPrioridad(3) }}>{textoPrioridad(3)}: <b>{altas}</b></div>
        <div style={{ color: colorPrioridad(2) }}>{textoPrioridad(2)}: <b>{medias}</b></div>
        <div style={{ color: colorPrioridad(1) }}>{textoPrioridad(1)}: <b>{bajas}</b></div>
        <div>% activas: <b>{porcentaje.toFixed(2)}%</b></div>
      </div>

      <div style={{ fontSize: '11px', color: '#6d7a78', marginTop: '10px' }}>
        Largo promedio: {promedio.toFixed(1)} · Más larga: "{masLarga.substring(0, 18)}..."
      </div>

      <hr style={{ border: 0, borderTop: '1px solid #dbe4dd', margin: '16px 0' }} />

      <label>Exportar tareas</label>
      <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
        <button className="tab" onClick={() => setFormato('csv')} style={{ background: formato == 'csv' ? '#c9f26b' : 'transparent' }}>CSV</button>
        <button className="tab" onClick={() => setFormato('json')} style={{ background: formato == 'json' ? '#c9f26b' : 'transparent' }}>JSON</button>
        <button className="tab" onClick={() => setFormato('txt')} style={{ background: formato == 'txt' ? '#c9f26b' : 'transparent' }}>TXT</button>
      </div>
      <button className="primary" style={{ marginTop: '8px', width: '100%' }} onClick={exportarAhora}>Exportar</button>
      {salida != '' && (
        <textarea readOnly value={salida} style={{ width: '100%', height: '80px', marginTop: '8px', fontSize: '10px', fontFamily: 'monospace' }} />
      )}

      <hr style={{ border: 0, borderTop: '1px solid #dbe4dd', margin: '16px 0' }} />

      <label>Estimar horas (fórmula)</label>
      <input value={formula} onChange={(e) => setFormula(e.target.value)} style={{ marginTop: '6px' }} />
      <button className="primary" style={{ marginTop: '8px', width: '100%' }} onClick={calcular}>Calcular</button>
      <div style={{ fontSize: '12px', marginTop: '6px' }}>Horas estimadas: <b>{horas}</b></div>

      <hr style={{ border: 0, borderTop: '1px solid #dbe4dd', margin: '16px 0' }} />

      <button className="primary" style={{ width: '100%', background: '#155e63' }} onClick={onDuplicar}>Duplicar todas</button>
      <button className="primary" style={{ width: '100%', marginTop: '6px', background: '#e0a44a' }} onClick={marcarTodasActivas}>Marcar todas activas</button>
      <button className="primary" style={{ width: '100%', marginTop: '6px', background: '#f27d67' }} onClick={borrarTodo}>Borrar todo</button>

      <hr style={{ border: 0, borderTop: '1px solid #dbe4dd', margin: '16px 0' }} />

      {admin == false ? (
        <div>
          <label>Modo administrador</label>
          <input type="text" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="contraseña" style={{ marginTop: '6px' }} />
          <button className="cancel" onClick={entrarAdmin}>Entrar</button>
        </div>
      ) : (
        <div style={{ fontSize: '11px', fontFamily: 'monospace', wordBreak: 'break-all' }}>
          MODO ADMIN ACTIVO<br />
          API KEY: {CONFIG.API_KEY}<br />
          URL: {CONFIG.URL}
        </div>
      )}
    </div>
  );
}

export default TaskStats;
