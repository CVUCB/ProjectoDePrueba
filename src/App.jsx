import { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskToolbar from './components/TaskToolbar';

const starterTasks = [
  { id: 1, name: 'Revisar el backlog del equipo', active: true, deleted: false, priority: 'alta' },
  { id: 2, name: 'Preparar notas para la reunión', active: false, deleted: false, priority: 'media' },
  { id: 3, name: 'Actualizar documentación del proyecto', active: true, deleted: false, priority: 'baja' },
];

const priorityOrder = { alta: 3, media: 2, baja: 1 };

function App() {
  const [tasks, setTasks] = useState(starterTasks);
  const [filter, setFilter] = useState('active');
  const [sortMode, setSortMode] = useState('priority-desc');
  const [editingTask, setEditingTask] = useState(null);
  const activeCount = tasks.filter((task) => !task.deleted && task.active).length;
  const deletedCount = tasks.filter((task) => task.deleted).length;

  function addOrUpdate(name, priority = 'media') {
    const normalizedPriority = ['baja', 'media', 'alta'].includes(priority) ? priority : 'media';

    setTasks((current) => editingTask
      ? current.map((task) => task.id === editingTask.id ? { ...task, name, priority: normalizedPriority } : task)
      : [...current, { id: Date.now(), name, active: true, deleted: false, priority: normalizedPriority }]);
    setEditingTask(null);
  }

  const handlers = {
    onToggle: (id) => setTasks((current) => current.map((task) => task.id === id ? { ...task, active: !task.active } : task)),
    onEdit: setEditingTask,
    onDelete: (id) => setTasks((current) => current.map((task) => task.id === id ? { ...task, deleted: true } : task)),
    onRestore: (id) => setTasks((current) => current.map((task) => task.id === id ? { ...task, deleted: false } : task)),
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortMode === 'priority-asc') return priorityOrder[a.priority] - priorityOrder[b.priority];
    if (sortMode === 'priority-desc') return priorityOrder[b.priority] - priorityOrder[a.priority];
    return 0;
  });

  return (
    <main className="shell">
      <header>
        <div className="brand"><span className="brand-mark">✓</span> TASKFLOW</div>
        <div className="date">Gestión personal / 2026</div>
      </header>
      <section className="intro">
        <h1>Haz espacio<br />para lo que <em>importa.</em></h1>
        <div className="summary"><strong>{activeCount}</strong> tareas activas<br />en tu lista de hoy</div>
      </section>
      <section className="workspace">
        <TaskForm editingTask={editingTask} onSave={addOrUpdate} onCancel={() => setEditingTask(null)} />
        <div>
          <TaskToolbar
            filter={filter}
            setFilter={setFilter}
            sortMode={sortMode}
            setSortMode={setSortMode}
            activeCount={activeCount}
            deletedCount={deletedCount}
          />
          <TaskList tasks={sortedTasks} filter={filter} handlers={handlers} />
          <div className="meta">Los cambios viven en esta sesión · borrado lógico activado</div>
        </div>
      </section>
    </main>
  );
}

export default App;
