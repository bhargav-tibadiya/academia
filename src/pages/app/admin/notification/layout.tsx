// Styles
import styles from "./layout.module.scss";

// Components
import Sidebar from "../sidebar/sidebar";
import Notification from "./components/notification";

const AdminNotificationPage = () => {
  return (
    <div className={styles.admin_dashboard_layout}>
      <Sidebar />
      <Notification />
    </div>
  );
};

export default AdminNotificationPage;