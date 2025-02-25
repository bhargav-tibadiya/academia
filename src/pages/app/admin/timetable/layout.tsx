// Styles
import styles from "./layout.module.scss";

// Components
import Sidebar from "../sidebar/sidebar";
import Timetable from "./components/timetable";

const AdminTimetablePage = () => {
  return (
    <div className={styles.admin_dashboard_layout}>
      <Sidebar />
      <Timetable />
    </div>
  );
};

export default AdminTimetablePage;