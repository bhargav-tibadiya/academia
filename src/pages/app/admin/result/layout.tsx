// Styles
import styles from "./layout.module.scss";

// Components
import Sidebar from "../sidebar/sidebar";
import Result from "./components/result";

const AdminResultPage = () => {
  return (
    <div className={styles.admin_dashboard_layout}>
      <Sidebar />
      <Result />
    </div>
  );
};

export default AdminResultPage;