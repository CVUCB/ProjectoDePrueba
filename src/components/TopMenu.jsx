import { NavLink } from 'react-router-dom';

function TopMenu() {
  return (
    <nav className="top-menu" aria-label="Menú principal">
      <NavLink className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'} to="/tasks">
        Tareas
      </NavLink>
    </nav>
  );
}

export default TopMenu;
