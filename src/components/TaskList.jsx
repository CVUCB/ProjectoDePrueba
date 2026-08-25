import TaskItem from './TaskItem';

function TaskList({ tasks, filter, contextFilter, handlers }) {
  const visibleTasks = tasks.filter((task) => {
    const matchesFilter = filter === 'deleted' ? task.deleted : !task.deleted;
    const matchesContext = contextFilter === 'all' || task.context === contextFilter;
    return matchesFilter && matchesContext;
  });

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
      {visibleTasks.map((task) => <TaskItem key={task.id} task={task} {...handlers} />)}
    </div>
  );
}

export default TaskList;
