function TaskToolbar({ filter, setFilter, sortMode, setSortMode, activeCount, deletedCount }) {
  return (
    <div className="list-head">
      <div className="panel-label list-title">
        Mis tareas <span>{String(activeCount).padStart(2, '0')} activas</span>
      </div>
      <div className="toolbar-actions">
        <div className="tabs" role="tablist" aria-label="Filtrar tareas">
          <button className={`tab ${filter === 'active' ? 'active' : ''}`} onClick={() => setFilter('active')}>
            Activas
          </button>
          <button className={`tab ${filter === 'deleted' ? 'active' : ''}`} onClick={() => setFilter('deleted')}>
            Eliminadas {deletedCount > 0 && `(${deletedCount})`}
          </button>
        </div>

        <label className="sort-wrap">
          <span>Orden</span>
          <select value={sortMode} onChange={(event) => setSortMode(event.target.value)}>
            <option value="manual">Manual</option>
            <option value="priority-desc">Mayor prioridad</option>
            <option value="priority-asc">Menor prioridad</option>
          </select>
        </label>
      </div>
    </div>
  );
}

export default TaskToolbar;
