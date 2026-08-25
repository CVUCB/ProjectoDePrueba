function TaskToolbar({ filter, setFilter, contextFilter, setContextFilter, activeCount, deletedCount, contextOptions }) {
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
      <div className="context-tabs" aria-label="Filtrar por contexto">
        <button className={`context-tab ${contextFilter === 'all' ? 'active' : ''}`} onClick={() => setContextFilter('all')}>
          Todas
        </button>
        {contextOptions.map((option) => (
          <button
            key={option}
            className={`context-tab ${contextFilter === option ? 'active' : ''}`}
            onClick={() => setContextFilter(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TaskToolbar;
