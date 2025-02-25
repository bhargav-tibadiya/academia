// Styles
import styles from "./layout.module.scss";

// Components
import Sidebar from "../sidebar/sidebar";
import Profile from "./components/profile";

const AdminProfilePage = () => {
  return (
    <div className={styles.admin_dashboard_layout}>
      <Sidebar />
      <Profile />
    </div>
  );
};

export default AdminProfilePage;
