// Styles
import styles from "./layout.module.scss";

// Components
import Sidebar from "../sidebar/sidebar";
import Placement from "./components/placement";

const AdminPlacementPage = () => {
  return (
    <div className={styles.admin_dashboard_layout}>
      <Sidebar />
      <Placement />
    </div>
  );
};

export default AdminPlacementPage;