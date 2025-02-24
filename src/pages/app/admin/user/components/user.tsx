// Styles
import styles from './user.module.scss'
import { Eye, Edit, ArrowLeft, ArrowRight, Plus } from '../../../../../assets/icon/rooticon'

// Utils & Config
import useTheme from '../../../../../utils/hooks/useTheme';
import { useEffect, useMemo, useState } from 'react';

// Constants & Types

interface UserData {
  userId: number,
  email: string,
  role: string,
  status: "none" | "applied" | "accepted" | "rejected"
}
const initialFilters = {
  filterKey: undefined,
  filterValue: undefined,
  page: 1,
  recordPerPage: 10
}
const dummyUserData: UserData[] = [
  { userId: 51, email: "user1@example.com", role: "student", status: "none" },
  { userId: 59, email: "user2@example.com", role: "teacher", status: "applied" },
  { userId: 68, email: "user3@example.com", role: "admin", status: "accepted" },
  { userId: 78, email: "user4@example.com", role: "student", status: "rejected" },
  { userId: 85, email: "user5@example.com", role: "student", status: "none" },
  { userId: 96, email: "user6@example.com", role: "teacher", status: "applied" },
  { userId: 107, email: "user7@example.com", role: "admin", status: "accepted" },
  { userId: 108, email: "user8@example.com", role: "student", status: "rejected" },
  { userId: 119, email: "user9@example.com", role: "student", status: "none" },
  { userId: 120, email: "user10@example.com", role: "teacher", status: "applied" },
  { userId: 131, email: "user11@example.com", role: "admin", status: "accepted" },
  { userId: 132, email: "user12@example.com", role: "student", status: "rejected" },
  { userId: 143, email: "user13@example.com", role: "student", status: "none" },
  { userId: 154, email: "user14@example.com", role: "teacher", status: "applied" },
  { userId: 165, email: "user15@example.com", role: "admin", status: "accepted" },
  { userId: 176, email: "user16@example.com", role: "student", status: "rejected" },
  { userId: 177, email: "user17@example.com", role: "student", status: "none" },
  { userId: 178, email: "user18@example.com", role: "teacher", status: "applied" },
  { userId: 179, email: "user19@example.com", role: "admin", status: "accepted" },
  { userId: 280, email: "user20@example.com", role: "student", status: "rejected" },
  { userId: 291, email: "user21@example.com", role: "student", status: "none" },
  { userId: 292, email: "user22@example.com", role: "teacher", status: "applied" },
  { userId: 293, email: "user23@example.com", role: "admin", status: "accepted" },
  { userId: 294, email: "user24@example.com", role: "student", status: "rejected" },
  { userId: 298, email: "user25@example.com", role: "student", status: "none" }
]


const Class = () => {

  // Hooks
  const { theme } = useTheme();

  const stats = useMemo(() => {
    return dummyUserData.reduce(
      (acc, curr) => {
        acc.total += 1;
        acc[curr.status] += 1;
        return acc;
      },
      {
        total: 0, none: 0, applied: 0, accepted: 0, rejected: 0
      }
    );
    // TODO :   Add data source as dependency
  }, [])

  // States
  const [filter, setFilter] = useState(initialFilters)
  const [initialData, setInitialData] = useState<UserData[]>([])
  const [filteredData, setFilteredData] = useState(dummyUserData)


  // Functions
  useEffect(() => {
    const filterData = (userData: UserData[], filterKey: keyof UserData | undefined, filterValue: string | undefined, page: number) => {

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
    filterData(initialData, filter.filterKey, filter.filterValue, filter.page)
  }, [filter, initialData])

  useEffect(() => {
    if (!initialData || initialData.length === 0) {
      setInitialData(dummyUserData)
    }
  }, [initialData])


  //# Logs  

  return (
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
            disabled={filter.page === Math.ceil(initialData.length / filter.recordPerPage)}
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
                      <span title='View' className={styles.action_icon}><Eye /></span>
                      <span title='Edit' className={styles.action_icon}><Edit /></span>
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
              <td>No StatusUser</td>
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
  )
}

export default Class