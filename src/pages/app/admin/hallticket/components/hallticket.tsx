// Styles
import styles from './hallticket.module.scss'
import { Eye, Edit, ArrowLeft, ArrowRight, Plus } from '../../../../../assets/icon/rooticon'

// Utils & Config
import useTheme from '../../../../../utils/hooks/useTheme';
import { useEffect, useMemo, useState } from 'react';

// Constants & Types

interface HallTicketData {
  seatNo: string,
  name: string,
  institute: string,
  department: string,
  schedule: string,
}
const initialFilters = {
  filterKey: undefined,
  filterValue: undefined,
  page: 1,
  recordPerPage: 10
}
const dummyHallTicketData: HallTicketData[] = [
  { seatNo: "1001", name: "Emily Johnson", institute: "Westlake University", department: "Computer Science", schedule: "3" },
  { seatNo: "1002", name: "Michael Chen", institute: "Riverdale College", department: "Information Technology", schedule: "2" },
  { seatNo: "1003", name: "Jessica Williams", institute: "Oakridge Institute", department: "Computer Science", schedule: "4" },
  { seatNo: "1004", name: "David Rodriguez", institute: "Westlake University", department: "Electrical Engineering", schedule: "3" },
  { seatNo: "1005", name: "Sarah Thompson", institute: "Riverdale College", department: "Computer Science", schedule: "5" },
  { seatNo: "1006", name: "Christopher Lee", institute: "Sunnyvale Tech", department: "Information Technology", schedule: "2" },
  { seatNo: "1007", name: "Amanda Martinez", institute: "Oakridge Institute", department: "Data Science", schedule: "3" },
  { seatNo: "1008", name: "Brandon Taylor", institute: "Westlake University", department: "Information Technology", schedule: "4" },
  { seatNo: "1009", name: "Melissa Brown", institute: "Sunnyvale Tech", department: "Computer Science", schedule: "2" },
  { seatNo: "1010", name: "Tyler Wilson", institute: "Riverdale College", department: "Cybersecurity", schedule: "3" },
  { seatNo: "1011", name: "Samantha Clark", institute: "Oakridge Institute", department: "Information Technology", schedule: "5" },
  { seatNo: "1012", name: "Justin Miller", institute: "Westlake University", department: "Artificial Intelligence", schedule: "2" },
  { seatNo: "1013", name: "Ashley Davis", institute: "Sunnyvale Tech", department: "Computer Science", schedule: "4" },
  { seatNo: "1014", name: "Ryan Moore", institute: "Riverdale College", department: "Software Engineering", schedule: "3" },
  { seatNo: "1015", name: "Lauren Anderson", institute: "Oakridge Institute", department: "Information Technology", schedule: "2" },
  { seatNo: "1016", name: "Kevin Jackson", institute: "Westlake University", department: "Data Science", schedule: "5" },
  { seatNo: "1017", name: "Nicole White", institute: "Sunnyvale Tech", department: "Computer Science", schedule: "3" },
  { seatNo: "1018", name: "Adam Harris", institute: "Riverdale College", department: "Information Technology", schedule: "4" },
  { seatNo: "1019", name: "Stephanie Martin", institute: "Oakridge Institute", department: "Cybersecurity", schedule: "2" },
  { seatNo: "1020", name: "Daniel Thompson", institute: "Westlake University", department: "Computer Science", schedule: "3" },
  { seatNo: "1021", name: "Rebecca Garcia", institute: "Sunnyvale Tech", department: "Software Engineering", schedule: "5" },
  { seatNo: "1022", name: "Thomas Robinson", institute: "Riverdale College", department: "Information Technology", schedule: "2" },
  { seatNo: "1023", name: "Olivia Lewis", institute: "Oakridge Institute", department: "Artificial Intelligence", schedule: "4" },
  { seatNo: "1024", name: "Joshua Walker", institute: "Westlake University", department: "Computer Science", schedule: "3" },
  { seatNo: "1025", name: "Megan Hall", institute: "Sunnyvale Tech", department: "Information Technology", schedule: "2" }
]


const HallTicket = () => {

  // Hooks
  const { theme } = useTheme();

  const stats = useMemo(() => {
    return dummyHallTicketData.reduce(
      (acc, curr) => {
        acc.total += 1;
        acc.schedule += parseInt(curr.schedule, 10)
        return acc;
      },
      {
        total: 0, schedule: 0
      }
    );
    // TODO : Add data source as dependency
  }, [])

  // States
  const [filter, setFilter] = useState(initialFilters)
  const [initialData, setInitialData] = useState<HallTicketData[]>([])
  const [filteredData, setFilteredData] = useState(dummyHallTicketData)


  // Functions
  useEffect(() => {
    const filterData = (HallTicketData: HallTicketData[], filterKey: keyof HallTicketData | undefined, filterValue: string | undefined, page: number) => {

      let tmpData = [...HallTicketData];

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
      setInitialData(dummyHallTicketData)
    }
  }, [initialData])


  //# Logs    

  return (
    <div className={`${styles.hallticket_container} ${styles[theme]}`}>
      <div className={styles.title}>Hall Ticket Model</div>
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
              <td>Seat No.</td>
              <td>Name</td>
              <td>Institute</td>
              <td>Department</td>
              <td>Schedule</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((student, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{student.seatNo}</td>
                  <td>{student.name}</td>
                  <td>{student.institute}</td>
                  <td>{student.department}</td>
                  <td>{student.schedule}</td>
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
              <td>Total Hall Tickets</td>
              <td>Total Schedule</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{stats.total}</td>
              <td>{stats.schedule}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div >
  )
}

export default HallTicket