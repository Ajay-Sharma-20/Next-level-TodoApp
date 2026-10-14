import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Search,
  CalendarDays,
  Flag,
  CheckCircle2,
  Circle,
  Trash2,
  ListTodo,
  Pencil,
} from "lucide-react";
import {
  getTodos,
  updateTodo,
  deleteTodo,
} from "../api/todos";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [busyId, setBusyId] = useState(null);

  useEffect(() => {
    async function loadTasks() {
      try {
        setLoading(true);
        setError("");
        const data = await getTodos();
        setTasks(Array.isArray(data) ? data : data.data ?? []);
      } catch (err) {
        setError(err.message || "Unable to load tasks.");
      } finally {
        setLoading(false);
      }
    }

    loadTasks();
  }, []);

  const categories = useMemo(
    () => [
      ...new Set(
        tasks.map((task) => task.category).filter(Boolean)
      ),
    ],
    [tasks]
  );

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title?.toLowerCase().includes(search.toLowerCase()) ||
        task.description?.toLowerCase().includes(search.toLowerCase());

      const completed = Boolean(task.is_completed);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "completed" && completed) ||
        (statusFilter === "pending" && !completed);

      const matchesPriority =
        priorityFilter === "all" ||
        task.priority === priorityFilter;

      const matchesCategory =
        categoryFilter === "all" ||
        task.category === categoryFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesCategory
      );
    });
  }, [tasks, search, statusFilter, priorityFilter, categoryFilter]);

  async function handleToggle(task) {
    try {
      setBusyId(task.id);
      setError("");

      const updatedTask = await updateTodo(task.id, {
        is_completed: !Boolean(task.is_completed),
      });

      setTasks((previous) =>
        previous.map((item) =>
          item.id === task.id ? updatedTask : item
        )
      );
    } catch (err) {
      setError(err.message || "Unable to update task.");
    } finally {
      setBusyId(null);
    }
  }

  async function handleDelete(task) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${task.title}"?`
    );

    if (!confirmed) return;

    try {
      setBusyId(task.id);
      setError("");

      await deleteTodo(task.id);

      setTasks((previous) =>
        previous.filter((item) => item.id !== task.id)
      );
    } catch (err) {
      setError(err.message || "Unable to delete task.");
    } finally {
      setBusyId(null);
    }
  }

  const inputStyle = {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px 14px",
    border: "1px solid #E5E1EF",
    borderRadius: "12px",
    background: "#FFFFFF",
    color: "#302747",
    fontSize: "14px",
    outline: "none",
  };

  const selectStyle = {
    ...inputStyle,
    cursor: "pointer",
  };

  const priorityColor = {
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
      <div style={{ maxWidth: "1150px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            flexWrap: "wrap",
            marginBottom: "28px",
          }}
        >
          <div>
            <div
              style={{
                color: "#8759D9",
                fontSize: "12px",
                fontWeight: "800",
                letterSpacing: "1.5px",
                marginBottom: "8px",
              }}
            >
              TASK MANAGEMENT
            </div>

            <h1
              style={{
                fontSize: "clamp(28px, 4vw, 38px)",
                margin: "0 0 8px",
                letterSpacing: "-1px",
              }}
            >
              All Tasks
            </h1>

            <p style={{ color: "#89849B", margin: 0 }}>
              Manage your work, one task at a time.
            </p>
          </div>

          <Link
            to="/tasks/new"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "13px 18px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #8B5CF6, #D946A8)",
              color: "#FFFFFF",
              textDecoration: "none",
              fontWeight: "700",
              boxShadow: "0 7px 18px #8B5CF633",
            }}
          >
            <Plus size={18} />
            New Task
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "14px",
            marginBottom: "24px",
          }}
          className="tasks-stats-grid"
        >
          {[
            {
              label: "Total Tasks",
              value: tasks.length,
              color: "#8055D8",
            },
            {
              label: "Pending",
              value: tasks.filter((task) => !task.is_completed).length,
              color: "#D68A26",
            },
            {
              label: "Completed",
              value: tasks.filter((task) => task.is_completed).length,
              color: "#269875",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                padding: "20px",
                border: "1px solid #EEEAF5",
                borderRadius: "18px",
                background: "#FFFFFF",
              }}
            >
              <div style={{ color: "#89849B", fontSize: "13px" }}>
                {stat.label}
              </div>
              <div
                style={{
                  color: stat.color,
                  fontSize: "30px",
                  fontWeight: "800",
                  marginTop: "8px",
                }}
              >
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #EEEAF5",
            borderRadius: "18px",
            padding: "20px",
            marginBottom: "22px",
          }}
        >
          <div style={{ position: "relative", marginBottom: "16px" }}>
            <Search
              size={18}
              color="#9891AA"
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search tasks by title or description..."
              style={{ ...inputStyle, paddingLeft: "42px" }}
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: "12px",
            }}
            className="tasks-filter-grid"
          >
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              style={selectStyle}
            >
              <option value="all">All statuses</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(event) => setPriorityFilter(event.target.value)}
              style={selectStyle}
            >
              <option value="all">All priorities</option>
              <option value="high">High priority</option>
              <option value="medium">Medium priority</option>
              <option value="low">Low priority</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              style={selectStyle}
            >
              <option value="all">All categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && (
          <div
            role="alert"
            style={{
              background: "#FFF0F1",
              color: "#B42335",
              borderRadius: "12px",
              padding: "14px 16px",
              marginBottom: "18px",
            }}
          >
            {error}
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            Loading tasks...
          </div>
        ) : filteredTasks.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "55px 20px",
              borderRadius: "18px",
              background: "#FFFFFF",
              border: "1px solid #EEEAF5",
            }}
          >
            <ListTodo size={38} color="#9B7BE5" />
            <h3 style={{ marginBottom: "8px" }}>No tasks found</h3>
            <p style={{ color: "#89849B" }}>
              Try changing your filters or create a new task.
            </p>
            <Link
              to="/tasks/new"
              style={{ color: "#8055D8", fontWeight: "700" }}
            >
              Create a task
            </Link>
          </div>
        ) : (
          <div style={{ display: "grid", gap: "12px" }}>
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  padding: "19px",
                  borderRadius: "16px",
                  border: "1px solid #EEEAF5",
                  background: "#FFFFFF",
                  flexWrap: "wrap",
                  opacity: task.is_completed ? 0.75 : 1,
                }}
              >
                <button
                  type="button"
                  disabled={busyId === task.id}
                  onClick={() => handleToggle(task)}
                  aria-label={
                    task.is_completed
                      ? "Mark task as pending"
                      : "Mark task as completed"
                  }
                  style={{
                    border: "none",
                    background: "transparent",
                    padding: 0,
                    cursor: busyId === task.id ? "wait" : "pointer",
                    color: task.is_completed ? "#269875" : "#AAA3BC",
                  }}
                >
                  {task.is_completed ? (
                    <CheckCircle2 size={24} />
                  ) : (
                    <Circle size={24} />
                  )}
                </button>

                <div style={{ flex: "1 1 220px", minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "700",
                      textDecoration: task.is_completed
                        ? "line-through"
                        : "none",
                      overflowWrap: "anywhere",
                    }}
                  >
                    {task.title}
                  </div>

                  {task.description && (
                    <div
                      style={{
                        color: "#89849B",
                        fontSize: "13px",
                        marginTop: "5px",
                        overflowWrap: "anywhere",
                      }}
                    >
                      {task.description}
                    </div>
                  )}

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      flexWrap: "wrap",
                      marginTop: "10px",
                      color: "#89849B",
                      fontSize: "12px",
                    }}
                  >
                    {task.category && <span>{task.category}</span>}

                    {task.due_date && (
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <CalendarDays size={14} />
                        {String(task.due_date).slice(0, 10)}
                      </span>
                    )}
                  </div>
                </div>

                <span
                  style={{
                    ...priorityColor[task.priority || "medium"],
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    padding: "7px 10px",
                    borderRadius: "9px",
                    fontSize: "12px",
                    fontWeight: "700",
                    textTransform: "capitalize",
                  }}
                >
                  <Flag size={13} />
                  {task.priority || "medium"}
                </span>


                <Link
  to={`/tasks/edit/${task.id}`}
  style={{
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    padding: "9px 12px",
    borderRadius: "10px",
    background: "#F0E9FF",
    color: "#8055D8",
    textDecoration: "none",
    fontSize: "13px",
    fontWeight: "700",
    border: "1px solid #E3D8FF",
    whiteSpace: "nowrap",
  }}
>
  <Pencil size={15} />
  Edit
</Link>



                <button
                  type="button"
                  disabled={busyId === task.id}
                  onClick={() => handleDelete(task)}
                  aria-label={`Delete ${task.title}`}
                  title="Delete task"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid #F4DDE2",
                    background: "#FFF5F6",
                    color: "#D9435F",
                    borderRadius: "10px",
                    padding: "10px",
                    cursor: busyId === task.id ? "wait" : "pointer",
                  }}
                >
                  <Trash2 size={17} />
                </button>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredTasks.length > 0 && (
          <p
            style={{
              textAlign: "center",
              fontSize: "13px",
              color: "#89849B",
              marginTop: "20px",
            }}
          >
            Showing {filteredTasks.length} of {tasks.length} tasks
          </p>
        )}
      </div>
    </div>
  );
}