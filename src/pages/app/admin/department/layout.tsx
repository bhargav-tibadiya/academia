// Styles
import styles from "./layout.module.scss";

// Components
import Sidebar from "../sidebar/sidebar";
import Department from "./components/department";

const AdminDepartmentPage = () => {
  return (
    <div className={styles.admin_dashboard_layout}>
      <Sidebar />
      <Department />
    </div>
  );
};

export default AdminDepartmentPage;