
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Flag,
  NotebookPen,
  Save,
  Sparkles,
} from "lucide-react";
import { getTodos, updateTodo } from "../api/todos";

export default function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    due_date: "",
    category: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadTask() {
      try {
        setLoading(true);
        setError("");

        const data = await getTodos();
        const allTasks = Array.isArray(data)
          ? data
          : data.data ?? [];

        const task = allTasks.find(
          (item) => String(item.id) === String(id)
        );

        if (!task) {
          throw new Error("Task not found.");
        }

        if (active) {
          setForm({
            title: task.title ?? "",
            description: task.description ?? "",
            priority: task.priority ?? "medium",
            due_date: task.due_date
              ? String(task.due_date).slice(0, 10)
              : "",
            category: task.category ?? "",
          });
        }
      } catch (err) {
        if (active) {
          setError(err.message || "Unable to load task.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadTask();

    return () => {
      active = false;
    };
  }, [id]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.title.trim()) {
      setError("Please enter a task title.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      await updateTodo(id, {
        title: form.title.trim(),
        description: form.description.trim() || null,
        priority: form.priority,
        due_date: form.due_date || null,
        category: form.category.trim() || null,
      });

      navigate("/tasks");
    } catch (err) {
      setError(err.message || "Unable to update task.");
    } finally {
      setSaving(false);
    }
  }

  const inputStyle = {
    width: "100%",
    boxSizing: "border-box",
    padding: "13px 14px",
    border: "1px solid #E5E1EF",
    borderRadius: "12px",
    background: "#FFFFFF",
    color: "#302747",
    fontSize: "14px",
    outline: "none",
  };

  const labelStyle = {
    display: "flex",
    alignItems: "center",
    gap: "7px",
    fontSize: "13px",
    fontWeight: "700",
    marginBottom: "9px",
    color: "#504663",
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "70vh",
          display: "grid",
          placeItems: "center",
          background: "#F8F7FC",
          color: "#8055D8",
          fontWeight: "600",
        }}
      >
        Loading task...
      </div>
    );
  }

  if (error && !form.title) {
    return (
      <div
        style={{
          minHeight: "70vh",
          display: "grid",
          placeItems: "center",
          padding: "24px",
          background: "#F8F7FC",
        }}
      >
        <div
          style={{
            background: "#FFFFFF",
            padding: "30px",
            borderRadius: "18px",
            maxWidth: "420px",
            width: "100%",
            textAlign: "center",
            boxSizing: "border-box",
          }}
        >
          <h2 style={{ color: "#302747" }}>Unable to open task</h2>
          <p style={{ color: "#B42335" }}>{error}</p>
          <Link
            to="/tasks"
            style={{ color: "#8055D8", fontWeight: "700" }}
          >
            Back to All Tasks
          </Link>
        </div>
      </div>
    );
  }

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
      <div style={{ maxWidth: "850px", margin: "0 auto" }}>
        <Link
          to="/tasks"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            color: "#8055D8",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: "700",
            marginBottom: "24px",
          }}
        >
          <ArrowLeft size={18} />
          Back to All Tasks
        </Link>

        <div
          style={{
            background:
              "linear-gradient(125deg, #7650D8, #B65BD5, #E66EAE)",
            borderRadius: "22px",
            padding: "27px 30px",
            color: "#FFFFFF",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "9px",
              fontSize: "12px",
              fontWeight: "700",
              letterSpacing: "1.3px",
              marginBottom: "12px",
            }}
          >
            <Sparkles size={17} />
            TASK MANAGEMENT
          </div>

          <h1
            style={{
              fontSize: "clamp(27px, 4vw, 36px)",
              margin: "0 0 9px",
              letterSpacing: "-1px",
            }}
          >
            Edit Task
          </h1>

          <p style={{ margin: 0, opacity: 0.9, lineHeight: 1.6 }}>
            Update your task details and save your changes.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            padding: "28px",
            borderRadius: "20px",
            background: "#FFFFFF",
            border: "1px solid #EEEAF5",
            boxShadow: "0 10px 35px #35205A08",
          }}
        >
          {error && (
            <div
              role="alert"
              style={{
                padding: "12px 14px",
                borderRadius: "10px",
                background: "#FFF0F1",
                color: "#B42335",
                fontSize: "13px",
                marginBottom: "20px",
              }}
            >
              {error}
            </div>
          )}

          <div style={{ marginBottom: "22px" }}>
            <label htmlFor="title" style={labelStyle}>
              <NotebookPen size={16} />
              Task Title *
            </label>

            <input
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter task title"
              maxLength={255}
              required
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "22px" }}>
            <label htmlFor="description" style={labelStyle}>
              Description
            </label>

            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Add details about your task..."
              rows={4}
              style={{
                ...inputStyle,
                resize: "vertical",
                lineHeight: 1.6,
              }}
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: "20px",
              marginBottom: "22px",
            }}
            className="edit-task-grid"
          >
            <div>
              <label htmlFor="priority" style={labelStyle}>
                <Flag size={16} />
                Priority
              </label>

              <select
                id="priority"
                name="priority"
                value={form.priority}
                onChange={handleChange}
                style={{ ...inputStyle, cursor: "pointer" }}
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div>
              <label htmlFor="due_date" style={labelStyle}>
                <CalendarDays size={16} />
                Due Date
              </label>

              <input
                id="due_date"
                name="due_date"
                type="date"
                value={form.due_date}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
          </div>

          <div style={{ marginBottom: "28px" }}>
            <label htmlFor="category" style={labelStyle}>
              Category
            </label>

            <input
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="e.g. Work, Personal, Study"
              maxLength={100}
              style={inputStyle}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <Link
              to="/tasks"
              style={{
                padding: "13px 18px",
                borderRadius: "12px",
                border: "1px solid #E5E1EF",
                color: "#625A74",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "700",
              }}
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={saving}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "13px 20px",
                border: "none",
                borderRadius: "12px",
                background: saving
                  ? "#B9A3E8"
                  : "linear-gradient(135deg, #8B5CF6, #D946A8)",
                color: "#FFFFFF",
                fontWeight: "700",
                fontSize: "14px",
                cursor: saving ? "wait" : "pointer",
                boxShadow: "0 7px 18px #8B5CF633",
              }}
            >
              <Save size={17} />
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
