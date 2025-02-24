// Styles
import styles from "./layout.module.scss";

// Components
import Sidebar from "../sidebar/sidebar";
import Student from "./components/student";

const AdminStudentPage = () => {
  return (
    <div className={styles.admin_dashboard_layout}>
      <Sidebar />
      <Student />
    </div>
  );
};

export default AdminStudentPage;
