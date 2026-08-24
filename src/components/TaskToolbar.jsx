function TaskToolbar({ filter, setFilter, activeCount, deletedCount }) {
  return (
    <div className="list-head">
      <div className="panel-label list-title">
        Mis tareas <span>{String(activeCount).padStart(2, '0')} activas</span>
      </div>
      <div className="tabs" role="tablist" aria-label="Filtrar tareas">
        <button className={`tab ${filter === 'active' ? 'active' : ''}`} onClick={() => setFilter('active')}>
          Activas
        </button>
        <button className={`tab ${filter === 'deleted' ? 'active' : ''}`} onClick={() => setFilter('deleted')}>
          Eliminadas {deletedCount > 0 && `(${deletedCount})`}
        </button>
      </div>
    </div>
  );
}

export default TaskToolbar;
