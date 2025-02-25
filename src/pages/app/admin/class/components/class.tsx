// Styles
import styles from './class.module.scss'
import { Eye, Edit, ArrowLeft, ArrowRight, Plus } from '../../../../../assets/icon/rooticon'

// Utils & Config
import useTheme from '../../../../../utils/hooks/useTheme';
import { useEffect, useMemo, useState } from 'react';

// Constants & Types

interface ClassData {
  name: string,
  students: string,
  exams: string,
  update: string
}
const initialFilters = {
  filterKey: undefined,
  filterValue: undefined,
  page: 1,
  recordPerPage: 10
}
const dummyClassData: ClassData[] = [
  {
    name: "IT_DIV_A",
    students: "80",
    exams: "12",
    update: "25"
  },
  {
    name: "IT_DIV_B",
    students: "70",
    exams: "16",
    update: "18"
  },
  {
    name: "IT_DIV_C",
    students: "56",
    exams: "08",
    update: "22"
  },
  {
    name: "CE_DIV_A",
    students: "91",
    exams: "12",
    update: "25"
  },
  {
    name: "CE_DIV_B",
    students: "81",
    exams: "16",
    update: "18"
  },
  {
    name: "CE_DIV_C",
    students: "36",
    exams: "08",
    update: "22"
  },
  {
    name: "ME_DIV_A",
    students: "91",
    exams: "12",
    update: "25"
  },
  {
    name: "ME_DIV_B",
    students: "81",
    exams: "16",
    update: "18"
  },
  {
    name: "ME_DIV_C",
    students: "36",
    exams: "08",
    update: "22"
  },
  {
    name: "CS_DIV_A",
    students: "91",
    exams: "12",
    update: "25"
  },
  {
    name: "CS_DIV_B",
    students: "81",
    exams: "16",
    update: "18"
  },
  {
    name: "CS_DIV_C",
    students: "36",
    exams: "08",
    update: "22"
  },
  {
    name: "MI_DIV_A",
    students: "91",
    exams: "12",
    update: "25"
  },
  {
    name: "MI_DIV_B",
    students: "81",
    exams: "16",
    update: "18"
  },
  {
    name: "MI_DIV_C",
    students: "36",
    exams: "08",
    update: "22"
  },
]


const Class = () => {

  // Hooks
  const { theme } = useTheme();

  const stats = useMemo(() => {
    return dummyClassData.reduce(
      (acc, curr) => {
        acc.totalClass += 1;
        acc.totalStudents += parseInt(curr.students, 10);
        acc.totalExams += parseInt(curr.exams, 10);
        acc.totalUpdates += parseInt(curr.update, 10);
        return acc;
      },
      { totalClass: 0, totalStudents: 0, totalExams: 0, totalUpdates: 0 }
    );
  }, [dummyClassData])

  // States
  const [filter, setFilter] = useState(initialFilters)
  const [initialData, setInitialData] = useState<ClassData[]>([])
  const [filteredData, setFilteredData] = useState(dummyClassData)


  // Functions
  useEffect(() => {
    const filterData = (classData: ClassData[], filterKey: keyof ClassData | undefined, filterValue: string | undefined, page: number) => {

      let tmpData = [...classData];

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
      setInitialData(dummyClassData)
    }
  }, [initialData])


  //# Logs  

  return (
    <div className={`${styles.class_container} ${styles[theme]}`}>
      <div className={styles.title}>Class Model</div>
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
              <td>Students</td>
              <td>Exams</td>
              <td>Updates</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((classItem, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{classItem.name}</td>
                  <td>{classItem.students}</td>
                  <td>{classItem.exams}</td>
                  <td>{classItem.update}</td>
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
              <td>Total Classes</td>
              <td>Total Students</td>
              <td>Total Exams</td>
              <td>Total Updates</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{stats.totalClass}</td>
              <td>{stats.totalStudents}</td>
              <td>{stats.totalExams}</td>
              <td>{stats.totalUpdates}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div >
  )
}

export default Class