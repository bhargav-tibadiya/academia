import styles from "./fees.module.scss";
import {
  ArrowLeft,
  ArrowRight,
  Plus,
} from "../../../../../assets/icon/rooticon";

// Utils & Config
import useTheme from "../../../../../utils/hooks/useTheme";
import { useEffect, useMemo, useState } from "react";
import { ArrowDown } from "lucide-react";

// Constants & Types

interface PaymentData {
  semester: number;
  date: Date;
  amount: number;
  fine: number;
  status: "paid" | "unpaid";
  paidDate: string;
  mode: string;
  receiptUrl?: string; // Added optional receipt URL
}

const dummyPaymentData: PaymentData[] = [
  {
    semester: 1,
    date: new Date("2024-02-01"),
    amount: 41500,
    fine: 0,
    status: "paid",
    paidDate: "2024-02-02",
    mode: "UPI",
    receiptUrl: "/receipts/1.pdf", // Example receipt link
  },
  {
    semester: 2,
    date: new Date("2024-03-01"),
    amount: 41500,
    fine: 100,
    status: "unpaid",
    paidDate: "",
    mode: "",
  },
  {
    semester: 3,
    date: new Date("2024-04-01"),
    amount: 41500,
    fine: 50,
    status: "paid",
    paidDate: "2024-04-03",
    mode: "Credit Card",
    receiptUrl: "/receipts/2.pdf",
  },
];

const Fees = () => {
  const { theme } = useTheme();

  const stats = useMemo(() => {
    return dummyPaymentData.reduce(
      (acc, curr) => {
        acc.total += 1;
        acc.amount += curr.amount;
        return acc;
      },
      {
        total: 0,
        amount: 0,
      }
    );
  }, []);

  const [filter, setFilter] = useState({
    page: 1,
    recordPerPage: 10,
  });

  const [filteredData, setFilteredData] = useState(dummyPaymentData);

  useEffect(() => {
    const startIndex = (filter.page - 1) * filter.recordPerPage;
    const endIndex = startIndex + filter.recordPerPage;
    setFilteredData(dummyPaymentData.slice(startIndex, endIndex));
  }, [filter]);

  return (
    <div className={`${styles.Fees_container} ${styles[theme]}`}>
      <div className={styles.title}>Fees Model</div>
      <div className={styles.divider}></div>

      <div className={styles.actions}>
        <div className={styles.items}>
          <div className={styles.item}>
            <span>
              <Plus />
            </span>
            Add
          </div>
        </div>
        <div className={styles.items}>
          <button
            disabled={filter.page === 0}
            onClick={() => setFilter({ ...filter, page: filter.page - 1 })}
            className={styles.item}
          >
            <span>
              <ArrowLeft />
            </span>
            Previous Page
          </button>
          <button
            disabled={
              filter.page ===
              Math.ceil(dummyPaymentData.length / filter.recordPerPage)
            }
            className={styles.item}
            onClick={() => setFilter({ ...filter, page: filter.page + 1 })}
          >
            Next Page
            <span>
              <ArrowRight />
            </span>
          </button>
        </div>
      </div>

      <div className={styles.section_title}>Statistics</div>
      <div className={styles.divider}></div>

      <div className={styles.stats}>
        <table>
          <thead>
            <tr>
              <td>Total Profiles</td>
              <td>Total Fees</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{stats.total}</td>
              <td>{stats.amount}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={styles.section_title}>Payment History</div>
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
              <td>Receipt</td>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((student, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{student.semester}</td>
                <td>{new Date(student.date).toLocaleDateString()}</td>
                <td>{student.amount}</td>
                <td>{student.fine}</td>
                <td>{student.status}</td>
                <td>{student.paidDate || "N/A"}</td>
                <td>{student.mode || "N/A"}</td>
                <td>
                  {student.receiptUrl ? (
                    <a
                      href={student.receiptUrl}
                      download
                      className={styles.download_button}
                    >
                      Download Receipt
                      <span>
                        <ArrowDown style={{width:'16px', marginTop:'4px'}}/>
                      </span>
                    </a>
                  ) : (
                    <button className={styles.download_button} disabled>
                      Not Available
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Fees;
