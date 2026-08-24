import { useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import TaskToolbar from '../components/TaskToolbar';

const starterTasks = [
  { id: 1, name: 'Revisar el backlog del equipo', active: true, deleted: false },
  { id: 2, name: 'Preparar notas para la reunión', active: false, deleted: false },
  { id: 3, name: 'Actualizar documentación del proyecto', active: true, deleted: false },
];

function TasksPage() {
  const [tasks, setTasks] = useState(starterTasks);
  const [filter, setFilter] = useState('active');
  const [editingTask, setEditingTask] = useState(null);
  const [taskCount, setTaskCount] = useState(0);
  const activeCount = tasks.filter((task) => !task.deleted && task.active).length;
  const deletedCount = tasks.filter((task) => task.deleted).length;

  useEffect(() => {
    setTaskCount(tasks.length);
  }, [tasks]);

  function addOrUpdate(name) {
    setTasks((current) => editingTask
      ? current.map((task) => task.id === editingTask.id ? { ...task, name } : task)
      : [...current, { id: Date.now(), name, active: true, deleted: false }]);
    setEditingTask(null);
  }

  const handlers = {
    onToggle: (id) => setTasks((current) => current.map((task) => task.id === id ? { ...task, active: !task.active } : task)),
    onEdit: setEditingTask,
    onDelete: (id) => setTasks((current) => current.map((task) => task.id === id ? { ...task, deleted: true } : task)),
    onRestore: (id) => setTasks((current) => current.map((task) => task.id === id ? { ...task, deleted: false } : task)),
  };

  return (
    <>
      <section className="intro">
        <h1>Haz espacio<br />para lo que <em>importa.</em></h1>
        <div className="summary"><strong>{activeCount}</strong> tareas activas<br />en tu lista de hoy</div>
      </section>
      <section className="workspace">
        <TaskForm editingTask={editingTask} onSave={addOrUpdate} onCancel={() => setEditingTask(null)} />
        <div>
          <TaskToolbar filter={filter} setFilter={setFilter} activeCount={activeCount} deletedCount={deletedCount} />
          <TaskList tasks={tasks} filter={filter} handlers={handlers} />
          <div className="meta">Los cambios viven en esta sesión · {taskCount} tareas en memoria</div>
        </div>
      </section>
    </>
  );
}

export default TasksPage;
