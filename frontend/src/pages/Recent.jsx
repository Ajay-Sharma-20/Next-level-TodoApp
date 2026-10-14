
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Clock3,
  CalendarDays,
  CheckCircle2,
  Circle,
  Plus,
  History,
} from "lucide-react";
import { getTodos } from "../api/todos";

export default function Recent() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadRecentTasks() {
      try {
        setError("");
        const data = await getTodos();
        const allTasks = Array.isArray(data)
          ? data
          : data.data ?? [];

        const recentTasks = [...allTasks]
          .sort(
            (a, b) =>
              new Date(b.created_at || 0) -
              new Date(a.created_at || 0)
          )
          .slice(0, 10);

        setTasks(recentTasks);
      } catch (err) {
        setError(err.message || "Unable to load recent tasks.");
      } finally {
        setLoading(false);
      }
    }

    loadRecentTasks();
  }, []);

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Date unavailable";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const priorityStyles = {
    high: { color: "#D9435F", background: "#FFF0F1" },
    medium: { color: "#C17B17", background: "#FFF7E5" },
    low: { color: "#25866A", background: "#E8F8F1" },
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "36px 24px 60px",
        background: "#F8F7FC",
        color: "#302747",
        boxSizing: "border-box",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <div
          style={{
            background:
              "linear-gradient(125deg, #7650D8, #B65BD5, #E66EAE)",
            borderRadius: "24px",
            padding: "32px",
            color: "#FFFFFF",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            <div style={{ flex: "1 1 250px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "13px",
                  marginBottom: "12px",
                  opacity: 0.9,
                }}
              >
                <History size={17} />
                YOUR ACTIVITY
              </div>

              <h1
                style={{
                  fontSize: "clamp(28px, 4vw, 38px)",
                  margin: "0 0 10px",
                  letterSpacing: "-1px",
                }}
              >
                Recent Tasks
              </h1>

              <p
                style={{
                  margin: 0,
                  lineHeight: 1.7,
                  opacity: 0.9,
                }}
              >
                Your latest tasks, all in one place.
              </p>
            </div>

            <Link
              to="/tasks/new"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 16px",
                background: "#FFFFFF",
                color: "#8055D8",
                borderRadius: "12px",
                fontWeight: "700",
                textDecoration: "none",
              }}
            >
              <Plus size={18} />
              New Task
            </Link>
          </div>

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "26px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                background: "#FFFFFF22",
                border: "1px solid #FFFFFF30",
                padding: "14px 18px",
                borderRadius: "14px",
                minWidth: "110px",
              }}
            >
              <div style={{ fontSize: "26px", fontWeight: "800" }}>
                {tasks.length}
              </div>
              <div style={{ fontSize: "12px", opacity: 0.9 }}>
                Recent tasks
              </div>
            </div>

            <div
              style={{
                background: "#FFFFFF22",
                border: "1px solid #FFFFFF30",
                padding: "14px 18px",
                borderRadius: "14px",
                minWidth: "110px",
              }}
            >
              <div style={{ fontSize: "26px", fontWeight: "800" }}>
                {tasks.filter((task) => task.is_completed).length}
              </div>
              <div style={{ fontSize: "12px", opacity: 0.9 }}>
                Completed
              </div>
            </div>

            <div
              style={{
                background: "#FFFFFF22",
                border: "1px solid #FFFFFF30",
                padding: "14px 18px",
                borderRadius: "14px",
                minWidth: "110px",
              }}
            >
              <div style={{ fontSize: "26px", fontWeight: "800" }}>
                {tasks.filter((task) => !task.is_completed).length}
              </div>
              <div style={{ fontSize: "12px", opacity: 0.9 }}>
                Pending
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "18px",
          }}
        >
          <div>
            <h2 style={{ fontSize: "21px", margin: "0 0 6px" }}>
              Latest activity
            </h2>
            <p
              style={{
                fontSize: "13px",
                color: "#89849B",
                margin: 0,
              }}
            >
              Showing your 10 most recently created tasks.
            </p>
          </div>

          <Link
            to="/tasks"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              color: "#8055D8",
              fontSize: "14px",
              fontWeight: "700",
              textDecoration: "none",
            }}
          >
            View all tasks <ArrowRight size={17} />
          </Link>
        </div>

        {error && (
          <div
            role="alert"
            style={{
              background: "#FFF0F1",
              color: "#B42335",
              borderRadius: "12px",
              padding: "14px",
              marginBottom: "16px",
            }}
          >
            {error}
          </div>
        )}

        {loading ? (
          <div
            style={{
              textAlign: "center",
              padding: "55px 20px",
              background: "#FFFFFF",
              borderRadius: "18px",
            }}
          >
            Loading recent tasks...
          </div>
        ) : tasks.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "55px 20px",
              background: "#FFFFFF",
              border: "1px solid #EEEAF5",
              borderRadius: "18px",
            }}
          >
            <History size={40} color="#9B7BE5" />
            <h3>No tasks yet</h3>
            <p style={{ color: "#89849B" }}>
              Create your first task to see it here.
            </p>
            <Link
              to="/tasks/new"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                color: "#8055D8",
                fontWeight: "700",
                textDecoration: "none",
              }}
            >
              <Plus size={17} /> Create your first task
            </Link>
          </div>
        ) : (
          <div style={{ display: "grid", gap: "13px" }}>
            {tasks.map((task, index) => (
              <div
                key={task.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  padding: "20px",
                  border: "1px solid #EEEAF5",
                  background: "#FFFFFF",
                  borderRadius: "17px",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "13px",
                    background: index % 2 === 0 ? "#F0E9FF" : "#FCE8F4",
                    color: index % 2 === 0 ? "#8055D8" : "#D946A8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {task.is_completed ? (
                    <CheckCircle2 size={21} />
                  ) : (
                    <Circle size={21} />
                  )}
                </div>

                <div style={{ flex: "1 1 200px", minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "700",
                      overflowWrap: "anywhere",
                      textDecoration: task.is_completed
                        ? "line-through"
                        : "none",
                      color: task.is_completed ? "#89849B" : "#302747",
                    }}
                  >
                    {task.title}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      flexWrap: "wrap",
                      alignItems: "center",
                      marginTop: "9px",
                      color: "#89849B",
                      fontSize: "12px",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <Clock3 size={14} />
                      Created {formatDate(task.created_at)}
                    </span>

                    {task.due_date && (
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <CalendarDays size={14} />
                        Due {formatDate(task.due_date)}
                      </span>
                    )}

                    {task.category && <span>{task.category}</span>}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      ...(priorityStyles[task.priority] ||
                        priorityStyles.medium),
                      borderRadius: "9px",
                      padding: "7px 10px",
                      fontSize: "12px",
                      fontWeight: "700",
                      textTransform: "capitalize",
                    }}
                  >
                    {task.priority || "medium"}
                  </span>

                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "700",
                      color: task.is_completed ? "#25866A" : "#C17B17",
                      background: task.is_completed ? "#E8F8F1" : "#FFF7E5",
                      padding: "7px 10px",
                      borderRadius: "9px",
                    }}
                  >
                    {task.is_completed ? "Completed" : "Pending"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
