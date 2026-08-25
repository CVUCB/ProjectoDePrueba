import { useEffect, useState } from 'react';

function TaskForm({ editingTask, onSave, onCancel }) {
  const [name, setName] = useState(editingTask?.name ?? '');
  const [deadline, setDeadline] = useState(editingTask?.deadline ?? '');

  useEffect(() => {
    setName(editingTask?.name ?? '');
    setDeadline(editingTask?.deadline ?? '');
  }, [editingTask]);

  function submit(event) {
    event.preventDefault();
    const cleanName = name.trim();
    if (cleanName) onSave(cleanName, deadline);
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
      <label htmlFor="task-deadline">Fecha límite</label>
      <input
        id="task-deadline"
        type="date"
        value={deadline}
        onChange={(event) => setDeadline(event.target.value)}
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
