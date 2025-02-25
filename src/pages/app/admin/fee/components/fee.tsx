// Styles
import styles from './fee.module.scss'
import { Eye, Edit, ArrowLeft, ArrowRight, Plus } from '../../../../../assets/icon/rooticon'

// Utils & Config
import useTheme from '../../../../../utils/hooks/useTheme';
import { useEffect, useMemo, useState } from 'react';

// Constants & Types

interface FeeData {
  semester: number;
  date: string; // Format: DD-MM-YYYY
  amount: number;
  fine: number;
  status: "paid" | "unpaid";
  paidDate?: string; // Optional, Format: DD-MM-YYYY
  mode: string;
}
const initialFilters = {
  filterKey: undefined,
  filterValue: undefined,
  page: 1,
  recordPerPage: 10
}
const dummyFeeData: FeeData[] = [
  { semester: 1, date: "05-01-2023", amount: 15000, fine: 0, status: "paid", paidDate: "10-01-2023", mode: "online" },
  { semester: 1, date: "10-01-2023", amount: 15000, fine: 500, status: "paid", paidDate: "20-01-2023", mode: "cash" },
  { semester: 2, date: "15-02-2023", amount: 12500, fine: 0, status: "paid", paidDate: "16-02-2023", mode: "online" },
  { semester: 2, date: "20-02-2023", amount: 12500, fine: 0, status: "paid", paidDate: "21-02-2023", mode: "bank" },
  { semester: 3, date: "05-07-2023", amount: 18000, fine: 1000, status: "paid", paidDate: "25-07-2023", mode: "cash" },
  { semester: 3, date: "12-07-2023", amount: 18000, fine: 0, status: "paid", paidDate: "13-07-2023", mode: "online" },
  { semester: 4, date: "10-08-2023", amount: 16500, fine: 0, status: "paid", paidDate: "11-08-2023", mode: "bank" },
  { semester: 4, date: "15-08-2023", amount: 16500, fine: 500, status: "paid", paidDate: "30-08-2023", mode: "cash" },
  { semester: 5, date: "02-01-2024", amount: 20000, fine: 0, status: "paid", paidDate: "05-01-2024", mode: "online" },
  { semester: 5, date: "05-01-2024", amount: 20000, fine: 0, status: "paid", paidDate: "06-01-2024", mode: "bank" },
  { semester: 6, date: "18-02-2024", amount: 19500, fine: 1500, status: "paid", paidDate: "05-03-2024", mode: "cash" },
  { semester: 6, date: "25-02-2024", amount: 19500, fine: 0, status: "paid", paidDate: "26-02-2024", mode: "online" },
  { semester: 7, date: "10-07-2024", amount: 21000, fine: 0, status: "paid", paidDate: "11-07-2024", mode: "bank" },
  { semester: 7, date: "15-07-2024", amount: 21000, fine: 750, status: "paid", paidDate: "25-07-2024", mode: "cash" },
  { semester: 8, date: "20-08-2024", amount: 22500, fine: 0, status: "unpaid", mode: "pending" },
  { semester: 8, date: "25-08-2024", amount: 22500, fine: 500, status: "unpaid", mode: "pending" },
  { semester: 1, date: "05-01-2024", amount: 16000, fine: 0, status: "paid", paidDate: "06-01-2024", mode: "online" },
  { semester: 2, date: "10-02-2024", amount: 16000, fine: 0, status: "paid", paidDate: "12-02-2024", mode: "bank" },
  { semester: 3, date: "15-07-2024", amount: 17500, fine: 1000, status: "paid", paidDate: "01-08-2024", mode: "cash" },
  { semester: 4, date: "20-08-2024", amount: 17500, fine: 0, status: "unpaid", mode: "pending" },
  { semester: 5, date: "01-01-2025", amount: 23000, fine: 0, status: "unpaid", mode: "pending" },
  { semester: 6, date: "05-02-2025", amount: 23000, fine: 500, status: "unpaid", mode: "pending" },
  { semester: 1, date: "10-01-2025", amount: 18000, fine: 0, status: "paid", paidDate: "11-01-2025", mode: "online" },
  { semester: 2, date: "15-02-2025", amount: 18000, fine: 750, status: "unpaid", mode: "pending" },
  { semester: 3, date: "20-07-2025", amount: 19000, fine: 0, status: "unpaid", mode: "pending" }
]


const Fee = () => {

  // Hooks
  const { theme } = useTheme();

  const stats = useMemo(() => {
    return dummyFeeData.reduce(
      (acc, curr) => {
        acc.total += 1;
        acc[curr.status] += 1;
        acc.amount += curr.amount
        acc.fine += curr.fine
        return acc;
      },
      {
        total: 0, amount: 0, fine: 0, unpaid: 0, paid: 0
      }
    );
    // TODO : Add data source as dependency
  }, [])

  // States
  const [filter, setFilter] = useState(initialFilters)
  const [initialData, setInitialData] = useState<FeeData[]>([])
  const [filteredData, setFilteredData] = useState(dummyFeeData)


  // Functions
  useEffect(() => {
    const filterData = (FeeData: FeeData[], filterKey: keyof FeeData | undefined, filterValue: string | undefined, page: number) => {

      let tmpData = [...FeeData];

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
      setInitialData(dummyFeeData)
    }
  }, [initialData])


  //# Logs    

  return (
    <div className={`${styles.fee_container} ${styles[theme]}`}>
      <div className={styles.title}>Fee Model</div>
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
              <td>Date</td>
              <td>Amount</td>
              <td>Fine</td>
              <td>Status</td>
              <td>Paid Date</td>
              <td>Mode</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((student, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{student.semester}</td>
                  <td>{student.date}</td>
                  <td>{student.amount}</td>
                  <td>{student.fine}</td>
                  <td>{student.status}</td>
                  <td>{student.paidDate ?? "-"}</td>
                  <td>{student.mode}</td>
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
              <td>Total Fees</td>
              <td>Total Amount</td>
              <td>Total Fine</td>
              <td>Total Unpaid</td>
              <td>Total Paid</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{stats.total}</td>
              <td>{stats.amount}</td>
              <td>{stats.fine}</td>
              <td>{stats.unpaid}</td>
              <td>{stats.paid}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div >
  )
}

export default Fee