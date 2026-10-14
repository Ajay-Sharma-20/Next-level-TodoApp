
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import { getTodos, updateTodo } from "./api/todos";
import AddTask from "./pages/AddTask";
import Tasks from "./pages/Tasks";
import Recent from "./pages/Recent";
import EditTask from "./pages/EditTask";
import About from "./pages/About";
import Footer from "./components/Footer";

function App() {

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTodos()
      .then((data) => setTasks(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  async function toggleTask(task) {
    try {
      const updated = await updateTodo(task.id, {
        is_completed: !task.is_completed,
      });

      setTasks((current) =>
        current.map((item) => item.id === task.id ? updated : item)
      );
    } catch (error) {
      alert(error.message);
    }
  }

  const handleTaskCreated = (createdTask) => {
    setTasks((prevTasks) => [createdTask, ...prevTasks]);
  };


  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                tasks={tasks}
                loading={loading}
                onToggle={toggleTask}
              />
            }
          />

         <Route path="/tasks" element={<Tasks />} />

          <Route
            path="/tasks/new"
            element={<AddTask onTaskCreated={handleTaskCreated} />}
          />

          <Route path="/recent" element={<Recent />} />

          <Route path="/tasks/edit/:id" element={<EditTask />} />

          <Route path="/about" element={<About />} />
        </Routes>

         <Footer />
         
      </div>
    </BrowserRouter>
  );
}

export default App;
