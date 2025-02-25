// Styles
import styles from './attendance.module.scss'
import { Eye, Edit, ArrowLeft, ArrowRight, Plus } from '../../../../../assets/icon/rooticon'

// Utils & Config
import useTheme from '../../../../../utils/hooks/useTheme';
import { useEffect, useMemo, useState } from 'react';

// Constants & Types

interface AttendanceData {
  userId: string,
  attendance: string,
}
const initialFilters = {
  filterKey: undefined,
  filterValue: undefined,
  page: 1,
  recordPerPage: 10
}
const dummyAttendanceData: AttendanceData[] = [
  { userId: "65d8754a1f9b3c001f5a7b21", attendance: "78" },
  { userId: "65d8754b1f9b3c001f5a7b22", attendance: "85" },
  { userId: "65d8754c1f9b3c001f5a7b23", attendance: "72" },
  { userId: "65d8754d1f9b3c001f5a7b24", attendance: "90" },
  { userId: "65d8754e1f9b3c001f5a7b25", attendance: "66" },
  { userId: "65d8754f1f9b3c001f5a7b26", attendance: "80" },
  { userId: "65d875501f9b3c001f5a7b27", attendance: "75" },
  { userId: "65d875511f9b3c001f5a7b28", attendance: "88" },
  { userId: "65d875521f9b3c001f5a7b29", attendance: "70" },
  { userId: "65d875531f9b3c001f5a7b2a", attendance: "92" },
  { userId: "65d875541f9b3c001f5a7b2b", attendance: "68" },
  { userId: "65d875551f9b3c001f5a7b2c", attendance: "74" },
  { userId: "65d875561f9b3c001f5a7b2d", attendance: "81" },
  { userId: "65d875571f9b3c001f5a7b2e", attendance: "87" },
  { userId: "65d875581f9b3c001f5a7b2f", attendance: "79" },
  { userId: "65d875591f9b3c001f5a7b30", attendance: "91" },
  { userId: "65d8755a1f9b3c001f5a7b31", attendance: "67" },
  { userId: "65d8755b1f9b3c001f5a7b32", attendance: "84" },
  { userId: "65d8755c1f9b3c001f5a7b33", attendance: "76" },
  { userId: "65d8755d1f9b3c001f5a7b34", attendance: "82" },
  { userId: "65d8755e1f9b3c001f5a7b35", attendance: "73" },
  { userId: "65d8755f1f9b3c001f5a7b36", attendance: "89" },
  { userId: "65d875601f9b3c001f5a7b37", attendance: "77" },
  { userId: "65d875611f9b3c001f5a7b38", attendance: "83" },
  { userId: "65d875621f9b3c001f5a7b39", attendance: "69" },
]


const Attendance = () => {

  // Hooks
  const { theme } = useTheme();

  const stats = useMemo(() => {
    return dummyAttendanceData.reduce(
      (acc, curr) => {
        acc.total += 1;
        acc.attendance += parseInt(curr.attendance, 10)
        return acc;
      },
      {
        total: 0, attendance: 0
      }
    );
    // TODO : Add data source as dependency
  }, [])

  // States
  const [filter, setFilter] = useState(initialFilters)
  const [initialData, setInitialData] = useState<AttendanceData[]>([])
  const [filteredData, setFilteredData] = useState(dummyAttendanceData)


  // Functions
  useEffect(() => {
    const filterData = (AttendanceData: AttendanceData[], filterKey: keyof AttendanceData | undefined, filterValue: string | undefined, page: number) => {

      let tmpData = [...AttendanceData];

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
      setInitialData(dummyAttendanceData)
    }
  }, [initialData])


  //# Logs    

  return (
    <div className={`${styles.attendance_container} ${styles[theme]}`}>
      <div className={styles.title}>Attendance Model</div>
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
              <td>Attendance</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((student, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{student.userId}</td>
                  <td>{student.attendance}</td>
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
              <td>Total Profiles</td>
              <td>Total Attendance</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{stats.total}</td>
              <td>{stats.attendance}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div >
  )
}

export default Attendance