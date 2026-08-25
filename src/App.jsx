import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import TopMenu from './components/TopMenu';
import TasksPage from './pages/TasksPage';

function App() {
  return (
    <BrowserRouter>
      <main className="shell">
        <header>
          <div className="brand"><span className="brand-mark">✓</span> TASKFLOW</div>
          <TopMenu />
          <div className="date">Gestión personal / 2026</div>
        </header>
        <Routes>
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="*" element={<Navigate to="/tasks" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
