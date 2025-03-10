// Packages & Hooks
import { useAppDispatch, useAppSelector } from '../../../../../store/store';

// Styles
import styles from './user.module.scss'

// Icons
import { Eye, Edit, ArrowLeft, ArrowRight, Plus } from '../../../../../assets/icon/rooticon'

// Utils & Config
import useTheme from '../../../../../utils/hooks/useTheme';
import { useEffect, useMemo, useState } from 'react';
import { getAllUsersThunk, getUserByIdThunk } from '../../../../../store/thunks/dashboard.thunk';
import { User } from '../../../../../types/store/thunks/dashboard';

// Constants & Types
const initialFilters = {
  filterKey: undefined,
  filterValue: undefined,
  page: 1,
  recordPerPage: 10
}


// TODO : Add loading and filter if required
const Class = () => {

  // ----->> Hooks <<-----
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const { users, selectedUser } = useAppSelector((state) => state.dashboard);

  const stats = useMemo(() => {
    return users.reduce(
      (acc, curr) => {
        acc.total += 1;
        acc[curr.status as keyof typeof acc] += 1;
        return acc;
      },
      {
        total: 0, none: 0, applied: 0, accepted: 0, rejected: 0
      }
    );
  }, [users])

  // ----->> States <<-----
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [filter, setFilter] = useState(initialFilters)
  const [filteredData, setFilteredData] = useState<User[]>([])

  // ----->> Functions <<-----
  const getAllUsers = async () => {
    try {
      await dispatch(getAllUsersThunk()).unwrap();
    } catch (error) {
      console.log(error);
    }
  }

  const getUserById = async (userId: string) => {
    try {
      await dispatch(getUserByIdThunk(userId)).unwrap();
    } catch (error) {
      console.log(error);
    }
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
      getUserById(selectedUserId)
    }
  }, [selectedUserId])

  //# Logs 
  console.log('users', users)
  console.log('selectedUser', selectedUser)

  return (
    <>
      <div className={`${styles.user_container} ${styles[theme]}`}>
        <div className={styles.title}>User Model</div>
        <div className={styles.divider}></div>
        <div className={styles.actions}>
          <div className={styles.items}>
            <div className={styles.item}><span><Plus /></span>Add</div>
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
                        <span title='View' onClick={() => setSelectedUserId(classItem._id)} className={styles.action_icon}><Eye /></span>
                        <span title='Edit' onClick={() => setSelectedUserId(classItem._id)} className={styles.action_icon}><Edit /></span>
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
                <td>Accepted User</td>
                <td>Rejected User</td>
                <td>Applied User</td>
                <td>None User</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{stats.total}</td>
                <td>{stats.accepted}</td>
                <td>{stats.rejected}</td>
                <td>{stats.applied}</td>
                <td>{stats.none}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div >
    </>
  )
}

export default Class