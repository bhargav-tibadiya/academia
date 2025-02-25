// Styles
import styles from './institute.module.scss'
import { Eye, Edit, ArrowLeft, ArrowRight, Plus } from '../../../../../assets/icon/rooticon'

// Utils & Config
import useTheme from '../../../../../utils/hooks/useTheme';
import { useEffect, useMemo, useState } from 'react';

// Constants & Types

interface InstituteData {
  name: string,
  department: string,
}
const initialFilters = {
  filterKey: undefined,
  filterValue: undefined,
  page: 1,
  recordPerPage: 10
}
const dummyInstituteData: InstituteData[] = [
  { name: "Stanford University", department: "18" },
  { name: "Oxford Academic Center", department: "12" },
  { name: "Harvard School of Sciences", department: "21" },
  { name: "Massachusetts Technical College", department: "26" },
  { name: "Cambridge Research Foundation", department: "15" },
  { name: "Berkeley Innovation Hub", department: "19" },
  { name: "Yale Educational Consortium", department: "14" },
  { name: "Princeton Advanced Studies", department: "9" },
  { name: "Columbia Global Academy", department: "17" },
  { name: "California Technology Center", department: "8" },
  { name: "Johns Hopkins Medical Foundation", department: "24" },
  { name: "Imperial College London", department: "16" },
  { name: "University of Chicago", department: "13" },
  { name: "UCLA Research Center", department: "22" },
  { name: "Cornell University", department: "17" },
  { name: "Toronto Polytechnic", department: "19" },
  { name: "Tokyo Science University", department: "28" },
  { name: "Singapore National Academy", department: "11" },
  { name: "ETH Zurich", department: "23" },
  { name: "Peking University", department: "20" },
  { name: "Melbourne Research Institute", department: "14" },
  { name: "Seoul National University", department: "25" },
  { name: "Delhi Technical University", department: "12" },
  { name: "Max Planck Institute", department: "18" },
  { name: "Munich Technical University", department: "15" }
]


const Institute = () => {

  // Hooks
  const { theme } = useTheme();

  const stats = useMemo(() => {
    return dummyInstituteData.reduce(
      (acc, curr) => {
        acc.total += 1;
        acc.department += parseInt(curr.department, 10)
        return acc;
      },
      {
        total: 0, department: 0
      }
    );
    // TODO : Add data source as dependency
  }, [])

  // States
  const [filter, setFilter] = useState(initialFilters)
  const [initialData, setInitialData] = useState<InstituteData[]>([])
  const [filteredData, setFilteredData] = useState(dummyInstituteData)


  // Functions
  useEffect(() => {
    const filterData = (InstituteData: InstituteData[], filterKey: keyof InstituteData | undefined, filterValue: string | undefined, page: number) => {

      let tmpData = [...InstituteData];

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
      setInitialData(dummyInstituteData)
    }
  }, [initialData])


  //# Logs    

  return (
    <div className={`${styles.institute_container} ${styles[theme]}`}>
      <div className={styles.title}>Institute Model</div>
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
              <td>Name</td>
              <td>Department</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((student, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{student.name}</td>
                  <td>{student.department}</td>
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
              <td>Total Institutes</td>
              <td>Total Departments</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{stats.total}</td>
              <td>{stats.department}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div >
  )
}

export default Institute