// Styles
import styles from "./layout.module.scss";

// Components
import Sidebar from "../sidebar/sidebar";
import Update from "./components/update";

const AdminUpdatePage = () => {
  return (
    <div className={styles.admin_dashboard_layout}>
      <Sidebar />
      <Update />
    </div>
  );
};

export default AdminUpdatePage;