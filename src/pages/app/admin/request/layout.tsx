// Styles
import styles from "./layout.module.scss";

// Components
import Sidebar from "../sidebar/sidebar";
import Request from "./components/request";

const AdminRequestPage = () => {
  return (
    <div className={styles.admin_dashboard_layout}>
      <Sidebar />
      <Request />
    </div>
  );
};

export default AdminRequestPage;