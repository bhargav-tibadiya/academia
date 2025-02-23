// Styles
import styles from "./layout.module.scss";

// Components
import Sidebar from "../sidebar/sidebar";
import Dashboard from "./components/dashboard";
import { useLocation } from "react-router-dom";

const AdminDashboardPage = () => {
  const location = useLocation();
  return (
    <div className={styles.admin_dashboard_layout}>
      <Sidebar />
      {location.pathname === "/admin/dashboard" && <Dashboard />}
     
    </div>
  );
};

export default AdminDashboardPage;
