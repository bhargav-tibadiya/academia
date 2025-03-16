// Packages
import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';

// Styles
import styles from './institute.module.scss'
import { Eye, Edit, ArrowLeft, ArrowRight, Plus } from '@/assets/icon/rooticon'

// Utils & Config
import useTheme from '@/utils/hooks/useTheme';
import { getAllInstituteThunk } from '@/store/thunks/dashboard.thunk';
import { Institute } from '@/types/store/thunks/dashboard';
import InstituteForm from '@/components/forms/institute/form';

// Constants & Types
const initialFilters = {
  filterKey: undefined,
  filterValue: undefined,
  page: 1,
  recordPerPage: 10
}


const DashboardInstitute = () => {

  // ----->> Hooks <<-----
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const { institutes } = useAppSelector((state) => state.dashboard);

  const stats = useMemo(() => {
    return institutes.reduce(
      (acc, curr) => {
        acc.total += 1;
        acc.department += curr.departments.length
        return acc;
      },
      {
        total: 0, department: 0
      }
    );
  }, [institutes])

  // ----->> States <<-----
  const [filter, setFilter] = useState(initialFilters)
  const [filteredData, setFilteredData] = useState<Institute[]>([])
  const [selectedInstituteId, setSelectedInstituteId] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [mode, setMode] = useState<"view" | "edit">("view");

  // ----->> Functions <<-----
  const getAllInstitutes = async () => {
    try {
      await dispatch(getAllInstituteThunk()).unwrap();
    } catch (error) {
      console.log(error);
    }
  }

  const handleClose = () => {
    setIsOpen(false);
    setSelectedInstituteId(null);
  }

  // ----->> Filtering <<-----
  useEffect(() => {
    const filterData = (instituteData: Institute[], filterKey: keyof Institute | undefined, filterValue: string | undefined, page: number) => {

      let tmpData = [...instituteData];

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
    filterData(institutes, filter.filterKey, filter.filterValue, filter.page)
  }, [filter, institutes])

  // ----->> API <<-----
  useEffect(() => {
    getAllInstitutes();
  }, [dispatch])

  useEffect(() => {
    if (selectedInstituteId) {
      setIsOpen(true)
    }
  }, [selectedInstituteId])

  //# Logs    

  return (
    <>
      <div className={`${styles.institute_container} ${styles[theme]}`}>
        <div className={styles.title}>Institute Model</div>
        <div className={styles.divider}></div>
        <div className={styles.actions}>
          <div className={styles.items} onClick={() => { setSelectedInstituteId(null); setMode("edit"); setIsOpen(true) }}>
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
              disabled={filter.page === Math.ceil(institutes.length / filter.recordPerPage)}
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
                <td>Departments</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((institute, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{institute.name}</td>
                    <td>{institute.departments.length}</td>
                    <td>
                      <div className={styles.action_icons}>
                        <span title='View' onClick={() => { setSelectedInstituteId(institute._id); setMode("view") }} className={styles.action_icon}><Eye /></span>
                        <span title='Edit' onClick={() => { setSelectedInstituteId(institute._id); setMode("edit") }} className={styles.action_icon}><Edit /></span>
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
      <InstituteForm mode={mode} isOpen={isOpen} selectedInstituteId={selectedInstituteId} onClose={handleClose} />
    </>
  )
}

export default DashboardInstitute