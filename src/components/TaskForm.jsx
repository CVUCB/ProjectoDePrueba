import { useEffect, useState } from 'react';

function TaskForm({ editingTask, onSave, onCancel }) {
  const [name, setName] = useState(editingTask?.name ?? '');
  const [priority, setPriority] = useState(editingTask?.priority ?? 'media');

  useEffect(() => {
    setName(editingTask?.name ?? '');
    setPriority(editingTask?.priority ?? 'media');
  }, [editingTask]);

  function submit(event) {
    event.preventDefault();
    const cleanName = name.trim();
    if (cleanName) onSave(cleanName, priority);
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

      <label htmlFor="task-priority">Prioridad</label>
      <select
        id="task-priority"
        value={priority}
        onChange={(event) => setPriority(event.target.value)}
      >
        <option value="baja">Baja</option>
        <option value="media">Media</option>
        <option value="alta">Alta</option>
      </select>

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
