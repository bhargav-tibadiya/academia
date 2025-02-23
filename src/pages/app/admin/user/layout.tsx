// Styles
import styles from "./layout.module.scss";

// Components
import Sidebar from "../sidebar/sidebar";
import User from "./components/user";

const AdminUserPage = () => {
  return (
    <div className={styles.admin_dashboard_layout}>
      <Sidebar />
      <User />
    </div>
  );
};

export default AdminUserPage;
