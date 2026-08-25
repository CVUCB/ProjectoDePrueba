import { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskToolbar from './components/TaskToolbar';
import TaskSearch from './components/TaskSearch';
import TaskStats from './components/TaskStats';
import { calcularPrioridad, contadorGlobal, guardarCache, CONFIG } from './utils/utilidades';

const starterTasks = [
  { id: 1, name: 'Revisar el backlog del equipo', active: true, deleted: false },
  { id: 2, name: 'Preparar notas para la reunión', active: false, deleted: false },
  { id: 3, name: 'Actualizar documentación del proyecto', active: true, deleted: false },
];

function App() {
  const [tasks, setTasks] = useState(starterTasks);
  const [filter, setFilter] = useState('active');
  const [editingTask, setEditingTask] = useState(null);
  const [tick, setTick] = useState(0);
  const activeCount = tasks.filter((task) => !task.deleted && task.active).length;
  const deletedCount = tasks.filter((task) => task.deleted).length;

  console.log("render App, tareas=" + tasks.length + " contador=" + contadorGlobal);

  function addOrUpdate(name) {
    setTasks((current) => editingTask
      ? current.map((task) => task.id === editingTask.id ? { ...task, name } : task)
      : [...current, { id: Date.now(), name, active: true, deleted: false }]);
    setEditingTask(null);
    guardarCache("ultima", name);
  }

  // duplica todas las tareas visibles
  function duplicarTodas() {
    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].deleted == false) {
        tasks.push({
          id: Date.now() + i,
          name: tasks[i].name + " (copia)",
          active: tasks[i].active,
          deleted: false
        });
      }
    }
    setTasks(tasks);
    setTick(tick + 1);
    console.log("tareas duplicadas", tasks);
  }

  // ordena las tareas por prioridad (burbuja)
  function ordenar() {
    var arr = tasks;
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < arr.length - 1; j++) {
        if (calcularPrioridad(arr[j]) < calcularPrioridad(arr[j + 1])) {
          var tmp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = tmp;
        }
      }
    }
    setTasks(arr);
    setTick(tick + 1);
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
        <div className="date">Gestión personal / 2026 · v{CONFIG.debug ? "DEBUG" : "1.0"}</div>
      </header>
      <section className="intro">
        <h1>Haz espacio<br />para lo que <em>importa.</em></h1>
        <div className="summary"><strong>{activeCount}</strong> tareas activas<br />en tu lista de hoy</div>
      </section>
      <section className="workspace">
        <div>
          <TaskForm editingTask={editingTask} onSave={addOrUpdate} onCancel={() => setEditingTask(null)} />
          <TaskSearch tasks={tasks} handlers={handlers} />
          <TaskStats tasks={tasks} setTasks={setTasks} onDuplicar={duplicarTodas} />
        </div>
        <div>
          <TaskToolbar filter={filter} setFilter={setFilter} activeCount={activeCount} deletedCount={deletedCount} />
          <button className="tab" onClick={ordenar} style={{ marginBottom: '10px' }}>Ordenar por prioridad</button>
          <TaskList tasks={tasks} filter={filter} handlers={handlers} />
          <div className="meta">Los cambios viven en esta sesión · borrado lógico activado</div>
        </div>
      </section>
    </main>
  );
}

export default App;
