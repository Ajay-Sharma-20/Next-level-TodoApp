
import { Link } from "react-router-dom";
import {
  CheckCheck,
  Target,
  Zap,
  CalendarDays,
  SlidersHorizontal,
  LayoutDashboard,
  Code2,
  Database,
  Smartphone,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export default function About() {
  const features = [
    {
      icon: LayoutDashboard,
      title: "Smart Dashboard",
      description:
        "Get a quick overview of your tasks, pending work, completed tasks, and upcoming deadlines.",
      color: "#8055D8",
      bg: "#F0E9FF",
    },
    {
      icon: CalendarDays,
      title: "Deadline Tracking",
      description:
        "Set due dates, plan your schedule, and keep track of upcoming tasks.",
      color: "#D946A8",
      bg: "#FCE8F4",
    },
    {
      icon: SlidersHorizontal,
      title: "Organized Tasks",
      description:
        "Search tasks and filter them by status, priority, and category.",
      color: "#2374C6",
      bg: "#E3F2FF",
    },
    {
      icon: CheckCircle2,
      title: "Progress Tracking",
      description:
        "Mark tasks as completed and keep your work organized from one place.",
      color: "#25866A",
      bg: "#E8F8F1",
    },
  ];

  const technologies = [
    {
      icon: Code2,
      name: "React",
      description: "Interactive user interface",
    },
    {
      icon: Sparkles,
      name: "Vite",
      description: "Frontend development tooling",
    },
    {
      icon: Zap,
      name: "Laravel",
      description: "Backend API and application logic",
    },
    {
      icon: Database,
      name: "SQLite",
      description: "Database storage",
    },
  ];

  const workflow = [
    {
      number: "01",
      title: "Create",
      description: "Add a task with its details and deadline.",
    },
    {
      number: "02",
      title: "Organize",
      description: "Set priority and category to organize your work.",
    },
    {
      number: "03",
      title: "Track",
      description: "Review your tasks and monitor upcoming deadlines.",
    },
    {
      number: "04",
      title: "Complete",
      description: "Mark finished tasks and track your progress.",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F8F7FC",
        color: "#302747",
        overflow: "hidden",
      }}
    >
      {/* Hero */}
      <section
        style={{
          padding: "65px 24px 75px",
          background:
            "radial-gradient(circle at 15% 15%, #EADFFF 0%, transparent 38%), radial-gradient(circle at 85% 70%, #FCE0F0 0%, transparent 38%), #FFFFFF",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            alignItems: "center",
            gap: "45px",
          }}
          className="about-hero-grid"
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "9px 13px",
                borderRadius: "30px",
                color: "#8055D8",
                background: "#F0E9FF",
                fontSize: "12px",
                fontWeight: "800",
                letterSpacing: "0.5px",
                marginBottom: "20px",
              }}
            >
              <Sparkles size={15} />
              ABOUT TASKFLOW
            </div>

            <h1
              style={{
                fontSize: "clamp(35px, 5vw, 55px)",
                lineHeight: 1.13,
                letterSpacing: "-2px",
                margin: "0 0 20px",
              }}
            >
              Make every task
              <br />
              <span
                style={{
                  background:
                    "linear-gradient(110deg, #7C3AED, #EC4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                count.
              </span>
            </h1>

            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.9,
                color: "#796F89",
                maxWidth: "510px",
                margin: "0 0 28px",
              }}
            >
              TaskFlow is a task management application designed to help
              you organize daily work, prioritize important tasks, manage
              deadlines, and track your progress in one place.
            </p>

            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              <Link
                to="/tasks/new"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "14px 19px",
                  borderRadius: "12px",
                  color: "#FFFFFF",
                  background:
                    "linear-gradient(110deg, #7C3AED, #EC4899)",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: "700",
                  boxShadow: "0 8px 22px #8B5CF633",
                }}
              >
                Get Started <ArrowRight size={17} />
              </Link>

              <Link
                to="/tasks"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "14px 19px",
                  borderRadius: "12px",
                  color: "#8055D8",
                  background: "#FFFFFF",
                  border: "1px solid #E8DDFB",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: "700",
                }}
              >
                Explore Tasks
              </Link>
            </div>
          </div>

          {/* Decorative dashboard illustration */}
          <div
            style={{
              position: "relative",
              padding: "22px",
              borderRadius: "26px",
              background:
                "linear-gradient(135deg, #8B5CF6, #D946A8)",
              boxShadow: "0 24px 65px #8B5CF62B",
            }}
          >
            <div
              style={{
                padding: "22px",
                borderRadius: "18px",
                background: "#FFFFFF",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "22px",
                }}
              >
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    display: "grid",
                    placeItems: "center",
                    color: "#FFFFFF",
                    borderRadius: "12px",
                    background:
                      "linear-gradient(135deg, #7C3AED, #EC4899)",
                  }}
                >
                  <CheckCheck size={21} />
                </div>

                <div>
                  <div style={{ fontWeight: "800", fontSize: "16px" }}>
                    TaskFlow
                  </div>
                  <div style={{ color: "#9890A6", fontSize: "12px" }}>
                    Your productivity space
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  gap: "12px",
                  marginBottom: "18px",
                }}
              >
                {[
                  ["Stay organized", "#F0E9FF", "#8055D8"],
                  ["Meet deadlines", "#FCE8F4", "#D946A8"],
                ].map(([label, bg, color]) => (
                  <div
                    key={label}
                    style={{
                      background: bg,
                      padding: "15px 12px",
                      borderRadius: "13px",
                    }}
                  >
                    <CheckCircle2 size={20} color={color} />
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: "700",
                        marginTop: "10px",
                      }}
                    >
                      {label}
                    </div>
                  </div>
                ))}
              </div>

              {[
                ["Prepare project report", true],
                ["Review pending tasks", false],
                ["Plan tomorrow's work", false],
              ].map(([label, completed]) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "13px 0",
                    borderTop: "1px solid #F0EDF5",
                    fontSize: "13px",
                    color: completed ? "#9890A6" : "#514461",
                    textDecoration: completed ? "line-through" : "none",
                  }}
                >
                  <CheckCircle2
                    size={18}
                    color={completed ? "#25866A" : "#C7BDD8"}
                  />
                  {label}
                </div>
              ))}
            </div>

            <div
              style={{
                position: "absolute",
                right: "-12px",
                top: "45px",
                width: "45px",
                height: "45px",
                display: "grid",
                placeItems: "center",
                borderRadius: "15px",
                color: "#8055D8",
                background: "#FFFFFF",
                boxShadow: "0 8px 25px #35204418",
              }}
            >
              <Target size={23} />
            </div>
          </div>
        </div>
      </section>

      {/* Purpose */}
      <section style={{ padding: "65px 24px" }}>
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "45px",
            alignItems: "center",
          }}
          className="about-purpose-grid"
        >
          <div>
            <div
              style={{
                color: "#D946A8",
                fontSize: "12px",
                fontWeight: "800",
                letterSpacing: "1.5px",
                marginBottom: "12px",
              }}
            >
              OUR PURPOSE
            </div>

            <h2
              style={{
                fontSize: "clamp(27px, 4vw, 36px)",
                letterSpacing: "-1px",
                lineHeight: 1.25,
                margin: "0 0 16px",
              }}
            >
              Less confusion.
              <br />
              More meaningful progress.
            </h2>

            <p
              style={{
                color: "#81768F",
                lineHeight: 1.9,
                margin: 0,
                fontSize: "15px",
              }}
            >
              Managing multiple responsibilities can become difficult
              without a clear plan. TaskFlow brings your tasks, deadlines,
              priorities, and completion status together so you can focus
              on what needs attention next.
            </p>
          </div>

          <div
            style={{
              padding: "25px",
              borderRadius: "22px",
              background: "#FFFFFF",
              border: "1px solid #EEEAF5",
              boxShadow: "0 12px 35px #35204406",
            }}
          >
            {[
              "Keep tasks organized in one place",
              "Identify high-priority work",
              "Track upcoming due dates",
              "Monitor pending and completed tasks",
            ].map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "14px 0",
                  borderBottom: "1px solid #F1EDF6",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                <CheckCircle2
                  size={19}
                  color="#8055D8"
                  style={{ flexShrink: 0 }}
                />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        style={{
          padding: "65px 24px",
          background: "#FFFFFF",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "38px" }}>
            <div
              style={{
                color: "#8055D8",
                fontSize: "12px",
                fontWeight: "800",
                letterSpacing: "1.5px",
                marginBottom: "12px",
              }}
            >
              WHAT YOU CAN DO
            </div>

            <h2
              style={{
                fontSize: "clamp(27px, 4vw, 36px)",
                margin: "0 0 12px",
                letterSpacing: "-1px",
              }}
            >
              Everything in one workflow
            </h2>

            <p
              style={{
                color: "#89849B",
                lineHeight: 1.7,
                maxWidth: "570px",
                margin: "0 auto",
                fontSize: "14px",
              }}
            >
              Simple tools to help you plan, manage, and complete your
              daily work.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: "18px",
            }}
            className="about-features-grid"
          >
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  style={{
                    padding: "25px",
                    border: "1px solid #EEEAF5",
                    borderRadius: "19px",
                    background: "#FFFFFF",
                    transition: "transform 0.2s ease",
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      display: "grid",
                      placeItems: "center",
                      borderRadius: "15px",
                      background: feature.bg,
                      color: feature.color,
                      marginBottom: "18px",
                    }}
                  >
                    <Icon size={23} />
                  </div>

                  <h3 style={{ margin: "0 0 10px", fontSize: "17px" }}>
                    {feature.title}
                  </h3>

                  <p
                    style={{
                      margin: 0,
                      color: "#89849B",
                      fontSize: "14px",
                      lineHeight: 1.8,
                    }}
                  >
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section style={{ padding: "65px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "38px" }}>
            <div
              style={{
                color: "#D946A8",
                fontSize: "12px",
                fontWeight: "800",
                letterSpacing: "1.5px",
                marginBottom: "12px",
              }}
            >
              HOW IT WORKS
            </div>

            <h2
              style={{
                fontSize: "clamp(27px, 4vw, 36px)",
                margin: 0,
                letterSpacing: "-1px",
              }}
            >
              Four steps to stay on track
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: "16px",
            }}
            className="about-workflow-grid"
          >
            {workflow.map((step) => (
              <div
                key={step.number}
                style={{
                  padding: "23px 19px",
                  borderRadius: "18px",
                  border: "1px solid #EEEAF5",
                  background: "#FFFFFF",
                }}
              >
                <div
                  style={{
                    color: "#A78BFA",
                    fontSize: "13px",
                    fontWeight: "800",
                    marginBottom: "20px",
                  }}
                >
                  STEP {step.number}
                </div>

                <h3 style={{ margin: "0 0 9px", fontSize: "17px" }}>
                  {step.title}
                </h3>

                <p
                  style={{
                    margin: 0,
                    color: "#89849B",
                    fontSize: "13px",
                    lineHeight: 1.8,
                  }}
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology */}
      <section
        style={{
          padding: "65px 24px",
          background:
            "linear-gradient(135deg, #F0E9FF 0%, #FFF0F7 100%)",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "35px" }}>
            <div
              style={{
                color: "#8055D8",
                fontSize: "12px",
                fontWeight: "800",
                letterSpacing: "1.5px",
                marginBottom: "12px",
              }}
            >
              UNDER THE HOOD
            </div>

            <h2
              style={{
                fontSize: "clamp(27px, 4vw, 36px)",
                margin: "0 0 12px",
                letterSpacing: "-1px",
              }}
            >
              Built with modern technology
            </h2>

            <p style={{ color: "#89849B", fontSize: "14px" }}>
              The technologies powering the TaskFlow application.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: "15px",
            }}
            className="about-tech-grid"
          >
            {technologies.map((technology) => {
              const Icon = technology.icon;

              return (
                <div
                  key={technology.name}
                  style={{
                    padding: "22px 15px",
                    textAlign: "center",
                    background: "#FFFFFF",
                    border: "1px solid #EEE5F7",
                    borderRadius: "17px",
                  }}
                >
                  <Icon
                    size={27}
                    color="#8055D8"
                    style={{ marginBottom: "12px" }}
                  />

                  <h3 style={{ margin: "0 0 7px", fontSize: "15px" }}>
                    {technology.name}
                  </h3>

                  <p
                    style={{
                      margin: 0,
                      color: "#89849B",
                      fontSize: "12px",
                      lineHeight: 1.6,
                    }}
                  >
                    {technology.description}
                  </p>
                </div>
              );
            })}
          </div>

          <p
            style={{
              textAlign: "center",
              color: "#89849B",
              fontSize: "12px",
              marginTop: "22px",
              lineHeight: 1.7,
            }}
          >
            Technology details reflect the current project setup. Update
            this section if the actual stack changes.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "65px 24px" }}>
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "40px 25px",
            textAlign: "center",
            borderRadius: "25px",
            background:
              "linear-gradient(120deg, #7C3AED, #B64FD2, #EC4899)",
            color: "#FFFFFF",
          }}
        >
          <div
            style={{
              display: "inline-grid",
              placeItems: "center",
              width: "48px",
              height: "48px",
              borderRadius: "15px",
              background: "#FFFFFF25",
              marginBottom: "16px",
            }}
          >
            <CheckCheck size={25} />
          </div>

          <h2
            style={{
              fontSize: "clamp(25px, 4vw, 35px)",
              margin: "0 0 12px",
              letterSpacing: "-1px",
            }}
          >
            Ready to get organized?
          </h2>

          <p
            style={{
              margin: "0 auto 24px",
              maxWidth: "500px",
              fontSize: "14px",
              lineHeight: 1.8,
              opacity: 0.9,
            }}
          >
            Start managing your tasks, set priorities, and make progress
            one step at a time.
          </p>

          <Link
            to="/tasks/new"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 20px",
              borderRadius: "12px",
              background: "#FFFFFF",
              color: "#8055D8",
              fontSize: "14px",
              fontWeight: "800",
              textDecoration: "none",
            }}
          >
            Create Your First Task <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </div>
  );
}
