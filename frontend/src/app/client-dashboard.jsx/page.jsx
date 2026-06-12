import styles from "./ClientDashboard.module.css";

export default function ClientDashboard() {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <h2>HustleHub</h2>

        <ul>
          <li>Dashboard</li>
          <li>Active Jobs</li>
          <li>Messages</li>
          <li>Workers</li>
          <li>Settings</li>
        </ul>
      </aside>

      <main className={styles.main}>
        <h1>Hi Alex 👋</h1>

        <div className={styles.stats}>
          <div className={styles.card}>
            <h3>12</h3>
            <p>Active Jobs</p>
          </div>

          <div className={styles.card}>
            <h3>5</h3>
            <p>Completed Jobs</p>
          </div>

          <div className={styles.card}>
            <h3>$450</h3>
            <p>Total Spent</p>
          </div>
        </div>

        <section className={styles.jobs}>
          <h2>Recent Jobs</h2>

          <div className={styles.jobCard}>
            <h3>Furniture Assembly</h3>
            <p>Status: In Progress</p>
            <button>View Details</button>
          </div>

          <div className={styles.jobCard}>
            <h3>House Cleaning</h3>
            <p>Status: Pending</p>
            <button>View Details</button>
          </div>
        </section>

        <section className={styles.workers}>
          <h2>Recommended Workers</h2>

          <div className={styles.workerCard}>
            <img
              src="https://via.placeholder.com/80"
              alt="worker"
            />
            <div>
              <h3>Maya Crew</h3>
              <p>Cleaning Expert</p>
            </div>
            <button>Hire</button>
          </div>
        </section>
      </main>
    </div>
  );
}