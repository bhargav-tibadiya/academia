// Styles
import styles from './result.module.scss'
import { Eye, Edit, ArrowLeft, ArrowRight, Plus } from '../../../../../assets/icon/rooticon'

// Utils & Config
import useTheme from '../../../../../utils/hooks/useTheme';
import { useEffect, useMemo, useState } from 'react';

// Constants & Types

interface ResultData {
  semester: number;
  time: string;
  regular: boolean;
  result: {
    overallGrade: string;
    SGPA: number;
    CGPA: number;
  }
}
const initialFilters = {
  filterKey: undefined,
  filterValue: undefined,
  page: 1,
  recordPerPage: 10
}
const dummyResultData: ResultData[] = [
  { semester: 1, time: "Winter", regular: true, result: { overallGrade: "A+", SGPA: 9.8, CGPA: 9.8 } },
  { semester: 2, time: "Summer", regular: true, result: { overallGrade: "A", SGPA: 9.2, CGPA: 9.5 } },
  { semester: 3, time: "Winter", regular: true, result: { overallGrade: "A-", SGPA: 8.9, CGPA: 9.3 } },
  { semester: 4, time: "Summer", regular: true, result: { overallGrade: "B+", SGPA: 8.5, CGPA: 9.1 } },
  { semester: 5, time: "Winter", regular: true, result: { overallGrade: "A", SGPA: 9.3, CGPA: 9.14 } },
  { semester: 6, time: "Summer", regular: true, result: { overallGrade: "A+", SGPA: 9.7, CGPA: 9.23 } },
  { semester: 7, time: "Winter", regular: true, result: { overallGrade: "A", SGPA: 9.1, CGPA: 9.21 } },
  { semester: 8, time: "Summer", regular: true, result: { overallGrade: "A-", SGPA: 8.8, CGPA: 9.16 } },
  { semester: 1, time: "Summer", regular: false, result: { overallGrade: "B", SGPA: 7.9, CGPA: 7.9 } },
  { semester: 2, time: "Winter", regular: true, result: { overallGrade: "B+", SGPA: 8.3, CGPA: 8.1 } },
  { semester: 3, time: "Summer", regular: true, result: { overallGrade: "B", SGPA: 8.0, CGPA: 8.07 } },
  { semester: 4, time: "Winter", regular: true, result: { overallGrade: "A-", SGPA: 8.7, CGPA: 8.23 } },
  { semester: 5, time: "Summer", regular: false, result: { overallGrade: "B-", SGPA: 7.5, CGPA: 8.08 } },
  { semester: 6, time: "Winter", regular: true, result: { overallGrade: "B+", SGPA: 8.4, CGPA: 8.13 } },
  { semester: 7, time: "Summer", regular: true, result: { overallGrade: "A", SGPA: 9.0, CGPA: 8.26 } },
  { semester: 8, time: "Winter", regular: true, result: { overallGrade: "A+", SGPA: 9.5, CGPA: 8.41 } },
  { semester: 1, time: "Winter", regular: true, result: { overallGrade: "B+", SGPA: 8.2, CGPA: 8.2 } },
  { semester: 2, time: "Summer", regular: true, result: { overallGrade: "A-", SGPA: 8.6, CGPA: 8.4 } },
  { semester: 3, time: "Winter", regular: false, result: { overallGrade: "C+", SGPA: 7.2, CGPA: 8.0 } },
  { semester: 4, time: "Summer", regular: true, result: { overallGrade: "B", SGPA: 8.0, CGPA: 8.0 } },
  { semester: 5, time: "Winter", regular: true, result: { overallGrade: "B+", SGPA: 8.3, CGPA: 8.06 } },
  { semester: 6, time: "Summer", regular: true, result: { overallGrade: "A", SGPA: 9.1, CGPA: 8.23 } },
  { semester: 7, time: "Winter", regular: true, result: { overallGrade: "A+", SGPA: 9.6, CGPA: 8.43 } },
  { semester: 8, time: "Summer", regular: false, result: { overallGrade: "B", SGPA: 8.0, CGPA: 8.38 } },
  { semester: 1, time: "Summer", regular: true, result: { overallGrade: "A", SGPA: 9.0, CGPA: 9.0 } }
]


const Result = () => {

  // Hooks
  const { theme } = useTheme();

  const stats = useMemo(() => {
    return dummyResultData.reduce(
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
  const [initialData, setInitialData] = useState<ResultData[]>([])
  const [filteredData, setFilteredData] = useState(dummyResultData)


  // Functions
  useEffect(() => {
    const filterData = (ResultData: ResultData[], filterKey: keyof ResultData | undefined, filterValue: string | undefined, page: number) => {

      let tmpData = [...ResultData];

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
      setInitialData(dummyResultData)
    }
  }, [initialData])


  //# Logs    

  return (
    <div className={`${styles.result_container} ${styles[theme]}`}>
      <div className={styles.title}>Result Model</div>
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
              <td>Semester</td>
              <td>Time</td>
              <td>Regular</td>
              <td>Overall Grade</td>
              <td>SGPA</td>
              <td>CGPA</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((student, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{student.semester}</td>
                  <td>{student.time}</td>
                  <td>{student.regular ? "Yes" : "No"}</td>
                  <td>{student.result.overallGrade}</td>
                  <td>{student.result.SGPA}</td>
                  <td>{student.result.CGPA}</td>
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
              <td>Total Results</td>
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

export default Result