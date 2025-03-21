// Packages & Hooks
import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';

// Styles
import styles from './user.module.scss'
import { Eye, Edit, ArrowLeft, ArrowRight, Plus } from '@/assets/icon/rooticon'

// Components
import { Tooltip } from 'antd';
import UserForm from '@/components/forms/user/form';

// Utils & Config
import useTheme from '@/utils/hooks/useTheme';
import { User } from '@/types/store/thunks/dashboard';
import { getAllUsersThunk } from '@/store/thunks/dashboard.thunk';

// Constants & Types
const initialFilters = {
  filterKey: undefined,
  filterValue: undefined,
  page: 1,
  recordPerPage: 10
}

// TODO : Add loading and filter if required
const DashboardUser = () => {

  // ----->> Hooks <<-----
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.dashboard);

  const stats = useMemo(() => {
    return users.reduce(
      (acc: { total: number, admin: number, student: number, teacher: number }, curr: User) => {
        acc.total += 1;
        acc[curr.role as keyof typeof acc] += 1;
        return acc;
      },
      {
        total: 0, admin: 0, student: 0, teacher: 0
      }
    );
  }, [users])

  // ----->> States <<-----
  const [filter, setFilter] = useState(initialFilters)
  const [filteredData, setFilteredData] = useState<User[]>([])
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [mode, setMode] = useState<"view" | "edit">("view");


  // ----->> Functions <<-----
  const getAllUsers = async () => {
    try {
      await dispatch(getAllUsersThunk()).unwrap();
    } catch (error) {
      console.log(error);
    }
  }

  const handleClose = () => {
    setIsOpen(false);
    setSelectedUserId(null);
  }

  // ----->> Filtering <<-----
  useEffect(() => {
    const filterData = (userData: User[], filterKey: keyof User | undefined, filterValue: string | undefined, page: number) => {

      let tmpData = [...userData];

      if (filterKey && filterValue) {
        setFilteredData(tmpData);
      }

      if (page) {
        const startIndex = (page - 1) * filter.recordPerPage;
        const endIndex = startIndex + filter.recordPerPage;
        tmpData = tmpData.slice(startIndex, endIndex);
      }

      setFilteredData(tmpData);
    }
    filterData(users, filter.filterKey, filter.filterValue, filter.page)
  }, [filter, users])

  // ----->> API <<-----
  useEffect(() => {
    getAllUsers();
  }, [dispatch])

  useEffect(() => {
    if (selectedUserId) {
      setIsOpen(true)
    }
  }, [selectedUserId])

  //# Logs 
  console.log('stats', stats)

  return (
    <>
      <div className={`${styles.user_container} ${styles[theme]}`}>
        <div className={styles.title}>User Model</div>
        <div className={styles.divider}></div>
        <div className={styles.actions}>
          <div className={styles.items}>
            <Tooltip title="You are not allowed to add user. Only way to add user is by signing up" color={"#FF4040"}>
              <div className={`${styles.item} ${styles.add_item}`}><span><Plus /></span>Add</div>
            </Tooltip>
          </div>
          <div className={styles.items}>
            <button
              disabled={filter.page === 1}
              onClick={() => setFilter({ ...filter, page: filter.page - 1 })}
              className={styles.item}
            >
              <span><ArrowLeft /></span>Previous Page
            </button>
            <button
              disabled={filter.page === Math.ceil(users.length / filter.recordPerPage)}
              className={styles.item}
              onClick={() => setFilter({ ...filter, page: filter.page + 1 })}
            >
              Next Page<span><ArrowRight /></span>
            </button>
          </div>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.table}>
          <table>
            <thead>
              <tr>
                <td>No</td>
                <td>User Id</td>
                <td>Email</td>
                <td>Role</td>
                <td>Status</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((classItem, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{classItem.userId}</td>
                    <td>{classItem.email}</td>
                    <td>{classItem.role}</td>
                    <td>{classItem.status}</td>
                    <td>
                      <div className={styles.action_icons}>
                        <span title='View' onClick={() => { setSelectedUserId(classItem._id); setMode("view") }} className={styles.action_icon}><Eye /></span>
                        <span title='Edit' onClick={() => { setSelectedUserId(classItem._id); setMode("edit") }} className={styles.action_icon}><Edit /></span>
                      </div>
                    </td>
                  </tr>
                );
              })}

            </tbody>
          </table>
        </div>
        <div className={styles.section_title}>Statistics</div>
        <div className={styles.divider}></div>
        <div className={styles.stats}>
          <table>
            <thead>
              <tr>
                <td>Total Users</td>
                <td>Admin</td>
                <td>Student</td>
                <td>Teacher</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{stats.total}</td>
                <td>{stats.admin}</td>
                <td>{stats.student}</td>
                <td>{stats.teacher}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div >
      <UserForm mode={mode} isOpen={isOpen} onClose={handleClose} selectedUserId={selectedUserId} />
    </>
  )
}

export default DashboardUser