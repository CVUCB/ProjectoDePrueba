import { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskToolbar from './components/TaskToolbar';

const starterTasks = [
  { id: 1, name: 'Revisar el backlog del equipo', active: true, deleted: false, deadline: '2026-08-26' },
  { id: 2, name: 'Preparar notas para la reunión', active: false, deleted: false, deadline: '2026-08-25' },
  { id: 3, name: 'Actualizar documentación del proyecto', active: true, deleted: false, deadline: '' },
];

function App() {
  const [tasks, setTasks] = useState(starterTasks);
  const [filter, setFilter] = useState('active');
  const [editingTask, setEditingTask] = useState(null);
  const activeCount = tasks.filter((task) => !task.deleted && task.active).length;
  const deletedCount = tasks.filter((task) => task.deleted).length;

  function addOrUpdate(name, deadline) {
    setTasks((current) => editingTask
      ? current.map((task) => (task.id === editingTask.id ? { ...task, name, deadline } : task))
      : [...current, { id: Date.now(), name, active: true, deleted: false, deadline }]);
    setEditingTask(null);
  }

  function getRemainingTime(task) {
    if (!task.deadline) return 'Sin fecha límite';

    const now = new Date();
    const end = new Date(task.deadline + 'T23:59:59');

    if (Number.isNaN(end.getTime())) {
      return 'Fecha límite inválida';
    }

    const diffMs = end.getTime() - now.getTime();
    const dayMs = 24 * 60 * 60 * 1000;
    const days = Math.floor(diffMs / dayMs);

    if (days < 0) return `Vencida hace ${Math.abs(days)} día(s)`;
    if (days === 0) return 'Vence hoy';
    return `Faltan ${days} día(s)`;
  }

  const handlers = {
    onToggle: (id) => setTasks((current) => current.map((task) => (
      task.id === id ? { ...task, active: !task.active } : task
    ))),
    onEdit: setEditingTask,
    onDelete: (id) => setTasks((current) => current.map((task) => (
      task.id === id ? { ...task, deleted: true } : task
    ))),
    onRestore: (id) => setTasks((current) => current.map((task) => (
      task.id === id ? { ...task, deleted: false } : task
    ))),
  };

  return (
    <main className="shell">
      <header>
        <div className="brand"><span className="brand-mark">✓</span> TASKFLOW</div>
        <div className="date">Gestión personal / 2026</div>
      </header>
      <section className="intro">
        <h1 className="hero-title">Haz espacio<br />para lo que <em>importa.</em></h1>
        <div className="summary"><strong>{activeCount}</strong> tareas activas<br />en tu lista de hoy</div>
      </section>
      <section className="workspace">
        <TaskForm editingTask={editingTask} onSave={addOrUpdate} onCancel={() => setEditingTask(null)} />
        <div>
          <TaskToolbar filter={filter} setFilter={setFilter} activeCount={activeCount} deletedCount={deletedCount} />
          <TaskList tasks={tasks} filter={filter} handlers={handlers} getRemainingTime={getRemainingTime} />
          <div className="meta">Los cambios viven en esta sesión · borrado lógico activado</div>
        </div>
      </section>
    </main>
  );
}

export default App;
