// Styles
import styles from "./layout.module.scss";

// Components
import Sidebar from "../sidebar/sidebar";
import Institute from "./components/institute";

const AdminInstitutePage = () => {
  return (
    <div className={styles.admin_dashboard_layout}>
      <Sidebar />
      <Institute />
    </div>
  );
};

export default AdminInstitutePage;