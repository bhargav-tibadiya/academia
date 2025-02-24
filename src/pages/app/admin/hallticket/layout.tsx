// Styles
import styles from "./layout.module.scss";

// Components
import Sidebar from "../sidebar/sidebar";
import HallTicket from "./components/hallticket";

const AdminHallTicketPage = () => {
  return (
    <div className={styles.admin_dashboard_layout}>
      <Sidebar />
      <HallTicket />
    </div>
  );
};

export default AdminHallTicketPage;