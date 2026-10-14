
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, BellRing, CalendarDays, Check, CheckCircle2,
  ChevronLeft, ChevronRight, Clock3, ListChecks, Plus,
  Sparkles, TrendingUp
} from "lucide-react";

const today = new Date();

const dateKey = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

const getDate = (task) => task.due_date || null;
const isDone = (task) => Boolean(task.is_completed);
const priority = (task) => String(task.priority || "medium").toLowerCase();

const priorityColors = {
  high: { color: "#be185d", background: "#fce7f3" },
  medium: { color: "#a16207", background: "#fef3c7" },
  low: { color: "#64748b", background: "#f1f5f9" },
};

const cardStyle = {
  background: "#fff",
  border: "1px solid #eee5f7",
  borderRadius: 18,
  padding: 20,
  boxShadow: "0 8px 25px rgba(87,47,132,.05)",
};

function TaskRow({ task, onToggle }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 11,
      padding: "13px 0", borderBottom: "1px solid #f2edf8"
    }}>
      <button
        onClick={() => onToggle(task)}
        title="Toggle task completion"
        style={{
          width: 22, height: 22, flexShrink: 0,
          display: "grid", placeItems: "center",
          borderRadius: 7,
          border: isDone(task) ? "1px solid #8b5cf6" : "1px solid #d9cde8",
          background: isDone(task) ? "#8b5cf6" : "#fff",
          color: "#fff", cursor: "pointer"
        }}
      >
        {isDone(task) && <Check size={13} />}
      </button>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 13, fontWeight: 700, color: "#40324e",
          textDecoration: isDone(task) ? "line-through" : "none",
          overflowWrap: "anywhere"
        }}>
          {task.title}
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          marginTop: 6, color: "#968aa2", fontSize: 10
        }}>
          <CalendarDays size={12} />
          {getDate(task) || "No due date"}
          {task.category && ` · ${task.category}`}
        </div>
      </div>

      <span style={{
        padding: "5px 8px", borderRadius: 7,
        fontSize: 9, fontWeight: 800,
        textTransform: "capitalize",
        ...priorityColors[priority(task)]
      }}>
        {priority(task)}
      </span>
    </div>
  );
}

export default function Home({
  tasks = [],
  loading = false,
  onToggle = () => {},
}) {
  const [month, setMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selected, setSelected] = useState(dateKey(today));

  const completed = tasks.filter(isDone).length;
  const pending = tasks.filter((task) => !isDone(task)).length;
  const progress = tasks.length
    ? Math.round((completed / tasks.length) * 100)
    : 0;

  const sameDate = (task, key) =>
    getDate(task)?.slice(0, 10) === key;

  const todayTasks = tasks.filter((task) =>
    sameDate(task, dateKey(today))
  );

  const selectedTasks = tasks.filter((task) =>
    sameDate(task, selected)
  );

  const highTasks = tasks
    .filter((task) => !isDone(task) && priority(task) === "high")
    .slice(0, 4);

  const upcoming = useMemo(() => {
    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const end = new Date(start);
    end.setDate(end.getDate() + 7);

    return tasks
      .filter((task) => {
        if (!getDate(task) || isDone(task)) return false;
        const d = new Date(`${getDate(task).slice(0, 10)}T12:00:00`);
        return d > start && d <= end;
      })
      .sort((a, b) => getDate(a).localeCompare(getDate(b)))
      .slice(0, 4);
  }, [tasks]);

  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const offset = (new Date(year, monthIndex, 1).getDay() + 6) % 7;
  const days = new Date(year, monthIndex + 1, 0).getDate();

  const cells = [
    ...Array(offset).fill(null),
    ...Array.from({ length: days }, (_, i) => i + 1),
  ];

  while (cells.length % 7) cells.push(null);

  const monthLabel = month.toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

  const heading = (label, title, icon) => (
    <div style={{
      display: "flex", alignItems: "center",
      justifyContent: "space-between", gap: 10, marginBottom: 15
    }}>
      <div>
        <div style={{
          fontSize: 9, color: "#a78bfa",
          fontWeight: 800, letterSpacing: 1.4
        }}>{label}</div>
        <h2 style={{
          margin: "6px 0 0", fontSize: 18,
          color: "#30233c"
        }}>{title}</h2>
      </div>
      {icon}
    </div>
  );

  const stat = (label, value, icon, color, tint) => (
    <div style={cardStyle}>
      <div style={{
        display: "flex", alignItems: "center",
        gap: 9, color: "#81778f", fontSize: 12
      }}>
        <span style={{
          width: 35, height: 35, display: "grid",
          placeItems: "center", borderRadius: 11,
          color, background: tint
        }}>{icon}</span>
        {label}
      </div>
      <div style={{
        marginTop: 12, fontSize: 28,
        fontWeight: 800, color: "#30233c"
      }}>{value}</div>
    </div>
  );

  return (
    <main style={{
      width: "min(1160px, calc(100% - 32px))",
      margin: "0 auto", padding: "28px 0 55px"
    }}>
      {/* Hero */}
      <section style={{
        position: "relative", overflow: "hidden",
        padding: "38px 32px", borderRadius: 25,
        color: "#fff",
        background: "linear-gradient(112deg,#5125a8,#7c3aed 50%,#ec4899)",
        boxShadow: "0 18px 45px #7c3aed25"
      }}>
        <div style={{
          position: "absolute", width: 260, height: 260,
          right: 25, top: -140, borderRadius: "50%",
          border: "1px solid #ffffff35"
        }} />
        <div style={{
          position: "relative", zIndex: 1, maxWidth: 610
        }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 7,
            fontSize: 10, fontWeight: 800, letterSpacing: 1.6,
            color: "#f3e8ff"
          }}>
            <Sparkles size={14} /> YOUR SPACE TO GET THINGS DONE
          </div>

          <h1 style={{
            margin: "17px 0 12px",
            fontSize: "clamp(32px, 5vw, 46px)",
            lineHeight: 1.15, letterSpacing: -1.5
          }}>
            A clearer mind starts<br />
            with <span style={{ color: "#fbcfe8" }}>a simple plan.</span>
          </h1>

          <p style={{
            maxWidth: 420, fontSize: 13,
            lineHeight: 1.8, color: "#f3e8ff"
          }}>
            Organize your day, focus on important work,
            and stay ahead of every meeting.
          </p>

          <Link to="/tasks/new" style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            padding: "12px 16px", borderRadius: 11,
            color: "#6d28d9", background: "#fff",
            textDecoration: "none", fontSize: 12,
            fontWeight: 800, marginTop: 12
          }}>
            <Plus size={16} /> Add a task
          </Link>
        </div>
        <div style={{
          position: "absolute", right: 24, bottom: 16,
          fontSize: 10, color: "#f3e8ff"
        }}>
          {today.toLocaleDateString("en-IN", {
            weekday: "long", day: "numeric", month: "long"
          })}
        </div>
      </section>

      {/* Statistics */}
      <section style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
        gap: 13, margin: "20px 0 26px"
      }}>
        {stat("Total tasks", tasks.length,
          <ListChecks size={19} />, "#7c3aed", "#f0e8ff")}
        {stat("Pending", pending,
          <Clock3 size={19} />, "#db2777", "#fce7f3")}
        {stat("Completed", completed,
          <CheckCircle2 size={19} />, "#059669", "#d1fae5")}

        <div style={cardStyle}>
          <div style={{
            display: "flex", alignItems: "center", gap: 9,
            color: "#81778f", fontSize: 12
          }}>
            <TrendingUp size={19} color="#ea580c" />
            Task progress
          </div>
          <div style={{
            height: 7, marginTop: 20, borderRadius: 8,
            background: "#f1e9fa", overflow: "hidden"
          }}>
            <div style={{
              width: `${progress}%`, height: "100%",
              background: "linear-gradient(90deg,#8b5cf6,#ec4899)",
              transition: "width .3s"
            }} />
          </div>
          <div style={{
            display: "flex", justifyContent: "space-between",
            marginTop: 9, fontSize: 10, color: "#9a8ea6"
          }}>
            <b style={{ color: "#7c3aed" }}>{progress}%</b>
            <span>completed</span>
          </div>
        </div>
      </section>

      {loading && <p style={{ color: "#7c3aed", fontSize: 13 }}>Loading tasks...</p>}

      {/* Dashboard columns */}
      <section className="home-dashboard-grid" style={{
        display: "grid",
        gridTemplateColumns: "minmax(0,1.15fr) minmax(290px,.85fr)",
        alignItems: "start", gap: 18
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <section style={cardStyle}>
            {heading("STAY ON TRACK", "Today's tasks",
              <Link to="/tasks" style={{
                display: "flex", alignItems: "center", gap: 5,
                color: "#7c3aed", fontSize: 11,
                textDecoration: "none", fontWeight: 700
              }}>View all <ArrowRight size={14} /></Link>)}

            {todayTasks.length
              ? todayTasks.slice(0, 6).map((task) => (
                  <TaskRow key={task.id} task={task} onToggle={onToggle} />
                ))
              : <p style={{
                  color: "#93879f", fontSize: 12, lineHeight: 1.7
                }}>No tasks scheduled for today. Add a task with today's date to see it here.</p>}
          </section>

          <section style={{
            ...cardStyle, borderTop: "3px solid #ec4899"
          }}>
            {heading("IMPORTANT", "High-priority tasks",
              <BellRing size={18} color="#ec4899" />)}
            {highTasks.length
              ? highTasks.map((task) => (
                  <TaskRow key={task.id} task={task} onToggle={onToggle} />
                ))
              : <p style={{ color: "#93879f", fontSize: 12 }}>
                  No pending high-priority tasks.
                </p>}
          </section>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {/* Calendar */}
          <section style={cardStyle}>
            {heading("PLAN AHEAD", "Your calendar",
              <CalendarDays size={19} color="#ec4899" />)}

            <div style={{
              display: "flex", alignItems: "center",
              justifyContent: "space-between", marginBottom: 15
            }}>
              <button
                aria-label="Previous month"
                onClick={() => setMonth(new Date(year, monthIndex - 1, 1))}
                style={{
                  border: "1px solid #eee5f7", borderRadius: 9,
                  background: "#fff", color: "#7c3aed",
                  width: 32, height: 32, cursor: "pointer"
                }}
              ><ChevronLeft size={17} /></button>

              <b style={{ fontSize: 13, color: "#40324e" }}>
                {monthLabel}
              </b>

              <button
                aria-label="Next month"
                onClick={() => setMonth(new Date(year, monthIndex + 1, 1))}
                style={{
                  border: "1px solid #eee5f7", borderRadius: 9,
                  background: "#fff", color: "#7c3aed",
                  width: 32, height: 32, cursor: "pointer"
                }}
              ><ChevronRight size={17} /></button>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(7,minmax(0,1fr))",
              gap: "5px 2px"
            }}>
              {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                <div key={`${day}-${i}`} style={{
                  textAlign: "center", padding: "5px 0",
                  color: "#a095ad", fontSize: 10, fontWeight: 700
                }}>{day}</div>
              ))}

              {cells.map((day, i) => {
                if (!day) return <div key={`empty-${i}`} />;

                const d = new Date(year, monthIndex, day);
                const key = dateKey(d);
                const isToday = key === dateKey(today);
                const isSelected = key === selected;
                const dayTasks = tasks.filter((task) =>
                  getDate(task)?.slice(0, 10) === key
                );
                const hasHigh = dayTasks.some((task) =>
                  !isDone(task) && priority(task) === "high"
                );

                return (
                  <button
                    key={key}
                    onClick={() => setSelected(key)}
                    aria-label={`${key}, ${dayTasks.length} tasks`}
                    style={{
                      position: "relative", height: 36,
                      display: "flex", alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 10,
                      border: isToday && !isSelected
                        ? "1px solid #c4b5fd" : "1px solid transparent",
                      color: isSelected ? "#fff" : "#51405f",
                      background: isSelected
                        ? "linear-gradient(135deg,#7c3aed,#ec4899)"
                        : isToday ? "#f5f0ff" : "transparent",
                      fontSize: 11,
                      fontWeight: isToday || dayTasks.length ? 800 : 500,
                      cursor: "pointer"
                    }}
                  >
                    {day}
                    {dayTasks.length > 0 && (
                      <span style={{
                        position: "absolute", bottom: 3,
                        width: 4, height: 4, borderRadius: "50%",
                        background: isSelected ? "#fff" : hasHigh ? "#ec4899" : "#a78bfa"
                      }} />
                    )}
                  </button>
                );
              })}
            </div>

            <div style={{
              display: "flex", gap: 12, flexWrap: "wrap",
              marginTop: 12, fontSize: 10, color: "#95899f"
            }}>
              <span>🟣 Scheduled task</span>
              <span>🌸 High priority</span>
            </div>

            <div style={{
              marginTop: 15, paddingTop: 14,
              borderTop: "1px solid #f1eaf8"
            }}>
              <div style={{
                display: "flex", justifyContent: "space-between",
                gap: 8, alignItems: "center"
              }}>
                <b style={{ fontSize: 11, color: "#40324e" }}>
                  {new Date(`${selected}T12:00:00`).toLocaleDateString(
                    "en-IN", { day: "numeric", month: "short", year: "numeric" }
                  )}
                </b>
                <span style={{ fontSize: 10, color: "#9a8ea6" }}>
                  {selectedTasks.length} tasks
                </span>
              </div>

              {selectedTasks.length
                ? selectedTasks.map((task) => (
                    <div key={task.id} style={{
                      display: "flex", alignItems: "center",
                      gap: 8, padding: "9px 0"
                    }}>
                      <span style={{
                        width: 7, height: 7, borderRadius: "50%",
                        background: priority(task) === "high" ? "#ec4899" : "#a78bfa"
                      }} />
                      <span style={{
                        flex: 1, fontSize: 11, color: "#574765",
                        overflowWrap: "anywhere"
                      }}>{task.title}</span>
                      <span style={{
                        fontSize: 9, color: "#9a8ea6",
                        textTransform: "capitalize"
                      }}>{priority(task)}</span>
                    </div>
                  ))
                : <p style={{
                    fontSize: 11, color: "#a095ad", lineHeight: 1.6
                  }}>
                    No tasks on this date.{" "}
                    <Link to="/tasks/new" style={{
                      color: "#7c3aed", fontWeight: 700,
                      textDecoration: "none"
                    }}>Add one</Link>
                  </p>}
            </div>
          </section>

          {/* Upcoming reminders */}
          <section style={{
            ...cardStyle,
            background: "linear-gradient(145deg,#fff,#fff3f9)",
            borderColor: "#f3d5eb"
          }}>
            {heading("LOOKING AHEAD", "Upcoming reminders",
              <BellRing size={18} color="#ec4899" />)}

            {upcoming.length
              ? upcoming.map((task) => (
                  <div key={task.id} style={{
                    display: "flex", alignItems: "center",
                    gap: 11, padding: "10px 0",
                    borderBottom: "1px solid #f6e7f1"
                  }}>
                    <div style={{
                      width: 43, height: 45, flexShrink: 0,
                      display: "flex", flexDirection: "column",
                      alignItems: "center", justifyContent: "center",
                      borderRadius: 11, color: "#7c3aed",
                      background: "linear-gradient(135deg,#f0e8ff,#fce7f3)"
                    }}>
                      <b style={{ fontSize: 16, lineHeight: 1.1 }}>
                        {new Date(`${getDate(task).slice(0, 10)}T12:00:00`).getDate()}
                      </b>
                      <span style={{ fontSize: 9 }}>
                        {new Date(`${getDate(task).slice(0, 10)}T12:00:00`).toLocaleDateString("en-IN", { month: "short" })}
                      </span>
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <b style={{
                        display: "block", color: "#493951",
                        fontSize: 11, overflowWrap: "anywhere"
                      }}>{task.title}</b>
                      <span style={{
                        display: "block", marginTop: 4,
                        color: "#a095ad", fontSize: 10
                      }}>{task.category || "Upcoming task"} · {priority(task)}</span>
                    </div>
                  </div>
                ))
              : <p style={{
                  margin: 0, color: "#93879f",
                  fontSize: 11, lineHeight: 1.7
                }}>No upcoming tasks in the next 7 days. Scheduled meetings will appear here.</p>}
          </section>
        </div>
      </section>
    </main>
  );
}
