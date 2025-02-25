// Styles
import styles from './update.module.scss'
import { Eye, Edit, ArrowLeft, ArrowRight, Plus } from '../../../../../assets/icon/rooticon'

// Utils & Config
import useTheme from '../../../../../utils/hooks/useTheme';
import { useEffect, useMemo, useState } from 'react';

// Constants & Types

interface UpdateData {
  date: string,
  title: string,
  lastUpdated: string,
}
const initialFilters = {
  filterKey: undefined,
  filterValue: undefined,
  page: 1,
  recordPerPage: 10
}
const dummyUpdateData: UpdateData[] = [
  { date: "15-02-2025", title: "Equipment repair approval update", lastUpdated: "20-02-2025" },
  { date: "12-02-2025", title: "Faculty hiring committee formation", lastUpdated: "18-02-2025" },
  { date: "08-02-2025", title: "Budget allocation for research", lastUpdated: "15-02-2025" },
  { date: "02-02-2025", title: "Lab space reallocation", lastUpdated: "10-02-2025" },
  { date: "25-01-2025", title: "Curriculum review proposal", lastUpdated: "02-02-2025" },
  { date: "20-01-2025", title: "Conference travel fund update", lastUpdated: "28-01-2025" },
  { date: "15-01-2025", title: "New course approval", lastUpdated: "22-01-2025" },
  { date: "10-01-2025", title: "Student exchange program approval", lastUpdated: "17-01-2025" },
  { date: "05-01-2025", title: "Department website update", lastUpdated: "12-01-2025" },
  { date: "28-12-2024", title: "Sabbatical leave application", lastUpdated: "05-01-2025" },
  { date: "20-12-2024", title: "Research grant extension", lastUpdated: "04-01-2025" },
  { date: "15-12-2024", title: "Library resource acquisition", lastUpdated: "22-12-2024" },
  { date: "08-12-2024", title: "Summer program proposal", lastUpdated: "16-12-2024" },
  { date: "03-12-2024", title: "Software license purchase", lastUpdated: "10-12-2024" },
  { date: "28-11-2024", title: "Graduation ceremony planning", lastUpdated: "05-12-2024" },
  { date: "22-11-2024", title: "Building maintenance update", lastUpdated: "30-11-2024" },
  { date: "18-11-2024", title: "Guest speaker invitation", lastUpdated: "25-11-2024" },
  { date: "12-11-2024", title: "Scholarship fund creation", lastUpdated: "19-11-2024" },
  { date: "05-11-2024", title: "International collaboration agreement", lastUpdated: "15-11-2024" },
  { date: "30-10-2024", title: "Lab equipment purchase", lastUpdated: "07-11-2024" },
  { date: "24-10-2024", title: "Faculty promotion review", lastUpdated: "01-11-2024" },
  { date: "18-10-2024", title: "Student support services", lastUpdated: "26-10-2024" },
  { date: "10-10-2024", title: "Curriculum revision committee", lastUpdated: "18-10-2024" },
  { date: "05-10-2024", title: "Event space reservation", lastUpdated: "12-10-2024" },
  { date: "01-10-2024", title: "Research ethics approval", lastUpdated: "09-10-2024" }
]


const Update = () => {

  // Hooks
  const { theme } = useTheme();

  const stats = useMemo(() => {
    return dummyUpdateData.reduce(
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
  const [initialData, setInitialData] = useState<UpdateData[]>([])
  const [filteredData, setFilteredData] = useState(dummyUpdateData)


  // Functions
  useEffect(() => {
    const filterData = (UpdateData: UpdateData[], filterKey: keyof UpdateData | undefined, filterValue: string | undefined, page: number) => {

      let tmpData = [...UpdateData];

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
      setInitialData(dummyUpdateData)
    }
  }, [initialData])


  //# Logs    

  return (
    <div className={`${styles.update_container} ${styles[theme]}`}>
      <div className={styles.title}>Update Model</div>
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
              <td>Date</td>
              <td>Title</td>
              <td>Last Updated</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((student, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{student.date}</td>
                  <td>{student.title}</td>
                  <td>{student.lastUpdated}</td>
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
              <td>Total Updates</td>
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

export default Update