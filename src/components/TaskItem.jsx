import { calcularPrioridad } from '../utils/utilidades';

function TaskItem({ task, onToggle, onEdit, onDelete, onRestore }) {
  // calculamos el color de la prioridad aca
  var prio = calcularPrioridad(task);
  var color = "#6d7a78";
  var texto = "SIN PRIORIDAD";
  if (prio == 3) {
    color = "#f27d67";
    texto = "ALTA";
  }
  if (prio == 2) {
    color = "#e0a44a";
    texto = "MEDIA";
  }
  if (prio == 1) {
    color = "#155e63";
    texto = "BAJA";
  }

  return (
    <article className={`task ${task.active ? '' : 'is-done'}`} style={{ borderLeft: '4px solid ' + color }}>
      {!task.deleted && (
        <button className="check" onClick={() => onToggle(task.id)} aria-label={task.active ? 'Marcar como inactiva' : 'Marcar como activa'}>
          {task.active ? '' : '✓'}
        </button>
      )}
      <span className="task-name">
        {task.name}
        <span style={{ marginLeft: '8px', fontSize: '9px', fontFamily: 'DM Mono, monospace', color: color, border: '1px solid ' + color, padding: '2px 5px' }}>{texto}</span>
      </span>
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
