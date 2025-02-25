// Styles
import styles from "./layout.module.scss";

// Components
import Sidebar from "../sidebar/sidebar";
import Fee from "./components/fee";

const AdminFeePage = () => {
  return (
    <div className={styles.admin_dashboard_layout}>
      <Sidebar />
      <Fee />
    </div>
  );
};

export default AdminFeePage;