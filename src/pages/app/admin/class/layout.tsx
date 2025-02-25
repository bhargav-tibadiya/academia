// Styles
import styles from './layout.module.scss'

// Components
import Sidebar from '../sidebar/sidebar'
import Class from './components/class'

// Utils & Configs

const AdminClassPage = () => {
  return (
    <div className={styles.admin_dashboard_layout}>
      <Sidebar />
      <Class />
    </div>
  )
}

export default AdminClassPage