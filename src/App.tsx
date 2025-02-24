// Packaged
import { Route, Routes } from 'react-router-dom'

// Styles & Assets
import './App.scss'

// Types & Constants
import { ROUTES } from './utils/constants/routes'

// Utils & Configs
import useTheme from './utils/hooks/useTheme'

// Components
import Login from './pages/auth/login/login'
import Signup from './pages/auth/signup/signup'
import AdminDashboardPage from './pages/app/admin/dashboard/layout'
import AdminClassPage from './pages/app/admin/class/layout'
import AdminUserPage from './pages/app/admin/user/layout'
import AdminStudentPage from './pages/app/admin/student/layout'
import AdminProfilePage from './pages/app/admin/profile/layout'
import AdminPlacementPage from './pages/app/admin/placement/layout'


function App() {

  const { theme } = useTheme();

  return (
    <>
      <div className={`RootContainer ${theme}`}>
        <Routes>
          <Route path={ROUTES.LOGIN} Component={Login} />
          <Route path={ROUTES.SIGNUP} Component={Signup} />

          <Route path={ROUTES.ADMIN_DASHBOARD} Component={AdminDashboardPage} />
          <Route path={ROUTES.ADMIN_ATTENDANCE} Component={AdminDashboardPage} />
          <Route path={ROUTES.ADMIN_CLASS} Component={AdminClassPage} />
          <Route path={ROUTES.ADMIN_FEES} Component={AdminDashboardPage} />
          <Route path={ROUTES.ADMIN_HALLTICKET} Component={AdminDashboardPage} />
          <Route path={ROUTES.ADMIN_INSTITUTE} Component={AdminDashboardPage} />
          <Route path={ROUTES.ADMIN_NOTIFICATION} Component={AdminDashboardPage} />
          <Route path={ROUTES.ADMIN_PLACEMENT} Component={AdminPlacementPage} />
          <Route path={ROUTES.ADMIN_PROFILE} Component={AdminProfilePage} />
          <Route path={ROUTES.ADMIN_REQUEST} Component={AdminDashboardPage} />
          <Route path={ROUTES.ADMIN_RESULT} Component={AdminDashboardPage} />
          <Route path={ROUTES.ADMIN_STUDENT} Component={AdminStudentPage} />
          <Route path={ROUTES.ADMIN_TIMETABLE} Component={AdminDashboardPage} />
          <Route path={ROUTES.ADMIN_UPDATE} Component={AdminDashboardPage} />
          <Route path={ROUTES.ADMIN_USER} Component={AdminUserPage} />

        </Routes>
      </div>
    </>
  )
}

export default App
