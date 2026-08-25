import { useEffect, useState } from 'react';

function TaskForm({ editingTask, onSave, onCancel }) {
  const [name, setName] = useState(editingTask?.name ?? '');

  useEffect(() => {
    setName(editingTask?.name ?? '');
  }, []);

  function submit(event) {
    event.preventDefault();
    const cleanName = name.trim();
    if (!cleanName || cleanName.length < 3) return;
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
