// Configs & Utils
import useTheme from "../../../../../utils/hooks/useTheme";

// Styles & Assets
import styles from "./dashboard.module.scss";
import { CalendarCheck, School, Users, UserRound, ReceiptIndianRupee, Ticket, Bell, Goal, FileUser, FileTerminal, PencilLine, GraduationCap, CalendarRange, Inbox } from '../../../../../assets/icon/rooticon'

// Type & Constants
const stats = [
  {
    number: 4582,
    descriptions: "Total Students",
  },
  {
    number: 12,
    descriptions: "Total Institute",
  },
  {
    number: 46,
    descriptions: "Total Classes",
  }
];

const models = [
  {
    icon: <CalendarCheck />,
    label: "Attendance",
    progress: "2.1% growth",
    count: 150
  },
  {
    icon: <Users />,
    label: "Class",
    progress: "2.1% growth",
    count: 150
  },
  {
    icon: <ReceiptIndianRupee />,
    label: "Fees",
    progress: "2.1% growth",
    count: 150
  },
  {
    icon: <Ticket />,
    label: "Hall Ticket",
    progress: "2.1% growth",
    count: 150
  },
  {
    icon: <School />,
    label: "Institute",
    progress: "2.1% growth",
    count: 150
  },
  {
    icon: <Bell />,
    label: "Notification",
    progress: "2.1% growth",
    count: 150
  },
  {
    icon: <Goal />,
    label: "Placement",
    progress: "2.1% growth",
    count: 150
  },
  {
    icon: <FileUser />,
    label: "Profile",
    progress: "2.1% growth",
    count: 150
  },
  {
    icon: <FileTerminal />,
    label: "Request",
    progress: "2.1% growth",
    count: 150
  },
  {
    icon: <PencilLine />,
    label: "Result",
    progress: "2.1% growth",
    count: 150
  },
  {
    icon: <GraduationCap />,
    label: "Student",
    progress: "2.1% growth",
    count: 150
  },
  {
    icon: <CalendarRange />,
    label: "Time Table",
    progress: "2.1% growth",
    count: 150
  },
  {
    icon: <Inbox />,
    label: "Update",
    progress: "2.1% growth",
    count: 150
  },
  {
    icon: <UserRound />,
    label: "User",
    progress: "2.1% growth",
    count: 150
  }
];

const Dashboard = () => {

  // Hooks
  const { theme } = useTheme();
  return (
    <div className={`${styles.dashboard_container} ${styles[theme]}`}>
      <div className={styles.title}>Dashboard</div>
      <div className={styles.divider}></div>
      <div className={styles.analytics_overview}>
        <div className={styles.title}>Analytics Overview</div>
        <div className={styles.divider}></div>
        <div className={styles.analytics_container}>
          {stats.map((stat, index) => {
            return (
              <div key={index} className={styles.analytics_card}>
                <div className={styles.numbers}>{stat.number}</div>
                <div className={styles.description}>{stat.descriptions}</div>
              </div>
            )
          })}
        </div>
      </div>
      <div className={styles.title}>Models</div>
      <div className={styles.divider}></div>
      <div className={styles.models_container}>
        {models.map((model, index) => {
          return (
            <div key={index} className={styles.model}>
              <div className={styles.head}>
                <div>{model.label}</div>
                <div>{model.icon}</div>
              </div>
              <div className={styles.body}>{model.count} </div>
              <div className={styles.foot}>{model.progress}</div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default Dashboard;
