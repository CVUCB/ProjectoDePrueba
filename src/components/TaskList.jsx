import TaskItem from './TaskItem';

function TaskList({ tasks, filter, handlers, getRemainingTime }) {
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
      {visibleTasks.map((task) => <TaskItem key={task.id} task={task} getRemainingTime={getRemainingTime} {...handlers} />)}
    </div>
  );
}

export default TaskList;
