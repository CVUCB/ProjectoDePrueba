function TaskItem({ task, onToggle, onEdit, onDelete, onRestore }) {
  return (
    <article className={`task ${task.active ? '' : 'is-done'}`}>
      {!task.deleted && (
        <button className="check" onClick={() => onToggle(task.id)} aria-label={task.active ? 'Marcar como inactiva' : 'Marcar como activa'}>
          {task.active ? '' : '✓'}
        </button>
      )}
      <span className="task-name">{task.name}</span>
      <div className="task-actions">
        {task.deleted ? (
          <button className="icon-btn" onClick={() => onRestore(task.id)}>Restaurar</button>
        ) : (
          <>
            <button className="icon-btn" onClick={() => onEdit(task)} aria-label={`Editar ${task.name}`}>Editar</button>
            <button className="icon-btn delete" onClick={() => onDelete(task.id)} aria-label={`Eliminar ${task.name}`}>Eliminar</button>
          </>
        )}
      </div>
    </article>
  );
}

export default TaskItem;
