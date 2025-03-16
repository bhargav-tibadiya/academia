// Packages
import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';

// Styles
import styles from './class.module.scss'
import { Eye, Edit, ArrowLeft, ArrowRight, Plus } from '../../../../../assets/icon/rooticon'
import ClassForm from '../../../../../components/forms/class/form';

// Utils & Config
import useTheme from '../../../../../utils/hooks/useTheme';

// Constants & Types
import { Class } from '@/types/store/thunks/dashboard';
import { getAllClassThunk } from '@/store/thunks/dashboard.thunk';

const initialFilters = {
  filterKey: undefined,
  filterValue: undefined,
  page: 1,
  recordPerPage: 10
}

const AdminClass = () => {
  // ----->> Hooks <<-----
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const { classes } = useAppSelector((state) => state.dashboard);

  // ----->> States <<-----
  const [filter, setFilter] = useState(initialFilters)
  const [filteredData, setFilteredData] = useState(classes)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null)
  const [mode, setMode] = useState<"view" | "edit">("view");

  const stats = useMemo(() => {
    return classes.reduce(
      (acc, curr) => {
        acc.totalClass += 1;
        acc.totalStudents += curr.students.length;
        acc.totalExams += curr.exams.length;
        acc.totalUpdates += curr.updates.length;
        return acc;
      },
      { totalClass: 0, totalStudents: 0, totalExams: 0, totalUpdates: 0 }
    );
  }, [classes])

  // ----->> Functions <<-----
  const getAllClasses = async () => {
    try {
      await dispatch(getAllClassThunk()).unwrap();
    } catch (error) {
      console.log(error);
    }
  }

  const handleClose = () => {
    setIsOpen(false);
    setSelectedClassId(null);
  }

  // ----->> Filtering <<-----
  useEffect(() => {
    const filterData = (classData: Class[], filterKey: keyof Class | undefined, filterValue: string | undefined, page: number) => {

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
    filterData(classes, filter.filterKey, filter.filterValue, filter.page)
  }, [filter, classes])

  // ----->> API <<-----
  useEffect(() => {
    getAllClasses();
  }, [dispatch])

  useEffect(() => {
    if (selectedClassId) {
      setIsOpen(true)
    }
  }, [selectedClassId])

  //# Logs  

  return (<>
    <div className={`${styles.class_container} ${styles[theme]}`}>
      <div className={styles.title}>Class Model</div>
      <div className={styles.divider}></div>
      <div className={styles.actions}>
        <div className={styles.items}>
          <div className={styles.item} onClick={() => { setSelectedClassId(null); setMode("edit"); setIsOpen(true) }}><span><Plus /></span>Add</div>
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
            disabled={filter.page === Math.ceil(classes.length / filter.recordPerPage)}
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
                  <td>{classItem.students.length}</td>
                  <td>{classItem.exams.length}</td>
                  <td>{classItem.updates.length}</td>
                  <td>
                    <div className={styles.action_icons}>
                      <span title='View' onClick={() => { setSelectedClassId(classItem._id); setMode("view"); setIsOpen(true) }} className={styles.action_icon}><Eye /></span>
                      <span title='Edit' onClick={() => { setSelectedClassId(classItem._id); setMode("edit"); setIsOpen(true) }} className={styles.action_icon}><Edit /></span>
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
    <ClassForm mode={mode} isOpen={isOpen} onClose={handleClose} selectedClassId={selectedClassId} />
  </>)
}

export default AdminClass;