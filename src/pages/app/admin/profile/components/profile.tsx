// Styles
import styles from './profile.module.scss'
import { Eye, Edit, ArrowLeft, ArrowRight, Plus } from '../../../../../assets/icon/rooticon'

// Utils & Config
import useTheme from '../../../../../utils/hooks/useTheme';
import { useEffect, useMemo, useState } from 'react';

// Constants & Types

interface ProfileData {
  name: string,
  gender: string,
  birthDate: string,
  bloodGroup: string,
  contact: string,
  fatherName: string,
  motherName: string,
}
const initialFilters = {
  filterKey: undefined,
  filterValue: undefined,
  page: 1,
  recordPerPage: 10
}
const dummyProfileData: ProfileData[] = [
  { name: "John Smith", gender: "Male", birthDate: "14-05-2002", bloodGroup: "O+", contact: "9876543210", fatherName: "Michael Smith", motherName: "Emily Smith" },
  { name: "Ethan Johnson", gender: "Male", birthDate: "21-08-2003", bloodGroup: "A+", contact: "9856741230", fatherName: "Robert Johnson", motherName: "Sarah Johnson" },
  { name: "Liam Brown", gender: "Male", birthDate: "30-11-2001", bloodGroup: "B+", contact: "9765412389", fatherName: "James Brown", motherName: "Jessica Brown" },
  { name: "Noah Miller", gender: "Male", birthDate: "25-02-2000", bloodGroup: "AB+", contact: "9123456780", fatherName: "David Miller", motherName: "Laura Miller" },
  { name: "Mason Davis", gender: "Male", birthDate: "12-07-2002", bloodGroup: "O-", contact: "9890123456", fatherName: "John Davis", motherName: "Susan Davis" },
  { name: "James Wilson", gender: "Male", birthDate: "08-06-2003", bloodGroup: "A-", contact: "9785632140", fatherName: "Daniel Wilson", motherName: "Amanda Wilson" },
  { name: "Olivia Moore", gender: "Female", birthDate: "17-03-2002", bloodGroup: "B-", contact: "9123098765", fatherName: "Christopher Moore", motherName: "Ashley Moore" },
  { name: "Emma Taylor", gender: "Female", birthDate: "01-12-2001", bloodGroup: "O+", contact: "9876543201", fatherName: "Matthew Taylor", motherName: "Rebecca Taylor" },
  { name: "Sophia Anderson", gender: "Female", birthDate: "09-09-2000", bloodGroup: "A+", contact: "9765432198", fatherName: "Joshua Anderson", motherName: "Hannah Anderson" },
  { name: "Ava Thomas", gender: "Female", birthDate: "05-01-2003", bloodGroup: "AB-", contact: "9898765432", fatherName: "Joseph Thomas", motherName: "Katherine Thomas" },
  { name: "Isabella Jackson", gender: "Female", birthDate: "20-10-2002", bloodGroup: "B+", contact: "9876543012", fatherName: "Anthony Jackson", motherName: "Victoria Jackson" },
  { name: "Mia White", gender: "Female", birthDate: "15-04-2001", bloodGroup: "O-", contact: "9765123489", fatherName: "Andrew White", motherName: "Elizabeth White" },
  { name: "Charlotte Harris", gender: "Female", birthDate: "29-07-2003", bloodGroup: "A-", contact: "9856234701", fatherName: "William Harris", motherName: "Madison Harris" },
  { name: "Elijah Martin", gender: "Male", birthDate: "14-06-2002", bloodGroup: "O+", contact: "9765432801", fatherName: "Ryan Martin", motherName: "Natalie Martin" },
  { name: "Benjamin Thompson", gender: "Male", birthDate: "07-03-2001", bloodGroup: "B+", contact: "9856743210", fatherName: "Adam Thompson", motherName: "Sophia Thompson" },
  { name: "Harper Garcia", gender: "Female", birthDate: "11-09-2000", bloodGroup: "A+", contact: "9965412389", fatherName: "Jonathan Garcia", motherName: "Chloe Garcia" },
  { name: "Evelyn Martinez", gender: "Female", birthDate: "03-02-2002", bloodGroup: "AB+", contact: "9550123456", fatherName: "Samuel Martinez", motherName: "Isabella Martinez" },
  { name: "Alexander Robinson", gender: "Male", birthDate: "23-05-2003", bloodGroup: "O-", contact: "9323098765", fatherName: "Henry Robinson", motherName: "Eleanor Robinson" },
  { name: "Lucas Clark", gender: "Male", birthDate: "18-08-2001", bloodGroup: "A-", contact: "9465123489", fatherName: "Nathan Clark", motherName: "Olivia Clark" },
  { name: "Scarlett Rodriguez", gender: "Female", birthDate: "26-07-2000", bloodGroup: "B+", contact: "9134567801", fatherName: "Ethan Rodriguez", motherName: "Charlotte Rodriguez" },
  { name: "Daniel Lewis", gender: "Male", birthDate: "04-12-2002", bloodGroup: "AB-", contact: "9908765432", fatherName: "Jack Lewis", motherName: "Ava Lewis" },
  { name: "Zoe Walker", gender: "Female", birthDate: "19-06-2001", bloodGroup: "O+", contact: "9976543012", fatherName: "Caleb Walker", motherName: "Harper Walker" },
  { name: "Matthew Hall", gender: "Male", birthDate: "22-01-2003", bloodGroup: "B-", contact: "9890123412", fatherName: "Isaac Hall", motherName: "Grace Hall" },
  { name: "Lily Young", gender: "Female", birthDate: "10-10-2000", bloodGroup: "A+", contact: "9112345678", fatherName: "Sebastian Young", motherName: "Mia Young" },
  { name: "Henry Allen", gender: "Male", birthDate: "13-04-2002", bloodGroup: "O-", contact: "9785632145", fatherName: "Eli Allen", motherName: "Amelia Allen" }
]


const Student = () => {

  // Hooks
  const { theme } = useTheme();

  const stats = useMemo(() => {
    return dummyProfileData.reduce(
      (acc) => {
        acc.total += 1;
        return acc;
      },
      {
        total: 0
      }
    );
    // TODO :   Add data source as dependency
  }, [])

  // States
  const [filter, setFilter] = useState(initialFilters)
  const [initialData, setInitialData] = useState<ProfileData[]>([])
  const [filteredData, setFilteredData] = useState(dummyProfileData)


  // Functions
  useEffect(() => {
    const filterData = (ProfileData: ProfileData[], filterKey: keyof ProfileData | undefined, filterValue: string | undefined, page: number) => {

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
    filterData(initialData, filter.filterKey, filter.filterValue, filter.page)
  }, [filter, initialData])

  useEffect(() => {
    if (!initialData || initialData.length === 0) {
      setInitialData(dummyProfileData)
    }
  }, [initialData])


  //# Logs  

  return (
    <div className={`${styles.profile_container} ${styles[theme]}`}>
      <div className={styles.title}>User Model</div>
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
                  <td>{student.name}</td>
                  <td>{student.gender}</td>
                  <td>{student.birthDate}</td>
                  <td>{student.bloodGroup}</td>
                  <td>{student.contact}</td>
                  <td>{student.fatherName}</td>
                  <td>{student.motherName}</td>
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

export default Student