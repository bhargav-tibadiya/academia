// Packages
import { useLocation, useNavigate } from 'react-router-dom'

// Styles and Assets
import styles from './sidebar.module.scss'
import { logo } from '@/assets/image/rootimage'
import { LayoutDashboard, CalendarCheck, School, Users, UserRound, ReceiptIndianRupee, Ticket, Bell, Goal, FileUser, FileTerminal, PencilLine, GraduationCap, CalendarRange, Inbox, Sun, Moon, Building2 } from '@/assets/icon/rooticon'

// Utils & Config
import useTheme from '@/utils/hooks/useTheme'
import { ROUTES } from '@/utils/constants/routes'
import { Tooltip } from 'antd'

// Constants
const menus = [
  {
    icon: <LayoutDashboard />,
    label: "Dashboard",
    path: ROUTES.ADMIN_DASHBOARD,
    description: "Contains all the statistics of the System"
  },
  {
    icon: <School />,
    label: "Institute",
    path: ROUTES.ADMIN_INSTITUTE,
    description: "View and manage All Institutes."
  },
  {
    icon: <Building2 />,
    label: "Department",
    path: ROUTES.ADMIN_DEPARTMENT,
    description: "View and manage All Departments."
  },
  {
    icon: <Users />,
    label: "Class",
    path: ROUTES.ADMIN_CLASS,
    description: "View and manage All Classes."
  },
  {
    icon: <FileUser />,
    label: "Profile",
    path: ROUTES.ADMIN_PROFILE,
    description: "View and manage User's Profile."
  },
  {
    icon: <UserRound />,
    label: "User",
    path: ROUTES.ADMIN_USER,
    description: "View and manage All Users."
  },
  {
    icon: <GraduationCap />,
    label: "Student",
    path: ROUTES.ADMIN_STUDENT,
    description: "View and manage All Students."
  },
  {
    icon: <CalendarRange />,
    label: "Time Table",
    path: ROUTES.ADMIN_TIMETABLE,
    description: "View and manage All Time Tables."
  },
  {
    icon: <CalendarCheck />,
    label: "Attendance",
    path: ROUTES.ADMIN_ATTENDANCE,
    description: "View and manage All Attendances."
  },
  {
    icon: <ReceiptIndianRupee />,
    label: "Fees",
    path: ROUTES.ADMIN_FEES,
    description: "View and manage All Fees."
  },
  {
    icon: <Ticket />,
    label: "Hall Ticket",
    path: ROUTES.ADMIN_HALLTICKET,
    description: "View and manage All Hall Tickets."
  },
  {
    icon: <Bell />,
    label: "Notification",
    path: ROUTES.ADMIN_NOTIFICATION,
    description: "View and manage All Notifications."
  },
  {
    icon: <Goal />,
    label: "Placement",
    path: ROUTES.ADMIN_PLACEMENT,
    description: "View and manage All Placements."
  },
  {
    icon: <FileTerminal />,
    label: "Request",
    path: ROUTES.ADMIN_REQUEST,
    description: "View and manage All Requests."
  },
  {
    icon: <PencilLine />,
    label: "Result",
    path: ROUTES.ADMIN_RESULT,
    description: "View and manage All Results."
  },
  {
    icon: <Inbox />,
    label: "Update",
    path: ROUTES.ADMIN_UPDATE,
    description: "View and manage All Updates."
  },
]

const Sidebar = () => {

  // Hooks
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

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
          {menus.map((menu, index) => {
            return (
              <Tooltip
                key={index}
                title={menu.description}
                placement="right"
              >
                <div
                  className={`${styles.menu} ${location.pathname === menu.path ? styles.active : ""}`}
                  onClick={() => navigate(menu.path)}
                >
                  <div className={styles.icon}>{menu.icon}</div>
                  <div className={styles.name}>{menu.label}</div>
                </div>
              </Tooltip>
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