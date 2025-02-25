// Styles
import styles from "./layout.module.scss";

// Components
import Sidebar from "../sidebar/sidebar";
import Attendance from "./components/attendance";

const AdminAttendancePage = () => {
  return (
    <div className={styles.admin_dashboard_layout}>
      <Sidebar />
      <Attendance />
    </div>
  );
};

export default AdminAttendancePage;