// Packaged
import { Route, Routes } from 'react-router-dom'

// Styles & Assets
import './App.scss'

// Types & Constants
import { ROUTES } from './utils/constants/routes'

// Components
import Login from './pages/auth/login/login'
import Signup from './pages/auth/signup/signup'


function App() {
  return (
    <>
      <div className='RootContainer'>
        <Routes>
          <Route path={ROUTES.LOGIN} Component={Login} />
          <Route path={ROUTES.SIGNUP} Component={Signup} />
        </Routes>
      </div>
    </>
  )
}

export default App
