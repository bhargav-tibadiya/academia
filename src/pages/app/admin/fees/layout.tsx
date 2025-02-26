// Styles
import styles from "./layout.module.scss";

// Components
import Sidebar from "../sidebar/sidebar";
import Fees from "./components/fees";

const AdminFeesPage = () => {
  return (
    <div className={styles.admin_dashboard_layout}>
      <Sidebar />
      <Fees />
    </div>
  );
};

export default AdminFeesPage;