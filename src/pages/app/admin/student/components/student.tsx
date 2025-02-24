// Styles
import styles from './student.module.scss'
import { Eye, Edit, ArrowLeft, ArrowRight, Plus } from '../../../../../assets/icon/rooticon'

// Utils & Config
import useTheme from '../../../../../utils/hooks/useTheme';
import { useEffect, useMemo, useState } from 'react';

// Constants & Types

interface StudentData {
  enrollmentNo: number,
  requests: number,
  results: number,
  notifications: number,
  fees: number,
}
const initialFilters = {
  filterKey: undefined,
  filterValue: undefined,
  page: 1,
  recordPerPage: 10
}
const dummyStudentData: StudentData[] = [
  { enrollmentNo: 1023, requests: 2, results: 5, notifications: 3, fees: 4 },
  { enrollmentNo: 1045, requests: 1, results: 7, notifications: 1, fees: 6 },
  { enrollmentNo: 1062, requests: 0, results: 4, notifications: 2, fees: 3 },
  { enrollmentNo: 1078, requests: 3, results: 6, notifications: 4, fees: 5 },
  { enrollmentNo: 1091, requests: 2, results: 3, notifications: 3, fees: 4 },
  { enrollmentNo: 1110, requests: 4, results: 8, notifications: 2, fees: 6 },
  { enrollmentNo: 1125, requests: 1, results: 5, notifications: 1, fees: 3 },
  { enrollmentNo: 1137, requests: 0, results: 7, notifications: 0, fees: 5 },
  { enrollmentNo: 1153, requests: 3, results: 6, notifications: 2, fees: 4 },
  { enrollmentNo: 1169, requests: 2, results: 4, notifications: 3, fees: 5 },
  { enrollmentNo: 1185, requests: 1, results: 3, notifications: 1, fees: 3 },
  { enrollmentNo: 1200, requests: 0, results: 8, notifications: 0, fees: 6 },
  { enrollmentNo: 1217, requests: 4, results: 7, notifications: 5, fees: 5 },
  { enrollmentNo: 1231, requests: 3, results: 5, notifications: 3, fees: 4 },
  { enrollmentNo: 1249, requests: 2, results: 6, notifications: 2, fees: 3 },
  { enrollmentNo: 1263, requests: 0, results: 4, notifications: 1, fees: 5 },
  { enrollmentNo: 1278, requests: 1, results: 7, notifications: 0, fees: 4 },
  { enrollmentNo: 1295, requests: 2, results: 6, notifications: 4, fees: 3 },
  { enrollmentNo: 1308, requests: 3, results: 8, notifications: 2, fees: 6 },
  { enrollmentNo: 1324, requests: 4, results: 5, notifications: 3, fees: 4 },
  { enrollmentNo: 1341, requests: 2, results: 7, notifications: 1, fees: 5 },
  { enrollmentNo: 1357, requests: 1, results: 4, notifications: 2, fees: 3 },
  { enrollmentNo: 1372, requests: 0, results: 3, notifications: 0, fees: 4 },
  { enrollmentNo: 1389, requests: 3, results: 6, notifications: 3, fees: 5 },
  { enrollmentNo: 1405, requests: 2, results: 8, notifications: 2, fees: 6 }
]


const Student = () => {

  // Hooks
  const { theme } = useTheme();

  const stats = useMemo(() => {
    return dummyStudentData.reduce(
      (acc, curr) => {
        acc.total += 1;
        acc.requests += curr.requests
        acc.results += curr.results
        acc.notifications += curr.notifications
        acc.fees += curr.fees
        return acc;
      },
      {
        total: 0, requests: 0, results: 0, notifications: 0, fees: 0
      }
    );
    // TODO :   Add data source as dependency
  }, [])

  // States
  const [filter, setFilter] = useState(initialFilters)
  const [initialData, setInitialData] = useState<StudentData[]>([])
  const [filteredData, setFilteredData] = useState(dummyStudentData)


  // Functions
  useEffect(() => {
    const filterData = (StudentData: StudentData[], filterKey: keyof StudentData | undefined, filterValue: string | undefined, page: number) => {

      let tmpData = [...StudentData];

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
      setInitialData(dummyStudentData)
    }
  }, [initialData])


  //# Logs  

  return (
    <div className={`${styles.student_container} ${styles[theme]}`}>
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
              <td>Enrollment No</td>
              <td>Requests</td>
              <td>Results</td>
              <td>Notifications</td>
              <td>Fees</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((student, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{student.enrollmentNo}</td>
                  <td>{student.requests}</td>
                  <td>{student.results}</td>
                  <td>{student.notifications}</td>
                  <td>{student.fees}</td>
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
              <td>Students</td>
              <td>Requests</td>
              <td>Results</td>
              <td>Notifications</td>
              <td>Fees</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{stats.total}</td>
              <td>{stats.requests}</td>
              <td>{stats.results}</td>
              <td>{stats.notifications}</td>
              <td>{stats.fees}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div >
  )
}

export default Student