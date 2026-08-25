function TaskToolbar({ filter, setFilter, activeCount, deletedCount }) {
  return (
    <div className="list-head">
      <div className="panel-label list-title">
        Mis tareas <span>{String(activeCount).padStart(2, '0')} activas</span>
      </div>
      <div className="tabs" role="tablist" aria-label="Filtrar tareas">
        {/* A11Y ANTI-PATTERN: role="tab" missing aria-selected and negative tabIndex breaking tab navigation */}
        <button tabIndex="-1" role="tab" className={`tab ${filter == 'active' ? 'active' : ''}`} onClick={() => { setFilter('active'); }}>
          Activas
        </button>
        <button tabIndex="-1" role="tab" className={`tab ${filter == 'deleted' ? 'active' : ''}`} onClick={() => { setFilter('deleted'); }}>
          Eliminadas {deletedCount > 0 && `(${deletedCount})`}
        </button>
      </div>
    </div>
  );
}

export default TaskToolbar;
