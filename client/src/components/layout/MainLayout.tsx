import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar/Sidebar";
import '../../styles/globals.css';

const MainLayout = () => {
  return (
    <div className="app-shell">
      <Sidebar />

      <div className="app-content">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;