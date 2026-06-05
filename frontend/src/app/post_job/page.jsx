"use client";

import { useState } from "react";

const navy = "#0d2137", green = "#22c55e", light = "#f4f7fb";

const cats = [
  { icon: "", label: "Cleaning" },
  { icon: "", label: "Moving" },
  { icon: "", label: "Delivery" },
  { icon: "", label: "Assembly" },
  { icon: "", label: "Tech Support" },
  { icon: "", label: "Other" },
];

const steps = ["Job Details", "Location & Budget", "Review & Post"];

export default function PostJob() {
  const [step, setStep] = useState(0);
  const [f, setF] = useState({
    title: "",
    cat: "",
    desc: "",
    loc: "",
    budget: "",
    date: ""
  });
  const [done, setDone] = useState(false);

  const up = (k, v) => setF(p => ({ ...p, [k]: v }));

  const next = () => setStep(s => Math.min(s + 1, 2));
  const back = () => setStep(s => Math.max(s - 1, 0));

  const reset = () => {
    setDone(false);
    setStep(0);
    setF({ title: "", cat: "", desc: "", loc: "", budget: "", date: "" });
  };

  if (done) return (
    <Wrap>
      <div style={{ textAlign: "center", padding: "40px 20px" }}>
        <div style={{ fontSize: 52 }}>🎉</div>

        <h2 style={{
          color: navy,
          margin: "12px 0 6px",
          fontFamily: "Georgia,serif"
        }}>
          Job Posted!
        </h2>

        <p style={{ color: "#64748b", fontSize: 13.5 }}>
          Workers near you will be notified shortly.
        </p>

        <JobCard f={f} />

        <button style={btnStyle(green, false)} onClick={reset}>
          Post Another Job
        </button>
      </div>
    </Wrap>
  );

  return (
    <Wrap>
      {/* HEADER */}
      <div style={{
        background: navy,
        padding: "18px 22px 14px",
        borderRadius: "14px 14px 0 0"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Logo />
          <span style={{
            color: "#fff",
            fontWeight: 700,
            fontSize: 16,
            fontFamily: "Georgia,serif"
          }}>
            HustleHub
          </span>

          <span style={{
            marginLeft: "auto",
            background: "#ffffff18",
            borderRadius: 20,
            padding: "3px 10px",
            color: "#93c5fd",
            fontSize: 11.5
          }}>
            Post a Job
          </span>
        </div>

        {/* STEP BAR */}
        <div style={{ display: "flex", gap: 5, marginTop: 16 }}>
          {steps.map((s, i) => (
            <div key={s} style={{ flex: 1 }}>
              <div style={{
                height: 3,
                borderRadius: 3,
                background: i <= step ? green : "#1e3a5f"
              }} />
              <div style={{
                color: i <= step ? "#86efac" : "#475569",
                fontSize: 10.5,
                marginTop: 4,
                fontWeight: i === step ? 700 : 400
              }}>
                {s}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BODY */}
      <div style={{
        padding: "22px 22px 26px",
        background: "#fff",
        borderRadius: "0 0 14px 14px"
      }}>

        {/* STEP 0 */}
        {step === 0 && (
          <>
            <Label>Job Title</Label>
            <input
              style={inp}
              placeholder="e.g. Furniture Assembly"
              value={f.title}
              onChange={e => up("title", e.target.value)}
            />

            <Label top>Category</Label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
              {cats.map(c => (
                <Chip
                  key={c.label}
                  active={f.cat === c.label}
                  onClick={() => up("cat", c.label)}
                >
                  {c.icon} {c.label}
                </Chip>
              ))}
            </div>

            <Label top>Description</Label>
            <textarea
              style={{ ...inp, height: 75, resize: "none" }}
              placeholder="What exactly needs to be done?"
              value={f.desc}
              onChange={e => up("desc", e.target.value)}
            />

            <button
              style={btnStyle(navy, !(f.title && f.cat))}
              disabled={!(f.title && f.cat)}
              onClick={next}
            >
              Continue →
            </button>
          </>
        )}

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <Label>Location</Label>
            <input
              style={inp}
              placeholder="Street, City or Area"
              value={f.loc}
              onChange={e => up("loc", e.target.value)}
            />

            <Label top>Budget (USD)</Label>
            <div style={{ position: "relative" }}>
              <span style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                color: "#94a3b8",
                fontSize: 13
              }}>
                $
              </span>

              <input
                style={{ ...inp, paddingLeft: 26 }}
                type="number"
                min="0"
                placeholder="0.00"
                value={f.budget}
                onChange={e => up("budget", e.target.value)}
              />
            </div>

            <Label top>Preferred Date</Label>
            <input
              style={inp}
              type="date"
              value={f.date}
              onChange={e => up("date", e.target.value)}
            />

            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button
                style={{ ...btnStyle("#e2e8f0", false), color: navy, flex: 1 }}
                onClick={back}
              >
                ← Back
              </button>

              <button
                style={btnStyle(navy, !(f.loc && f.budget))}
                disabled={!(f.loc && f.budget)}
                onClick={next}
              >
                Continue →
              </button>
            </div>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <p style={{
              fontSize: 12.5,
              color: "#64748b",
              marginTop: 0,
              marginBottom: 14
            }}>
              Review your job before posting.
            </p>

            <JobCard f={f} />

            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button
                style={{ ...btnStyle("#e2e8f0", false), color: navy, flex: 1 }}
                onClick={back}
              >
                ← Back
              </button>

              <button
                style={btnStyle(green, false)}
                onClick={() => setDone(true)}
              >
                ✓ Post Job
              </button>
            </div>
          </>
        )}
      </div>
    </Wrap>
  );
}

/* ───────── COMPONENTS ───────── */

function Wrap({ children }) {
  return (
    <div style={{
      minHeight: "100vh",
      background: light,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 16,
      fontFamily: "'Trebuchet MS', sans-serif"
    }}>
      <div style={{
        width: "100%",
        maxWidth: 440,
        borderRadius: 14,
        boxShadow: "0 10px 36px #0d213720",
        overflow: "hidden"
      }}>
        {children}
      </div>
    </div>
  );
}

function Logo() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect width="28" height="28" rx="7" fill={green} />
      <path
        d="M7 14h14M14 7v14"
        stroke="#fff"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Label({ children, top }) {
  return (
    <div style={{
      fontSize: 12.5,
      fontWeight: 700,
      color: "#374151",
      marginTop: top ? 14 : 0,
      marginBottom: 5
    }}>
      {children}
    </div>
  );
}

function Chip({ children, active, onClick }) {
  return (
    <span
      onClick={onClick}
      style={{
        padding: "6px 13px",
        borderRadius: 20,
        fontSize: 12,
        cursor: "pointer",
        border: `1.5px solid ${active ? navy : "#d1d5db"}`,
        background: active ? navy : "#fff",
        color: active ? "#fff" : "#374151",
        fontWeight: active ? 600 : 400
      }}
    >
      {children}
    </span>
  );
}

function JobCard({ f }) {
  return (
    <div style={{
      background: "#f8fafc",
      border: "1px solid #e2e8f0",
      borderRadius: 10,
      padding: "14px 16px",
      marginTop: 4
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between"
      }}>
        <div>
          <p style={{
            margin: 0,
            fontWeight: 700,
            color: navy,
            fontSize: 15,
            fontFamily: "Georgia,serif"
          }}>
            {f.title || "Untitled Job"}
          </p>

          {f.cat && (
            <span style={{
              background: "#dcfce7",
              color: "#166534",
              fontSize: 11,
              padding: "2px 9px",
              borderRadius: 10,
              fontWeight: 600
            }}>
              {f.cat}
            </span>
          )}
        </div>

        {f.budget && (
          <span style={{ fontWeight: 700, color: navy }}>
            ${f.budget}
          </span>
        )}
      </div>

      {f.desc && (
        <p style={{
          margin: "10px 0 0",
          color: "#64748b",
          fontSize: 12.5,
          lineHeight: 1.55
        }}>
          {f.desc}
        </p>
      )}

      <div style={{
        display: "flex",
        gap: 14,
        marginTop: 10,
        flexWrap: "wrap"
      }}>
        {f.loc && <span>📍 {f.loc}</span>}
        {f.date && <span>📅 {f.date}</span>}
      </div>
    </div>
  );
}

const inp = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: "1.5px solid #d1d5db",
  fontSize: 13,
  outline: "none",
  boxSizing: "border-box"
};

const btnStyle = (bg, isDisabled) => ({
  width: "100%",
  padding: "11px",
  borderRadius: 9,
  background: isDisabled ? "#94a3b8" : bg,
  color: "#fff",
  border: "none",
  fontWeight: 700,
  fontSize: 13.5,
  cursor: isDisabled ? "not-allowed" : "pointer",
  marginTop: 20
});