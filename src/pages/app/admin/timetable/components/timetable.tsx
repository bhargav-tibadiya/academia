// Styles
import styles from './timetable.module.scss'
import { Eye, Edit, ArrowLeft, ArrowRight, Plus } from '../../../../../assets/icon/rooticon'

// Utils & Config
import useTheme from '../../../../../utils/hooks/useTheme';
import { useEffect, useMemo, useState } from 'react';

// Constants & Types

interface TimetableData {
  id: string,
}
const initialFilters = {
  filterKey: undefined,
  filterValue: undefined,
  page: 1,
  recordPerPage: 10
}
const dummyTimetableData: TimetableData[] = [
  { id: "18" },
  { id: "12" },
  { id: "21" },
  { id: "26" },
  { id: "15" },
  { id: "19" },
  { id: "14" },
  { id: "9" },
  { id: "17" },
  { id: "8" },
  { id: "24" },
  { id: "16" },
  { id: "13" },
  { id: "22" },
  { id: "17" },
  { id: "19" },
  { id: "28" },
  { id: "11" },
  { id: "23" },
  { id: "20" },
  { id: "14" },
  { id: "25" },
  { id: "12" },
  { id: "18" },
  { id: "15" }
]


const Timetable = () => {

  // Hooks
  const { theme } = useTheme();

  const stats = useMemo(() => {
    return dummyTimetableData.reduce(
      (acc) => {
        acc.total += 1;
        return acc;
      },
      {
        total: 0
      }
    );
    // TODO : Add data source as dependency
  }, [])

  // States
  const [filter, setFilter] = useState(initialFilters)
  const [initialData, setInitialData] = useState<TimetableData[]>([])
  const [filteredData, setFilteredData] = useState(dummyTimetableData)


  // Functions
  useEffect(() => {
    const filterData = (TimetableData: TimetableData[], filterKey: keyof TimetableData | undefined, filterValue: string | undefined, page: number) => {

      let tmpData = [...TimetableData];

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
      setInitialData(dummyTimetableData)
    }
  }, [initialData])


  //# Logs    

  return (
    <div className={`${styles.timetable_container} ${styles[theme]}`}>
      <div className={styles.title}>Timetable Model</div>
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
              <td>UserId</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((student, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{student.id}</td>
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
              <td>Total Timetables</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{stats.total}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div >
  )
}

export default Timetable