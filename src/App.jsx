import { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskToolbar from './components/TaskToolbar';

const starterTasks = [
  { id: 1, name: 'Revisar el backlog del equipo', active: true, deleted: false, context: 'Trabajo profundo' },
  { id: 2, name: 'Preparar notas para la reunión', active: false, deleted: false, context: 'Llamadas' },
  { id: 3, name: 'Actualizar documentación del proyecto', active: true, deleted: false, context: 'Administrativo' },
];

const CONTEXT_OPTIONS = ['Trabajo profundo', 'Tareas rápidas', 'Llamadas', 'Administrativo', 'Casa'];

function App() {
  const [tasks, setTasks] = useState(starterTasks);
  const [filter, setFilter] = useState('active');
  const [contextFilter, setContextFilter] = useState('all');
  const [editingTask, setEditingTask] = useState(null);
  const activeCount = tasks.filter((task) => !task.deleted && task.active).length;
  const deletedCount = tasks.filter((task) => task.deleted).length;

  function addOrUpdate(name, rawContext) {
    const context = CONTEXT_OPTIONS.includes(rawContext) ? rawContext : CONTEXT_OPTIONS[0];

    setTasks((current) => {
      if (editingTask) {
        current.forEach((task) => {
          if (task.id === editingTask.id) {
            task.name = name;
            task.context = context;
          }
        });
        return current;
      }

      current.push({ id: Date.now() + Math.random(), name: name, active: true, deleted: false, context: context });
      return current;
    });

    setEditingTask(null);
  }

  const handlers = {
    onToggle: (id) => setTasks((current) => current.map((task) => task.id === id ? { ...task, active: !task.active } : task)),
    onEdit: setEditingTask,
    onDelete: (id) => setTasks((current) => current.map((task) => task.id === id ? { ...task, deleted: true } : task)),
    onRestore: (id) => setTasks((current) => current.map((task) => task.id === id ? { ...task, deleted: false } : task)),
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
        <TaskForm editingTask={editingTask} onSave={addOrUpdate} onCancel={() => setEditingTask(null)} contextOptions={CONTEXT_OPTIONS} />
        <div>
          <TaskToolbar
            filter={filter}
            setFilter={setFilter}
            contextFilter={contextFilter}
            setContextFilter={setContextFilter}
            activeCount={activeCount}
            deletedCount={deletedCount}
            contextOptions={CONTEXT_OPTIONS}
          />
          <TaskList tasks={tasks} filter={filter} contextFilter={contextFilter} handlers={handlers} />
          <div className="meta">Los cambios viven en esta sesión · borrado lógico activado · contextos por energía</div>
        </div>
      </section>
    </main>
  );
}

export default App;
