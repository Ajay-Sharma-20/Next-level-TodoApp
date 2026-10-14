
import { Link } from "react-router-dom";
import {
  CheckCheck,
  
  ArrowUpRight,
  Heart,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const styles = {
    link: {
      color: "#8D829D",
      textDecoration: "none",
      fontSize: "13px",
      lineHeight: 2,
    },
  };

  return (
    <footer
      style={{
        background: "#FFFFFF",
        borderTop: "1px solid #EEE5F7",
        color: "#352044",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "45px 24px 25px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: "35px",
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <Link
              to="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                textDecoration: "none",
                color: "#352044",
                fontSize: "23px",
                fontWeight: 800,
              }}
            >
              <span
                style={{
                  width: "40px",
                  height: "40px",
                  display: "grid",
                  placeItems: "center",
                  color: "#FFFFFF",
                  borderRadius: "13px",
                  background:
                    "linear-gradient(135deg,#7c3aed,#ec4899)",
                }}
              >
                <CheckCheck size={22} />
              </span>

              <span>
                Task<span style={{ color: "#EC4899" }}>Flow</span>
              </span>
            </Link>

            <p
              style={{
                maxWidth: "350px",
                color: "#8D829D",
                fontSize: "13px",
                lineHeight: 1.9,
                margin: "16px 0",
              }}
            >
              Plan your work, prioritize what matters, and keep track
              of your progress. Everything you need to manage tasks
              in one place.
            </p>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                color: "#8055D8",
                fontSize: "12px",
                fontWeight: 700,
              }}
            >
              <Heart size={15} />
              Made for better productivity
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3
              style={{
                fontSize: "14px",
                margin: "7px 0 15px",
              }}
            >
              Quick Links
            </h3>

            <div style={{ display: "grid", gap: "8px" }}>
              <Link to="/" style={styles.link}>
                Home
              </Link>
              <Link to="/tasks" style={styles.link}>
                All Tasks
              </Link>
              <Link to="/recent" style={styles.link}>
                Recent Tasks
              </Link>
              <Link to="/tasks/new" style={styles.link}>
                Add New Task
              </Link>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3
              style={{
                fontSize: "14px",
                margin: "7px 0 15px",
              }}
            >
              Explore
            </h3>

            <div style={{ display: "grid", gap: "8px" }}>
              <Link to="/about" style={styles.link}>
                About TaskFlow
              </Link>

              <Link
                to="/tasks"
                style={{
                  ...styles.link,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                Manage Tasks <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
            marginTop: "38px",
            paddingTop: "22px",
            borderTop: "1px solid #F0EAF6",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "#8D829D",
              fontSize: "12px",
              lineHeight: 1.8,
            }}
          >
            © {currentYear} TaskFlow. All rights reserved.
          </p>

          <p
            style={{
              margin: 0,
              color: "#8D829D",
              fontSize: "12px",
            }}
          >
            Stay organized. Keep moving forward.
          </p>
        </div>
      </div>
    </footer>
  );
}
