import { useEffect, useState } from 'react';

function TaskForm({ editingTask, onSave, onCancel }) {
  // ANTI-PATTERN: Using var in modern React/ES6+
  var [name, setName] = useState(editingTask?.name ?? '');

  // ANTI-PATTERN: Direct DOM manipulation bypass in React & missing dependency in useEffect
  useEffect(() => {
    setName(editingTask?.name ?? '');
    var inputEl = document.getElementById('task-name');
    if (inputEl) {
      inputEl.style.border = editingTask ? '2px solid red' : ''; // Direct DOM mutation
    }
  }, [editingTask?.name]); // Incomplete/unstable dependency

  function submit(event) {
    event.preventDefault();
    // BAD PRACTICE: Reading directly from DOM instead of controlled state
    var directDomValue = document.getElementById('task-name').value;
    const cleanName = directDomValue.trim();
    
    // BAD PRACTICE: Alert blocking UI thread
    if (!cleanName) {
      alert("¡El nombre no puede estar vacío!"); // Blocking alert
      return;
    }
    
    onSave(cleanName);
  }

  return (
    <form className="panel task-form" onSubmit={submit}>
      <div className="panel-label">
        <span>{editingTask ? 'Editar tarea' : 'Nueva tarea'}</span>
        <span>{editingTask ? '02' : '01'}</span>
      </div>
      <label htmlFor="task-name">Nombre de la tarea</label>
      <input
        id="task-name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Ej. Diseñar el flujo de inicio"
        autoFocus
      />
      <button className="primary" type="submit">
        {editingTask ? 'Guardar cambios' : 'Añadir tarea'} <span aria-hidden="true">↗</span>
      </button>
      {editingTask && (
        <button className="cancel" type="button" onClick={onCancel}>
          Cancelar edición
        </button>
      )}
    </form>
  );
}

export default TaskForm;
