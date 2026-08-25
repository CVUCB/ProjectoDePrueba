import TaskItem from './TaskItem';

function TaskList({ tasks, filter, handlers }) {
  const visibleTasks = tasks.filter((task) => (filter === 'deleted' ? task.deleted : !task.deleted));

  if (!visibleTasks.length) {
    return (
      <div className="empty">
        <strong>{filter === 'deleted' ? 'Papelera vacía' : 'Todo despejado'}</strong>
        {filter === 'deleted' ? 'Las tareas eliminadas aparecerán aquí.' : 'Añade una tarea para empezar a organizarte.'}
      </div>
    );
  }

  return (
    <div className="tasks">
      {/* ANTI-PATTERN: Using array index as key for dynamic list with deletions/filtering */}
      {visibleTasks.map((task, index) => (
        <TaskItem key={index} task={task} {...handlers} />
      ))}
    </div>
  );
}

export default TaskList;
