// Styles & Assets
import styles from "./Dashboard.module.scss";
import { GraduationCap, School, Users } from '../../../../../assets/icon/rooticon'

// Type & Constants
interface Stat {
  title: string;
  value: number;
  growth?: string;
  icon?: JSX.Element;
}

const stats: Stat[] = [
  {
    title: "Students",
    value: 1250,
    growth: "+5.2% growth",
    icon: <Users className={styles.icon} />,
  },
  {
    title: "Institute",
    value: 75,
    growth: "+2.1% growth",
    icon: <School className={styles.icon} />,
  },
  {
    title: "Classes",
    value: 50,
    growth: "+1.8% growth",
    icon: <GraduationCap className={styles.icon} />,
  },
  { title: "Subjects", value: 30, growth: "+3.5% growth" },
  { title: "Exams", value: 120, growth: "+4.7% growth" },
  { title: "Events", value: 25, growth: "+6.3% growth" },
  { title: "Students Actions", value: 0 },
  { title: "Teachers Actions", value: 0 },
  { title: "Classes Actions", value: 0 },
];

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <h1>Education Dashboard</h1>

      {/* Analytics Overview */}
      <section className={styles.analyticsOverview}>
        <h3>Analytics Overview</h3>
        <div className={styles.analyticsContainer}>
          <div>
            <span>1,375</span>
            <p>Total Students</p>
          </div>
          <div>
            <span>3.7</span>
            <p>Avg GPA</p>
          </div>
          <div>
            <span>92%</span>
            <p>Pass Rate</p>
          </div>
        </div>
      </section>

      {/* Dynamic Stats Section */}
      <section className={styles.statsSection}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            {stat.icon}
            <h4>{stat.title}</h4>
            <p className={styles.value}>{stat.value}</p>
            {stat.growth && <p className={styles.growth}>{stat.growth}</p>}
          </div>
        ))}
      </section>
    </div>
  );
};

export default Dashboard;
