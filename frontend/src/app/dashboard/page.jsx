"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

const services = [
  { icon: "", label: "Cleaning" },
  { icon: "", label: "Moving" },
  { icon: "", label: "Delivery" },
  { icon: "", label: "Assembly" },
  { icon: "", label: "Tech" },
  { icon: "", label: "More" },
];

const jobs = [
  { id: 1, title: "Deep Kitchen Cleaning", worker: "Maya Chen", initial: "M", color: "#22c55e", status: "In Progress", budget: "$45", date: "Today, 2:00 PM" },
  { id: 2, title: "IKEA Furniture Assembly", worker: "James Obi", initial: "J", color: "#3b82f6", status: "Confirmed", budget: "$60", date: "Tomorrow, 10:00 AM" },
  { id: 3, title: "Grocery Delivery", worker: "Sara Nkomo", initial: "S", color: "#a855f7", status: "Confirmed", budget: "$25", date: "Today, 5:00 PM" },
];

const workers = [
  { id: 1, name: "Maya Chen", role: "Cleaning Expert", rating: 4.9, initial: "M", color: "#22c55e", tags: ["Cleaning", "Organizing"] },
  { id: 2, name: "James Obi", role: "Handyman", rating: 4.8, initial: "J", color: "#3b82f6", tags: ["Assembly", "Repairs"] },
  { id: 3, name: "Sara Nkomo", role: "Tech Support", rating: 4.7, initial: "S", color: "#a855f7", tags: ["Tech", "Setup"] },
];

const navItems = [
  { icon: "", label: "Home", path: "/dashboard" },
  { icon: "", label: "My Jobs", path: "/my-jobs" },
  { icon: "", label: "Post Job", path: "/post-job" },
  { icon: "", label: "Messages", path: "/messages" },
  { icon: "", label: "Profile", path: "/profile" },
];

export default function ClientDashboard() {
  const router = useRouter();
  const [activeNav, setActiveNav] = useState(0);
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const filtered = jobs.filter(j =>
    j.title.toLowerCase().includes(search.toLowerCase()) ||
    j.worker.toLowerCase().includes(search.toLowerCase())
  );

  const handleNav = (i, path) => {
    setActiveNav(i);
    router.push(path);
  };

  return (
    <div className={styles.layout}>

      {/* SIDEBAR — desktop only */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarBrand}>⚡ HustleHub</div>
        {navItems.map((item, i) => (
          <button
            key={i}
            className={activeNav === i ? styles.sideNavItemActive : styles.sideNavItem}
            onClick={() => handleNav(i, item.path)}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
        <button className={styles.sideLogout} onClick={() => router.push("/")}>
          🚪 Logout
        </button>
      </aside>

      {/* MAIN */}
      <div className={styles.main}>

        {/* HEADER */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            {/* Hamburger — mobile only */}
            <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
              ☰
            </button>
            <span className={styles.brand}>⚡ HustleHub</span>
          </div>
          <div className={styles.headerRight}>
            <button className={styles.notif}>🔔</button>
            <div className={styles.avatar}>A</div>
          </div>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {menuOpen && (
          <div className={styles.mobileMenu}>
            {navItems.map((item, i) => (
              <button
                key={i}
                className={styles.mobileMenuItem}
                onClick={() => { handleNav(i, item.path); setMenuOpen(false); }}
              >
                {item.icon} {item.label}
              </button>
            ))}
            <button
              className={styles.mobileMenuLogout}
              onClick={() => router.push("/")}
            >
              🚪 Logout
            </button>
          </div>
        )}

        {/* HERO */}
        <div className={styles.hero}>
          <p className={styles.heroSub}>Good morning 👋</p>
          <h2 className={styles.heroTitle}>Hi, Alex</h2>
          <div className={styles.searchBox}>
            <span>🔍</span>
            <input
              className={styles.searchInput}
              placeholder="Search jobs or workers..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && <button className={styles.clearBtn} onClick={() => setSearch("")}>✕</button>}
          </div>
        </div>

        {/* BODY */}
        <div className={styles.body}>

          {!search && (
            <>
              <div className={styles.sectionRow}>
                <span className={styles.sectionTitle}>Quick Services</span>
                <button className={styles.seeAll} onClick={() => router.push("/post-job")}>View all</button>
              </div>
              <div className={styles.serviceGrid}>
                {services.map(s => (
                  <button key={s.label} className={styles.serviceBtn} onClick={() => router.push("/post-job")}>
                    <span className={styles.serviceIcon}>{s.icon}</span>
                    <span className={styles.serviceLabel}>{s.label}</span>
                  </button>
                ))}
              </div>

              <div className={styles.statsRow}>
                {[["3", "Active", "#0f2d52"], ["12", "Done", "#14532d"], ["$240", "Spent", "#4c1d95"]].map(([n, l, bg]) => (
                  <div key={l} className={styles.statBox} style={{ background: bg }}>
                    <span className={styles.statNum}>{n}</span>
                    <span className={styles.statLabel}>{l}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className={styles.sectionRow}>
            <span className={styles.sectionTitle}>{search ? `Results for "${search}"` : "Active Jobs"}</span>
            {!search && <button className={styles.seeAll} onClick={() => router.push("/my-jobs")}>View all</button>}
          </div>

          {filtered.length === 0 && <p className={styles.empty}>No results found</p>}

          <div className={styles.jobGrid}>
            {filtered.map(j => (
              <div key={j.id} className={styles.card} onClick={() => router.push("/my-jobs")}>
                <div className={styles.cardTop}>
                  <div>
                    <p className={styles.cardTitle}>{j.title}</p>
                    <p className={styles.cardDate}>{j.date}</p>
                  </div>
                  <span className={styles.badge} style={{ color: j.color, background: j.color + "22" }}>
                    {j.status}
                  </span>
                </div>
                <div className={styles.cardBottom}>
                  <div className={styles.workerInfo}>
                    <div className={styles.dot} style={{ background: j.color }}>{j.initial}</div>
                    <span className={styles.workerName}>{j.worker}</span>
                  </div>
                  <span className={styles.jobBudget}>{j.budget}</span>
                </div>
              </div>
            ))}
          </div>

          {!search && (
            <>
              <div className={styles.sectionRow}>
                <span className={styles.sectionTitle}>Recommended Workers</span>
                <button className={styles.seeAll}>See all</button>
              </div>
              <div className={styles.workerScroll}>
                {workers.map(w => (
                  <div key={w.id} className={styles.workerCard}>
                    <div className={styles.workerAvatar} style={{ background: w.color }}>{w.initial}</div>
                    <p className={styles.workerName2}>{w.name}</p>
                    <p className={styles.workerRole}>{w.role}</p>
                    <p className={styles.workerRating}> {w.rating}</p>
                    <div className={styles.tagRow}>
                      {w.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}
                    </div>
                    <button className={styles.hireBtn} onClick={() => router.push("/post-job")}>Hire</button>
                  </div>
                ))}
              </div>
            </>
          )}

          <div style={{ height: 80 }} />
        </div>

        {/* BOTTOM NAV — mobile only */}
        <div className={styles.bottomNav}>
          {navItems.map((item, i) => (
            <button key={i} className={styles.navBtn} onClick={() => handleNav(i, item.path)}>
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navLabel} style={{ color: activeNav === i ? "#22c55e" : "#6b7280" }}>
                {item.label}
              </span>
              {activeNav === i && <div className={styles.navDot} />}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}