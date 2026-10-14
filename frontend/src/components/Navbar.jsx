
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  CheckCheck,
  ChevronDown,
  Menu,
  X,
  Plus,
} from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [taskOpen, setTaskOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
    setTaskOpen(false);
  };

  const styles = {
    header: {
      position: "sticky",
      top: 0,
      zIndex: 100,
      background: "rgba(255,255,255,0.94)",
      backdropFilter: "blur(14px)",
      borderBottom: "1px solid #eee5f7",
    },
    nav: {
      maxWidth: "1200px",
      minHeight: "76px",
      margin: "auto",
      padding: "0 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "24px",
      boxSizing: "border-box",
    },
    logo: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      textDecoration: "none",
      color: "#352044",
      fontSize: "23px",
      fontWeight: 800,
      flexShrink: 0,
    },
    logoIcon: {
      width: "40px",
      height: "40px",
      display: "grid",
      placeItems: "center",
      color: "white",
      borderRadius: "13px",
      background: "linear-gradient(135deg,#7c3aed,#ec4899)",
    },
    links: {
      display: "flex",
      alignItems: "center",
      gap: "28px",
    },
    link: {
      textDecoration: "none",
      color: "#74677f",
      fontSize: "14px",
      fontWeight: 600,
      whiteSpace: "nowrap",
    },
    button: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "7px",
      padding: "12px 16px",
      border: "none",
      borderRadius: "12px",
      color: "white",
      background: "linear-gradient(110deg,#7c3aed,#ec4899)",
      fontWeight: 700,
      cursor: "pointer",
      textDecoration: "none",
      whiteSpace: "nowrap",
    },
    dropdown: {
      position: "absolute",
      top: "35px",
      left: 0,
      width: "175px",
      padding: "8px",
      borderRadius: "12px",
      border: "1px solid #eee5f7",
      background: "white",
      boxShadow: "0 12px 30px #4c1d9518",
      zIndex: 110,
    },
    dropdownLink: {
      display: "block",
      padding: "11px",
      borderRadius: "8px",
      color: "#655574",
      textDecoration: "none",
      fontSize: "13px",
    },
    mobileButton: {
      display: "none",
      alignItems: "center",
      justifyContent: "center",
      border: "1px solid #eee5f7",
      borderRadius: "10px",
      background: "white",
      padding: "9px",
      cursor: "pointer",
      color: "#7c3aed",
      flexShrink: 0,
    },
  };

  return (
    <header style={styles.header}>
      <nav className="navbar-container" style={styles.nav}>
        <Link to="/" style={styles.logo} onClick={closeMenu}>
          <span style={styles.logoIcon}>
            <CheckCheck size={22} />
          </span>

          <span>
            Task<span style={{ color: "#ec4899" }}>Flow</span>
          </span>
        </Link>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => {
            setMenuOpen((previous) => !previous);
            setTaskOpen(false);
          }}
          style={styles.mobileButton}
          className="mobile-menu-button"
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>

        <div
          className={`navbar-links ${menuOpen ? "navbar-links-open" : ""}`}
          style={styles.links}
        >
          <NavLink
            to="/"
            end
            onClick={closeMenu}
            style={({ isActive }) => ({
              ...styles.link,
              color: isActive ? "#8055D8" : "#74677f",
            })}
          >
            Home
          </NavLink>

          <div className="tasks-nav-item" style={{ position: "relative" }}>
            <button
              type="button"
              aria-expanded={taskOpen}
              onClick={() => setTaskOpen((previous) => !previous)}
              style={{
                ...styles.link,
                display: "flex",
                alignItems: "center",
                gap: "5px",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                padding: 0,
              }}
            >
              Tasks
              <ChevronDown
                size={15}
                style={{
                  transform: taskOpen ? "rotate(180deg)" : "rotate(0)",
                  transition: "transform 0.2s ease",
                }}
              />
            </button>

            {taskOpen && (
              <div
                className="tasks-dropdown"
                style={styles.dropdown}
              >
                {[
                  ["Add new task", "/tasks/new"],
                  ["See all tasks", "/tasks"],
                  ["Recent tasks", "/recent"],
                ].map(([label, path]) => (
                  <Link
                    key={path}
                    to={path}
                    onClick={closeMenu}
                    style={styles.dropdownLink}
                    className="tasks-dropdown-link"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <NavLink
            to="/about"
            onClick={closeMenu}
            style={({ isActive }) => ({
              ...styles.link,
              color: isActive ? "#8055D8" : "#74677f",
            })}
          >
            About
          </NavLink>

          <Link
            to="/tasks/new"
            onClick={closeMenu}
            style={styles.button}
            className="navbar-new-task"
          >
            <Plus size={17} />
            New Task
          </Link>
        </div>
      </nav>
    </header>
  );
}
