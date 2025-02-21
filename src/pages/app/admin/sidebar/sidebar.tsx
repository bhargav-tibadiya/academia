// Packages
import { useLocation, useNavigate } from 'react-router-dom'

// Styles and Assets
import styles from './sidebar.module.scss'
import { logo } from '../../../../assets/image/rootimage'
import { LayoutDashboard, CalendarCheck, School, Users, UserRound, ReceiptIndianRupee, Ticket, Bell, Goal, FileUser, FileTerminal, PencilLine, GraduationCap, CalendarRange, Inbox, Sun, Moon } from '../../../../assets/icon/rooticon'

// Utils & Config
import useTheme from '../../../../utils/hooks/useTheme'
import { ROUTES } from '../../../../utils/constants/routes'

// Constants
const menus = [
  {
    icon: <LayoutDashboard />,
    label: "Dashboard",
    path: ROUTES.ADMIN_DASHBOARD
  },
  {
    icon: <CalendarCheck />,
    label: "Attendance",
    path: ROUTES.ADMIN_ATTENDANCE
  },
  {
    icon: <Users />,
    label: "Class",
    path: ROUTES.ADMIN_CLASS
  },
  {
    icon: <ReceiptIndianRupee />,
    label: "Fees",
    path: ROUTES.ADMIN_FEES
  },
  {
    icon: <Ticket />,
    label: "Hall Ticket",
    path: ROUTES.ADMIN_HALLTICKET
  },
  {
    icon: <School />,
    label: "Institute",
    path: ROUTES.ADMIN_INSTITUTE
  },
  {
    icon: <Bell />,
    label: "Notification",
    path: ROUTES.ADMIN_NOTIFICATION
  },
  {
    icon: <Goal />,
    label: "Placement",
    path: ROUTES.ADMIN_PLACEMENT
  },
  {
    icon: <FileUser />,
    label: "Profile",
    path: ROUTES.ADMIN_PROFILE
  },
  {
    icon: <FileTerminal />,
    label: "Request",
    path: ROUTES.ADMIN_REQUEST
  },
  {
    icon: <PencilLine />,
    label: "Result",
    path: ROUTES.ADMIN_RESULT
  },
  {
    icon: <GraduationCap />,
    label: "Student",
    path: ROUTES.ADMIN_STUDENT
  },
  {
    icon: <CalendarRange />,
    label: "Time Table",
    path: ROUTES.ADMIN_TIMETABLE
  },
  {
    icon: <Inbox />,
    label: "Update",
    path: ROUTES.ADMIN_UPDATE
  },
  {
    icon: <UserRound />,
    label: "User",
    path: ROUTES.ADMIN_USER
  }
]

const Sidebar = () => {

  // Hooks
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  //# Logs
  console.log('theme', theme)

  return (
    <div className={`${styles.sidebar_container} ${styles[theme]}`}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <img src={logo} alt="" />
          </div>
          <div className={styles.info}>
            <div className={styles.title_1}>
              CGPIT @ Admin
            </div>
            <div className={styles.title_2}>
              Uka Tarsadia University
            </div>
          </div>
        </div>
        <div className={styles.menus}>
          {menus.map((menu) => {
            return (
              <div
                className={`${styles.menu} ${location.pathname === menu.path ? styles.active : ""}`}
                onClick={() => navigate(menu.path)}
              >
                <div className={styles.icon}>{menu.icon}</div>
                <div className={styles.name}>{menu.label}</div>
              </div>
            )
          })}
        </div>
      </div>
      <div className={styles.mode} onClick={toggleTheme}>
        <div className={`${styles.mode_menu} ${theme === 'light' ? styles.light : ""}`}>
          <div className={styles.icon}><Sun /></div>
          Light
        </div>
        <div className={`${styles.mode_menu} ${theme === 'dark' ? styles.dark : ""}`}>
          <div className={styles.icon}><Moon /></div>
          Dark
        </div>
      </div>
    </div>
  )
}

export default Sidebar