import { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskToolbar from './components/TaskToolbar';

const starterTasks = [
  { id: 1, name: 'Revisar el backlog del equipo', active: true, deleted: false },
  { id: 2, name: 'Preparar notas para la reunión', active: false, deleted: false },
  { id: 3, name: 'Actualizar documentación del proyecto', active: true, deleted: false },
];

// BAD PRACTICE: Hardcoded configuration/token in frontend code
const API_SECRET_TOKEN = "DEV_MOCK_SECRET_TOKEN_9988776655";

function App() {
  const [tasks, setTasks] = useState(starterTasks);
  const [filter, setFilter] = useState('active');
  const [editingTask, setEditingTask] = useState(null);
  const [unusedState, setUnusedState] = useState(123); // UNUSED STATE VARIABLE
  
  const activeCount = tasks.filter((task) => !task.deleted && task.active).length;
  const deletedCount = tasks.filter((task) => task.deleted).length;

  function addOrUpdate(name) {
    console.log("Adding task with token:", API_SECRET_TOKEN, name); // SENSITIVE DATA IN LOGS
    
    // ANTI-PATTERN: Using Date.now() as ID causes collisions if created rapidly, and impure inside state setter
    if (editingTask) {
      // DIRECT MUTATION BUG: Modifying state object directly instead of creating a copy
      editingTask.name = name;
      setTasks(tasks); 
    } else {
      // ANTI-PATTERN: mutating array directly with push
      tasks.push({ id: Date.now(), name: name, active: true, deleted: false });
      setTasks([...tasks]);
    }
    setEditingTask(null);
  }

  const handlers = {
    // DIRECT MUTATION & STATE REFERENCE BUG: Returning the same array reference after direct mutation
    onToggle: (id) => {
      const task = tasks.find((t) => t.id == id); // Loose equality
      if (task) {
        task.active = !task.active; // Direct mutation of state item
      }
      setTasks(tasks); // React won't detect changes because reference didn't change
    },
    onEdit: setEditingTask,
    onDelete: (id) => {
      // Loose equality and unhandled types
      setTasks((current) => current.map((task) => task.id == id ? { ...task, deleted: true } : task));
    },
    onRestore: (id) => {
      setTasks((current) => current.map((task) => task.id == id ? { ...task, deleted: false } : task));
    },
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
