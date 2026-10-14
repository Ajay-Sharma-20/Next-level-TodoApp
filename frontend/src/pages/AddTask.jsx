
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Flag,
  NotebookPen,
  Sparkles,
  Save,
} from "lucide-react";
import { createTodo } from "../api/todos";

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  border: "1px solid #e9e0f2",
  borderRadius: 11,
  outline: "none",
  color: "#352642",
  background: "#fff",
  fontSize: 13,
};

const labelStyle = {
  display: "flex",
  alignItems: "center",
  gap: 7,
  marginBottom: 8,
  color: "#51405f",
  fontSize: 12,
  fontWeight: 700,
};

export default function AddTask({ onTaskCreated }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    due_date: "",
    category: "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const payload = {
        ...form,
        due_date: form.due_date || null,
        category: form.category.trim() || null,
        description: form.description.trim() || null,
      };

      const createdTask = await createTodo(payload);

      if (onTaskCreated) {
        onTaskCreated(createdTask);
      }

      navigate("/");
    } catch (err) {
      setError(err.message || "Unable to create task.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main style={{
      width: "min(1000px, calc(100% - 32px))",
      margin: "0 auto",
      padding: "30px 0 60px",
    }}>
      <Link to="/" style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        marginBottom: 24,
        color: "#82758f",
        textDecoration: "none",
        fontSize: 12,
        fontWeight: 700,
      }}>
        <ArrowLeft size={16} /> Back to dashboard
      </Link>

      <div className="add-task-layout" style={{
        display: "grid",
        gridTemplateColumns: "0.8fr 1.2fr",
        alignItems: "start",
        gap: 32,
      }}>
        {/* Intro panel */}
        <section style={{ padding: "18px 4px" }}>
          <div style={{
            display: "grid",
            placeItems: "center",
            width: 52,
            height: 52,
            marginBottom: 22,
            borderRadius: 16,
            color: "#7c3aed",
            background: "linear-gradient(135deg,#f0e7ff,#fce7f3)",
          }}>
            <Sparkles size={24} />
          </div>

          <div style={{
            color: "#a78bfa",
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: 1.6,
          }}>
            MAKE IT HAPPEN
          </div>

          <h1 style={{
            margin: "12px 0",
            color: "#30233c",
            fontSize: "clamp(30px,4vw,40px)",
            lineHeight: 1.2,
          }}>
            One task at a time.
          </h1>

          <p style={{
            color: "#8b8097",
            fontSize: 13,
            lineHeight: 1.9,
          }}>
            Capture your next task, set its priority,
            and give it a date so you can stay ahead.
          </p>

          <div style={{
            marginTop: 28,
            padding: 18,
            border: "1px solid #eee1fc",
            borderRadius: 15,
            background: "linear-gradient(120deg,#f6f0ff,#fff2f8)",
          }}>
            <b style={{ color: "#6d28d9", fontSize: 12 }}>
              A little tip 💜
            </b>
            <p style={{
              marginBottom: 0,
              color: "#8c7b9b",
              fontSize: 11,
              lineHeight: 1.8,
            }}>
              Use High priority for important deadlines
              and meetings you cannot afford to miss.
            </p>
          </div>
        </section>

        {/* Form */}
        <section style={{
          padding: 25,
          border: "1px solid #eee5f7",
          borderRadius: 20,
          background: "#fff",
          boxShadow: "0 12px 35px rgba(87,47,132,.07)",
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 23,
          }}>
            <NotebookPen size={21} color="#8b5cf6" />
            <div>
              <h2 style={{
                margin: 0,
                color: "#30233c",
                fontSize: 20,
              }}>Task details</h2>
              <p style={{
                margin: "5px 0 0",
                color: "#9a8ea6",
                fontSize: 11,
              }}>Fields marked * are required.</p>
            </div>
          </div>

          {error && (
            <div role="alert" style={{
              marginBottom: 17,
              padding: 12,
              borderRadius: 10,
              color: "#be123c",
              background: "#fff1f2",
              fontSize: 12,
              lineHeight: 1.6,
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 18 }}>
              <label htmlFor="title" style={labelStyle}>
                Task title *
              </label>
              <input
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Prepare project presentation"
                required
                maxLength={255}
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: 18 }}>
              <label htmlFor="description" style={labelStyle}>
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Add some details about this task..."
                rows={4}
                style={{
                  ...inputStyle,
                  resize: "vertical",
                  lineHeight: 1.7,
                }}
              />
            </div>

            <div className="task-form-grid" style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 14,
            }}>
              <div style={{ marginBottom: 18 }}>
                <label htmlFor="priority" style={labelStyle}>
                  <Flag size={14} /> Priority
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                  style={inputStyle}
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              <div style={{ marginBottom: 18 }}>
                <label htmlFor="due_date" style={labelStyle}>
                  <CalendarDays size={14} /> Due date
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

            <div style={{ marginBottom: 22 }}>
              <label htmlFor="category" style={labelStyle}>
                Category
              </label>
              <input
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Meeting, Work, Personal..."
                maxLength={100}
                style={inputStyle}
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 9,
                padding: "13px 18px",
                border: "none",
                borderRadius: 12,
                color: "#fff",
                background: "linear-gradient(110deg,#7c3aed,#c026d3 60%,#ec4899)",
                boxShadow: "0 7px 18px #a855f733",
                fontWeight: 800,
                fontSize: 13,
                cursor: saving ? "wait" : "pointer",
                opacity: saving ? 0.7 : 1,
              }}
            >
              <Save size={17} />
              {saving ? "Saving task..." : "Create task"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
