// Styles
import styles from "./layout.module.scss";

// Components
import Sidebar from "../sidebar/sidebar";
import Dashboard from "./components/dashboard";

const AdminDashboardPage = () => {
  return (
    <div className={styles.admin_dashboard_layout}>
      <Sidebar />
      <Dashboard />
    </div>
  );
};

export default AdminDashboardPage;
