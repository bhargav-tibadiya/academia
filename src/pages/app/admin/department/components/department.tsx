// Packages
import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';

// Styles
import styles from './department.module.scss'
import { Eye, Edit, ArrowLeft, ArrowRight, Plus } from '@/assets/icon/rooticon'

// Utils & Config
import useTheme from '@/utils/hooks/useTheme';
import { Department } from '@/types/store/thunks/dashboard';
import { getAllDepartmentThunk } from '@/store/thunks/dashboard.thunk';
import DepartmentForm from '@/components/forms/department/form';

// Constants & Types
const initialFilters = {
  filterKey: undefined,
  filterValue: undefined,
  page: 1,
  recordPerPage: 10
}

const DashboardDepartment = () => {
  // ----->> Hooks <<-----
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const { departments } = useAppSelector((state) => state.dashboard);

  // ----->> States <<-----
  const [filter, setFilter] = useState(initialFilters)
  const [filteredData, setFilteredData] = useState<Department[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string | null>(null)
  const [mode, setMode] = useState<"view" | "edit">("view");

  const stats = useMemo(() => {
    return departments.reduce(
      (acc) => {
        acc.total += 1;
        return acc;
      },
      {
        total: 0
      }
    );
  }, [departments])


  // ----->> Functions <<-----
  const getAllDepartments = async () => {
    try {
      await dispatch(getAllDepartmentThunk()).unwrap();
    } catch (error) {
      console.log(error);
    }
  }

  const handleClose = () => {
    setIsOpen(false);
    setSelectedDepartmentId(null);
  }

  // ----->> Filtering <<-----
  useEffect(() => {
    const filterData = (departmentData: Department[], filterKey: keyof Department | undefined, filterValue: string | undefined, page: number) => {

      let tmpData = [...departmentData];

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
    filterData(departments, filter.filterKey, filter.filterValue, filter.page)
  }, [filter, departments])

  // ----->> API <<-----
  useEffect(() => {
    getAllDepartments();
  }, [dispatch])

  useEffect(() => {
    if (selectedDepartmentId) {
      setIsOpen(true)
    }
  }, [selectedDepartmentId])

  //# Logs    

  return (
    <>
      <div className={`${styles.department_container} ${styles[theme]}`}>
        <div className={styles.title}>Department Model</div>
        <div className={styles.divider}></div>
        <div className={styles.actions}>
          <div className={styles.items}>
            <div className={styles.item} onClick={() => { setSelectedDepartmentId(null); setMode("edit"); setIsOpen(true) }}><span><Plus /></span>Add</div>
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
              disabled={filter.page === Math.ceil(departments.length / filter.recordPerPage)}
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
                <td>Batch</td>
                <td>Classes</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((department, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{department.name}</td>
                    <td>{department.batch}</td>
                    <td>{department.classes.length}</td>
                    <td>
                      <div className={styles.action_icons}>
                        <span title='View' onClick={() => { setSelectedDepartmentId(department._id); setMode("view") }} className={styles.action_icon}><Eye /></span>
                        <span title='Edit' onClick={() => { setSelectedDepartmentId(department._id); setMode("edit") }} className={styles.action_icon}><Edit /></span>
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
                <td>Total Departments</td>
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
      <DepartmentForm
        mode={mode}
        isOpen={isOpen}
        onClose={handleClose}
        selectedDepartmentId={selectedDepartmentId}
      />
    </>
  )
}

export default DashboardDepartment