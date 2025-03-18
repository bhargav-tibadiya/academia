// Packages
import { useEffect, useMemo, useState } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '@/store/store';
import dayjs from 'dayjs';

// Styles
import styles from './profile.module.scss'
import { Eye, Edit, ArrowLeft, ArrowRight, Plus } from '@/assets/icon/rooticon'

// Utils & Config
import useTheme from '@/utils/hooks/useTheme';
import ProfileForm from '@/components/forms/profile/form';
import { getAllProfileThunk } from '@/store/thunks/dashboard.thunk';

// Constants & Types
import { Profile } from '@/types/store/thunks/dashboard';

const initialFilters = {
  filterKey: undefined,
  filterValue: undefined,
  page: 1,
  recordPerPage: 10
}

const Student = () => {
  //  ----->> Hooks <<-----
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const { profiles } = useAppSelector((state: RootState) => state.dashboard);

  const stats = useMemo(() => {
    return profiles.reduce(
      (acc) => {
        acc.total += 1;
        return acc;
      },
      {
        total: 0
      }
    );
    // TODO :   Add data source as dependency
  }, [profiles])

  //  ----->> States <<-----
  const [filter, setFilter] = useState(initialFilters)
  const [filteredData, setFilteredData] = useState(profiles)
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [mode, setMode] = useState<"view" | "edit">("view");

  //  ----->> Functions <<-----
  const getAllProfiles = async () => {
    try {
      await dispatch(getAllProfileThunk()).unwrap();
    } catch (error) {
      console.log(error);
    }
  }

  const handleClose = () => {
    setIsOpen(false);
    setSelectedProfileId(null);
  }

  // ----->> Filtering <<-----
  useEffect(() => {
    const filterData = (ProfileData: Profile[], filterKey: keyof Profile | undefined, filterValue: string | undefined, page: number) => {

      let tmpData = [...ProfileData];

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
    filterData(profiles, filter.filterKey, filter.filterValue, filter.page)
  }, [filter, profiles])

  // ----->> API <<-----
  useEffect(() => {
    getAllProfiles();
  }, [dispatch])

  useEffect(() => {
    if (selectedProfileId) {
      setIsOpen(true)
    }
  }, [selectedProfileId])

  //# Logs  

  return (<>
    <div className={`${styles.profile_container} ${styles[theme]}`}>
      <div className={styles.title}>Profile Model</div>
      <div className={styles.divider}></div>
      <div className={styles.actions}>
        <div className={styles.items} onClick={() => { setSelectedProfileId(null); setMode("edit"); setIsOpen(true) }}>
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
            disabled={filter.page === Math.ceil(profiles.length / filter.recordPerPage)}
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
              <td>Gender</td>
              <td>Birth Date</td>
              <td>Blood Group</td>
              <td>Contact</td>
              <td>Father Name</td>
              <td>Mother Name</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((student, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{student.firstName} {student.middleName} {student.lastName}</td>
                  <td>{student.gender}</td>
                  <td>{dayjs(student.birthDate).format("DD-MM-YYYY")}</td>
                  <td>{student.bloodGroup}</td>
                  <td>{student.contact}</td>
                  <td>{student.fatherName}</td>
                  <td>{student.motherName}</td>
                  <td>
                    <div className={styles.action_icons}>
                      <span title='View' onClick={() => { setMode("view"); setSelectedProfileId(student._id) }} className={styles.action_icon}><Eye /></span>
                      <span title='Edit' onClick={() => { setMode("edit"); setSelectedProfileId(student._id) }} className={styles.action_icon}><Edit /></span>
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
    <ProfileForm mode={mode} isOpen={isOpen} onClose={handleClose} selectedProfileId={selectedProfileId} />
  </>)
}

export default Student