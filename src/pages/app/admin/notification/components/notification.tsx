// Styles
import styles from './notification.module.scss'
import { Eye, Edit, ArrowLeft, ArrowRight, Plus } from '../../../../../assets/icon/rooticon'

// Utils & Config
import useTheme from '../../../../../utils/hooks/useTheme';
import { useEffect, useMemo, useState } from 'react';

// Constants & Types

interface NotificationData {
  date: string,
  content: string,
  link: string,
}
const initialFilters = {
  filterKey: undefined,
  filterValue: undefined,
  page: 1,
  recordPerPage: 10
}
const dummyNotificationData: NotificationData[] = [
  { date: "12-02-2025", content: "Board meeting minutes published", link: "https://academia.edu/meetings/feb-minutes" },
  { date: "05-02-2025", content: "New research grants available", link: "https://academia.edu/funding/2025-grants" },
  { date: "28-01-2025", content: "Faculty recruitment drive begins", link: "https://academia.edu/careers/faculty-2025" },
  { date: "15-01-2025", content: "Campus renovation updates", link: "https://academia.edu/campus/renovation-jan" },
  { date: "07-01-2025", content: "Spring semester registration open", link: "https://academia.edu/registration/spring-2025" },
  { date: "20-12-2024", content: "Holiday closure information", link: "https://academia.edu/info/holiday-2024" },
  { date: "10-12-2024", content: "Annual research symposium announced", link: "https://academia.edu/events/symposium-2025" },
  { date: "02-12-2024", content: "Exam schedule released", link: "https://academia.edu/academics/exam-schedule" },
  { date: "25-11-2024", content: "New library resources added", link: "https://academia.edu/library/new-resources" },
  { date: "18-11-2024", content: "International exchange programs updated", link: "https://academia.edu/international/exchange" },
  { date: "06-11-2024", content: "Alumni networking event", link: "https://academia.edu/alumni/networking-nov" },
  { date: "29-10-2024", content: "Scholarship applications due soon", link: "https://academia.edu/financial/scholarships" },
  { date: "22-10-2024", content: "Career fair next week", link: "https://academia.edu/careers/fair-nov2024" },
  { date: "14-10-2024", content: "Campus safety drill scheduled", link: "https://academia.edu/safety/drill-oct" },
  { date: "08-10-2024", content: "Sports team tryouts begin", link: "https://academia.edu/athletics/tryouts-fall" },
  { date: "30-09-2024", content: "New course catalog released", link: "https://academia.edu/academics/catalog-2025" },
  { date: "25-09-2024", content: "Technology upgrades in classrooms", link: "https://academia.edu/facilities/tech-upgrade" },
  { date: "18-09-2024", content: "Guest lecture series announced", link: "https://academia.edu/events/guest-lectures" },
  { date: "10-09-2024", content: "Student council elections begin", link: "https://academia.edu/student-life/elections" },
  { date: "25-11-2024", content: "New library resources added", link: "https://academia.edu/library/new-resources" },
  { date: "18-11-2024", content: "International exchange programs updated", link: "https://academia.edu/international/exchange" },
  { date: "06-11-2024", content: "Alumni networking event", link: "https://academia.edu/alumni/networking-nov" },
  { date: "29-10-2024", content: "Scholarship applications due soon", link: "https://academia.edu/financial/scholarships" },
  { date: "22-10-2024", content: "Career fair next week", link: "https://academia.edu/careers/fair-nov2024" },
  { date: "03-09-2024", content: "Orientation week schedule", link: "https://academia.edu/orientation/schedule-fall" }
]


const Notification = () => {

  // Hooks
  const { theme } = useTheme();

  const stats = useMemo(() => {
    return dummyNotificationData.reduce(
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
  const [initialData, setInitialData] = useState<NotificationData[]>([])
  const [filteredData, setFilteredData] = useState(dummyNotificationData)


  // Functions
  useEffect(() => {
    const filterData = (NotificationData: NotificationData[], filterKey: keyof NotificationData | undefined, filterValue: string | undefined, page: number) => {

      let tmpData = [...NotificationData];

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
      setInitialData(dummyNotificationData)
    }
  }, [initialData])


  //# Logs    

  return (
    <div className={`${styles.notification_container} ${styles[theme]}`}>
      <div className={styles.title}>Notification Model</div>
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
              <td>Date</td>
              <td>Content</td>
              <td>Link</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((student, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{student.date}</td>
                  <td>{student.content}</td>
                  <td>{student.link}</td>
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
              <td>Total Notifications</td>
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

export default Notification