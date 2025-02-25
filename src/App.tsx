// Packaged
import { Route, Routes } from 'react-router-dom'

// Styles & Assets
import './App.scss'

// Types & Constants
import { ROUTES } from './utils/constants/routes'

// Utils & Configs
import useTheme from './utils/hooks/useTheme'

// Components

// --> AUTH
import Login from './pages/auth/login/login'
import Signup from './pages/auth/signup/signup'

// --> ADMIN
import AdminDashboardPage from './pages/app/admin/dashboard/layout'
import AdminClassPage from './pages/app/admin/class/layout'
import AdminUserPage from './pages/app/admin/user/layout'
import AdminStudentPage from './pages/app/admin/student/layout'
import AdminProfilePage from './pages/app/admin/profile/layout'
import AdminPlacementPage from './pages/app/admin/placement/layout'
import AdminAttendancePage from './pages/app/admin/attendance/layout'
import AdminHallTicketPage from './pages/app/admin/hallticket/layout'
import AdminInstitutePage from './pages/app/admin/institute/layout'
import AdminNotificationPage from './pages/app/admin/notification/layout'
import AdminRequestPage from './pages/app/admin/request/layout'
import AdminResultPage from './pages/app/admin/result/layout'
import AdminTimetablePage from './pages/app/admin/timetable/layout'
import AdminUpdatePage from './pages/app/admin/update/layout'
import AdminFeePage from './pages/app/admin/fee/layout'


function App() {

  const { theme } = useTheme();

  return (
    <>
      <div className={`RootContainer ${theme}`}>
        <Routes>
          <Route path={ROUTES.LOGIN} Component={Login} />
          <Route path={ROUTES.SIGNUP} Component={Signup} />

          <Route path={ROUTES.ADMIN_DASHBOARD} Component={AdminDashboardPage} />
          <Route path={ROUTES.ADMIN_ATTENDANCE} Component={AdminAttendancePage} />
          <Route path={ROUTES.ADMIN_CLASS} Component={AdminClassPage} />
          <Route path={ROUTES.ADMIN_FEES} Component={AdminFeePage} />
          <Route path={ROUTES.ADMIN_HALLTICKET} Component={AdminHallTicketPage} />
          <Route path={ROUTES.ADMIN_INSTITUTE} Component={AdminInstitutePage} />
          <Route path={ROUTES.ADMIN_NOTIFICATION} Component={AdminNotificationPage} />
          <Route path={ROUTES.ADMIN_PLACEMENT} Component={AdminPlacementPage} />
          <Route path={ROUTES.ADMIN_PROFILE} Component={AdminProfilePage} />
          <Route path={ROUTES.ADMIN_REQUEST} Component={AdminRequestPage} />
          <Route path={ROUTES.ADMIN_RESULT} Component={AdminResultPage} />
          <Route path={ROUTES.ADMIN_STUDENT} Component={AdminStudentPage} />
          <Route path={ROUTES.ADMIN_TIMETABLE} Component={AdminTimetablePage} />
          <Route path={ROUTES.ADMIN_UPDATE} Component={AdminUpdatePage} />
          <Route path={ROUTES.ADMIN_USER} Component={AdminUserPage} />

        </Routes>
      </div>
    </>
  )
}

export default App
