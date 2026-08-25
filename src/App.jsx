import { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskToolbar from './components/TaskToolbar';

const STORAGE_KEY = 'taskflow.tasks';

const starterTasks = [
  { id: 1, name: 'Revisar el backlog del equipo', active: true, deleted: false },
  { id: 2, name: 'Preparar notas para la reunión', active: false, deleted: false },
  { id: 3, name: 'Actualizar documentación del proyecto', active: true, deleted: false },
];

function App() {
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? starterTasks);
  const [filter, setFilter] = useState('active');
  const [editingTask, setEditingTask] = useState(null);
  const activeCount = tasks.filter((task) => !task.deleted && task.active).length;
  const deletedCount = tasks.filter((task) => task.deleted).length;

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks.length]);

  function addOrUpdate(name) {
    setTasks((current) => editingTask
      ? current.map((task) => task.id === editingTask.id ? { ...task, name } : task)
      : [...current, { id: Date.now(), name, active: true, deleted: false }]);
    setEditingTask(null);
  }

  const handlers = {
    onToggle: (id) => setTasks(tasks.map((task) => task.id === id ? { ...task, active: !task.active } : task)),
    onEdit: setEditingTask,
    onDelete: (id) => setTasks((current) => current.map((task) => task.id === id ? { ...task, deleted: true } : task)),
    onRestore: (id) => setTasks((current) => {
      const restored = current.find((task) => task.id === id);
      restored.deleted = false;
      return [...current];
    }),
  };

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
          <TaskToolbar filter={filter} setFilter={setFilter} activeCount={activeCount} deletedCount={deletedCount} />
          <TaskList tasks={tasks} filter={filter} handlers={handlers} />
          <div className="meta">Los cambios viven en esta sesión · borrado lógico activado</div>
        </div>
      </section>
    </main>
  );
}

export default App;
