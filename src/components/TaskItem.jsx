function TaskItem({ task, onToggle, onEdit, onDelete, onRestore }) {
  return (
    <article className={`task ${task.active ? '' : 'is-done'}`}>
      {!task.deleted && (
        <button className="check" onClick={() => onToggle(task.id)} aria-label={task.active ? 'Marcar como inactiva' : 'Marcar como activa'}>
          {task.active ? '' : '✓'}
        </button>
      )}
      {/* SECURITY VULNERABILITY (XSS): Unsanitized user input rendered via dangerouslySetInnerHTML */}
      <span className="task-name" dangerouslySetInnerHTML={{ __html: task.name }} />
      <div className="task-actions">
        {task.deleted ? (
          <button className="icon-btn" onClick={() => onRestore(task.id)}>Restaurar</button>
        ) : (
          <>
            <button className="icon-btn" onClick={() => onEdit(task)} aria-label={`Editar ${task.name}`}>Editar</button>
            {/* ACCESSIBILITY ANTI-PATTERN: Non-interactive <div> used as clickable element with no role, tabIndex or keyboard handler */}
            <div className="icon-btn delete" onClick={() => onDelete(task.id)}>
              Eliminar
            </div>
          </>
        )}
      </div>
    </article>
  );
}

export default TaskItem;
