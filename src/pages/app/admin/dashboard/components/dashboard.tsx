import React from "react";
import styles from "./Dashboard.module.scss";
import {
  CalendarCheck, School, Users, UserRound, ReceiptIndianRupee, Ticket, Bell, Goal, FileUser, FileTerminal, PencilLine, GraduationCap, CalendarRange, Inbox, Book, ClipboardList
} from "lucide-react";
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
  {
    title: "Subjects",
    value: 30,
    growth: "+3.5% growth",
    icon: <Book className={styles.icon} />, 
  },
  {
    title: "Exams",
    value: 120,
    growth: "+4.7% growth",
    icon: <ClipboardList className={styles.icon} />, 
  },
  {
    title: "Events",
    value: 25,
    growth: "+6.3% growth",
    icon: <CalendarCheck className={styles.icon} />,
  },
  {
    title: "Fees",
    value: 25,
    growth: "+6.3% growth",
    icon: <ReceiptIndianRupee className={styles.icon} />,
  },{
    title: "Hall Ticket",
    value: 25,
    growth: "+6.3% growth",
    icon: <Ticket className={styles.icon} />,
  },
  {
    title: "Notifications",
    value: 25,
    growth: "+6.3% growth",
    icon: <Bell className={styles.icon} />,
  },
  {
    title: "Placements",
    value: 25,
    growth: "+6.3% growth",
    icon: <Goal className={styles.icon} />,
  },
  {
    title: "Profile",
    value: 25,
    growth: "+6.3% growth",
    icon: <FileUser className={styles.icon} />,
  },
  {
    title: "Request",
    value: 25,
    growth: "+6.3% growth",
    icon: <FileTerminal className={styles.icon} />,
  },
  {
    title: "Result",
    value: 25,
    growth: "+6.3% growth",
    icon: <PencilLine className={styles.icon} />,
  },
  {
    title: "Time Table",
    value: 25,
    growth: "+6.3% growth",
    icon: <CalendarRange className={styles.icon} />,
  },
  {
    title: "Updates",
    value: 25,
    growth: "+6.3% growth",
    icon: <Inbox className={styles.icon} />,
  },{
    title: "User",
    value: 25,
    growth: "+6.3% growth",
    icon: <UserRound className={styles.icon} />,
  },
];

const Dashboard: React.FC = () => {
  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>

      {/* Analytics Overview */}
      <section className={styles.analyticsOverview}>
        <h3>Analytics Overview</h3>
        <div className={styles.analyticsContainer}>
          <div>
            <span>4582</span>
            <p>Total Students</p>
          </div>
          <div>
            <span>12</span>
            <p>Total Institute</p>
          </div>
          <div>
            <span>46</span>
            <p>Total Classes</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <h3>Models</h3>
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
