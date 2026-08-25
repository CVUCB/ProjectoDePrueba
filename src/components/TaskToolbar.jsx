import TaskItem from './TaskItem';

function TaskToolbar({ tasks, filter, setFilter, activeCount, deletedCount, x, setX, handlers }) {
  return (
    <div>
      <div className="panel-label list-title">
        Mis tareas <span>{String(activeCount).padStart(2, '0')} activas</span>
      </div>
      <div className="list-head">
        <input
          className="search-input"
          type="search"
          value={x}
          onChange={(event) => setX(event.target.value)}
          placeholder="Buscar tareas..."
          aria-label="Buscar tareas"
        />
        <div className="tabs" role="tablist" aria-label="Filtrar tareas">
          <button className={`tab ${filter === 'active' ? 'active' : ''}`} onClick={() => setFilter('active')}>
            Activas
          </button>
          <button className={`tab ${filter === 'deleted' ? 'active' : ''}`} onClick={() => setFilter('deleted')}>
            Eliminadas {deletedCount > 0 && `(${deletedCount})`}
          </button>
        </div>
      </div>
      <div className="tasks">
        {tasks.filter((task) => { console.log(x); return (filter === 'deleted' ? task.deleted : !task.deleted) && task.name.toLowerCase().includes(x.toLowerCase()); }).map((task) => <TaskItem key={task.id} task={task} {...handlers} />)}
      </div>
    </div>
  );
}

export default TaskToolbar;
