// Styles
import styles from './placement.module.scss'
import { Eye, Edit, ArrowLeft, ArrowRight, Plus } from '../../../../../assets/icon/rooticon'

// Utils & Config
import useTheme from '../../../../../utils/hooks/useTheme';
import { useEffect, useMemo, useState } from 'react';

// Constants & Types

interface PlacementData {
  name: string,
  jobRole: string,
  agreement: string,
  package: string,
  requirement: string,
  deadline: string,
  appliedStudents: string,
}
const initialFilters = {
  filterKey: undefined,
  filterValue: undefined,
  page: 1,
  recordPerPage: 10
}
const dummyPlacementData: PlacementData[] = [
  { name: "Moon Labs Studio", jobRole: "Graphics Designer", agreement: "1.5 Year", package: "3.6 LPA", requirement: "6 Opening", deadline: "24-05-2025", appliedStudents: "64" },
  { name: "Nexus Technologies", jobRole: "Frontend Developer", agreement: "2 Year", package: "4.2 LPA", requirement: "8 Opening", deadline: "15-03-2025", appliedStudents: "87" },
  { name: "Quantum Solutions", jobRole: "Data Analyst", agreement: "1 Year", package: "3.8 LPA", requirement: "4 Opening", deadline: "10-04-2025", appliedStudents: "52" },
  { name: "Apex Digital Systems", jobRole: "UI/UX Designer", agreement: "2.5 Year", package: "4.5 LPA", requirement: "3 Opening", deadline: "30-03-2025", appliedStudents: "73" },
  { name: "Innovate Tech", jobRole: "Backend Developer", agreement: "3 Year", package: "5.2 LPA", requirement: "5 Opening", deadline: "18-06-2025", appliedStudents: "91" },
  { name: "Pulse Media Group", jobRole: "Content Creator", agreement: "1 Year", package: "3.2 LPA", requirement: "7 Opening", deadline: "12-04-2025", appliedStudents: "48" },
  { name: "Horizon AI", jobRole: "Machine Learning Engineer", agreement: "2 Year", package: "6.5 LPA", requirement: "2 Opening", deadline: "05-07-2025", appliedStudents: "124" },
  { name: "CyberShield", jobRole: "Security Analyst", agreement: "2.5 Year", package: "5.0 LPA", requirement: "4 Opening", deadline: "22-03-2025", appliedStudents: "68" },
  { name: "GlobalConnect", jobRole: "Network Administrator", agreement: "1.5 Year", package: "4.0 LPA", requirement: "3 Opening", deadline: "14-05-2025", appliedStudents: "43" },
  { name: "VisionCraft", jobRole: "3D Modeler", agreement: "2 Year", package: "3.9 LPA", requirement: "5 Opening", deadline: "28-04-2025", appliedStudents: "56" },
  { name: "DataSphere", jobRole: "Database Administrator", agreement: "3 Year", package: "4.8 LPA", requirement: "2 Opening", deadline: "17-03-2025", appliedStudents: "74" },
  { name: "Echo Systems", jobRole: "DevOps Engineer", agreement: "2 Year", package: "5.5 LPA", requirement: "6 Opening", deadline: "09-06-2025", appliedStudents: "83" },
  { name: "Fusion Analytics", jobRole: "Business Analyst", agreement: "1 Year", package: "3.7 LPA", requirement: "8 Opening", deadline: "20-05-2025", appliedStudents: "59" },
  { name: "Stellar Innovations", jobRole: "Product Manager", agreement: "2.5 Year", package: "5.8 LPA", requirement: "1 Opening", deadline: "11-04-2025", appliedStudents: "112" },
  { name: "Binary Logic", jobRole: "Software Tester", agreement: "1.5 Year", package: "3.5 LPA", requirement: "7 Opening", deadline: "25-03-2025", appliedStudents: "67" },
  { name: "Vertex Solutions", jobRole: "Full Stack Developer", agreement: "3 Year", package: "6.0 LPA", requirement: "4 Opening", deadline: "19-07-2025", appliedStudents: "103" },
  { name: "Prism Digital", jobRole: "Digital Marketing Specialist", agreement: "1 Year", package: "3.4 LPA", requirement: "5 Opening", deadline: "08-04-2025", appliedStudents: "41" },
  { name: "TechForge", jobRole: "Systems Architect", agreement: "2 Year", package: "5.6 LPA", requirement: "2 Opening", deadline: "02-06-2025", appliedStudents: "89" },
  { name: "Catalyst Research", jobRole: "Research Associate", agreement: "2.5 Year", package: "4.3 LPA", requirement: "3 Opening", deadline: "13-05-2025", appliedStudents: "62" },
  { name: "Lumina Studios", jobRole: "Animation Artist", agreement: "1.5 Year", package: "3.8 LPA", requirement: "6 Opening", deadline: "21-04-2025", appliedStudents: "58" },
  { name: "Synapse Networks", jobRole: "Cloud Engineer", agreement: "2 Year", package: "5.3 LPA", requirement: "4 Opening", deadline: "16-06-2025", appliedStudents: "77" },
  { name: "Elevate Solutions", jobRole: "Project Coordinator", agreement: "1 Year", package: "3.3 LPA", requirement: "5 Opening", deadline: "27-03-2025", appliedStudents: "49" },
  { name: "Cobalt Technologies", jobRole: "IoT Developer", agreement: "2.5 Year", package: "4.7 LPA", requirement: "3 Opening", deadline: "07-05-2025", appliedStudents: "71" },
  { name: "Zenith Systems", jobRole: "Mobile App Developer", agreement: "2 Year", package: "4.5 LPA", requirement: "8 Opening", deadline: "31-05-2025", appliedStudents: "94" },
  { name: "Pulse Analytics", jobRole: "Data Scientist", agreement: "3 Year", package: "6.2 LPA", requirement: "2 Opening", deadline: "04-04-2025", appliedStudents: "118" }
]


const Placement = () => {

  // Hooks
  const { theme } = useTheme();

  const stats = useMemo(() => {
    return dummyPlacementData.reduce(
      (acc, curr) => {
        acc.total += 1;
        acc.applications += parseInt(curr.appliedStudents, 10)
        return acc;
      },
      {
        total: 0, applications: 0
      }
    );
    // TODO : Add data source as dependency
  }, [])

  // States
  const [filter, setFilter] = useState(initialFilters)
  const [initialData, setInitialData] = useState<PlacementData[]>([])
  const [filteredData, setFilteredData] = useState(dummyPlacementData)


  // Functions
  useEffect(() => {
    const filterData = (PlacementData: PlacementData[], filterKey: keyof PlacementData | undefined, filterValue: string | undefined, page: number) => {

      let tmpData = [...PlacementData];

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
      setInitialData(dummyPlacementData)
    }
  }, [initialData])


  //# Logs    

  return (
    <div className={`${styles.profile_container} ${styles[theme]}`}>
      <div className={styles.title}>Placement Model</div>
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
              <td>Job Role</td>
              <td>Agreement</td>
              <td>Package</td>
              <td>Requirement</td>
              <td>Deadline</td>
              <td>Applied Students</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((student, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{student.name}</td>
                  <td>{student.jobRole}</td>
                  <td>{student.agreement}</td>
                  <td>{student.package}</td>
                  <td>{student.requirement}</td>
                  <td>{student.deadline}</td>
                  <td>{student.appliedStudents}</td>
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
              <td>Total Applications</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{stats.total}</td>
              <td>{stats.applications}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div >
  )
}

export default Placement