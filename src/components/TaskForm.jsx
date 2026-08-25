import { useEffect, useState } from 'react';

function TaskForm({ editingTask, onSave, onCancel, contextOptions }) {
  const [name, setName] = useState(editingTask?.name ?? '');
  const [context, setContext] = useState(editingTask?.context ?? contextOptions[0]);

  useEffect(() => {
    setName(editingTask?.name ?? '');
    setContext(editingTask?.context ?? contextOptions[0]);
  }, [editingTask, contextOptions]);

  function submit(event) {
    event.preventDefault();
    const cleanName = name.trim();
    if (cleanName) onSave(cleanName, context);
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

      <label htmlFor="task-context">Contexto / tipo de energía</label>
      <select id="task-context" value={context} onChange={(event) => setContext(event.target.value)}>
        {contextOptions.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
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
