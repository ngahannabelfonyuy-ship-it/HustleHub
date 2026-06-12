"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

const categories = ["Cleaning", "Moving", "Delivery", "Assembly", "Tech Support", "Other"];

const navItems = [
  { icon: "", label: "Home", path: "/dashboard" },
  { icon: "", label: "My Jobs", path: "/my-jobs" },
  { icon: "", label: "Post Job", path: "/post-job" },
  { icon: "", label: "Profile", path: "/profile" },
];

export default function PostJob() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeNav, setActiveNav] = useState(2);
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ title: "", category: "", desc: "", location: "", budget: "", date: "" });

  const set = (key, val) => { setForm(p => ({ ...p, [key]: val })); setError(""); };

  const nextStep1 = () => {
    if (!form.title) return setError("Please enter a job title.");
    if (!form.category) return setError("Please select a category.");
    if (!form.desc) return setError("Please add a description.");
    setError(""); setStep(2);
  };

  const nextStep2 = () => {
    if (!form.location) return setError("Please enter a location.");
    if (!form.budget) return setError("Please enter your budget.");
    if (!form.date) return setError("Please pick a date.");
    setError(""); setStep(3);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, budget: Number(form.budget) }),
      });
      if (res.ok) { router.push("/dashboard"); }
      else { setError("Failed to post job. Try again."); }
    } catch { setError("Something went wrong."); }
    finally { setLoading(false); }
  };

  return (
    <div className={styles.layout}>

      {/* SIDEBAR — desktop */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarBrand}>⚡ HustleHub</div>
        {navItems.map((item, i) => (
          <button key={i}
            className={activeNav === i ? styles.sideItemActive : styles.sideItem}
            onClick={() => { setActiveNav(i); router.push(item.path); }}>
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
        <button className={styles.sideLogout} onClick={() => router.push("/")}>🚪 Logout</button>
      </aside>

      <div className={styles.main}>

        {/* HEADER */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>☰</button>
            <span className={styles.brand}>⚡ HustleHub</span>
          </div>
          <div className={styles.avatar}>A</div>
        </div>

        {/* DROPDOWN */}
        {menuOpen && (
          <div className={styles.dropdown}>
            {navItems.map((item, i) => (
              <button key={i} className={styles.dropItem}
                onClick={() => { setActiveNav(i); router.push(item.path); setMenuOpen(false); }}>
                {item.icon} {item.label}
              </button>
            ))}
            <button className={styles.dropLogout} onClick={() => router.push("/")}>🚪 Logout</button>
          </div>
        )}

        {/* FORM */}
        <div className={styles.wrap}>
          <div className={styles.card}>

            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>
                <span className={styles.iconBox}>🧰</span>
                Post a Job
              </div>
              <p className={styles.subtitle}>Tell us what you need help with</p>
              <div className={styles.stepBar}>
                {[1, 2, 3].map(s => (
                  <div key={s} onClick={() => s < step && setStep(s)}
                    className={s <= step ? styles.stepOn : styles.stepOff} />
                ))}
              </div>
            </div>

            <div className={styles.body}>
              {step === 1 && (
                <>
                  <label className={styles.label}>Job Title</label>
                  <input className={styles.input} placeholder="e.g. Deep house cleaning"
                    value={form.title} onChange={e => set("title", e.target.value)} />

                  <label className={styles.label}>Category</label>
                  <div className={styles.catWrap}>
                    {categories.map(c => (
                      <button key={c} type="button"
                        className={form.category === c ? styles.catActive : styles.cat}
                        onClick={() => set("category", c)}>{c}</button>
                    ))}
                  </div>

                  <label className={styles.label}>Description</label>
                  <textarea className={styles.textarea} placeholder="Describe what you need done..."
                    value={form.desc} onChange={e => set("desc", e.target.value)} />

                  {error && <p className={styles.error}>⚠️ {error}</p>}
                  <button className={styles.btnPrimary} onClick={nextStep1}>Continue →</button>
                </>
              )}

              {step === 2 && (
                <>
                  <label className={styles.label}>Location</label>
                  <input className={styles.input} placeholder="e.g. Yaounde, Cameroon"
                    value={form.location} onChange={e => set("location", e.target.value)} />

                  <label className={styles.label}>Budget ($)</label>
                  <input type="number" className={styles.input} placeholder="e.g. 50"
                    value={form.budget} onChange={e => set("budget", e.target.value)} />

                  <label className={styles.label}>Date</label>
                  <input type="date" className={styles.input}
                    value={form.date} onChange={e => set("date", e.target.value)} />

                  {error && <p className={styles.error}>⚠️ {error}</p>}
                  <div className={styles.btnRow}>
                    <button className={styles.btnSecondary} onClick={() => setStep(1)}>Back</button>
                    <button className={styles.btnPrimary} onClick={nextStep2}>Continue →</button>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <div className={styles.summary}>
                    <h3>{form.title}</h3>
                    <p><b>Category:</b> {form.category}</p>
                    <p>{form.desc}</p>
                    <p> {form.location}</p>
                    <p> ${form.budget}</p>
                    <p> {form.date}</p>
                  </div>
                  {error && <p className={styles.error}>⚠️ {error}</p>}
                  <button className={styles.btnSuccess} onClick={handleSubmit} disabled={loading}>
                    {loading ? "Posting..." : "Post Job 🎉"}
                  </button>
                  <button className={styles.btnSecondary} onClick={() => setStep(2)}>Back</button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* BOTTOM NAV — mobile */}
        <nav className={styles.bottomNav}>
          {navItems.map((item, i) => (
            <button key={i} className={styles.navBtn}
              onClick={() => { setActiveNav(i); router.push(item.path); }}>
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navLabel} style={{ color: activeNav === i ? "#22c55e" : "#6b7280" }}>
                {item.label}
              </span>
              {activeNav === i && <div className={styles.navDot} />}
            </button>
          ))}
        </nav>

      </div>
    </div>
  );
}