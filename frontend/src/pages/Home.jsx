import Navbar from "../components/Navbar";
import TaskList from "../components/TaskList";
import { useEffect, useState } from "react";
import { fetchTasks } from "../utils/api";
import { useNavigate } from "react-router";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  const loadTasks = async () => {
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      navigate("/signin");
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const filtered = tasks.filter(
    (task) =>
      (task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase())) &&
      (filter ? task.category === filter : true)
  );

  return (
    <div className="p-8 m-4">
      <h3 className="text-3xl font-bold tracking-tight text-center pb-4">
        Todo App
      </h3>
      <Navbar setSearch={setSearch} setFilter={setFilter} refresh={loadTasks} />
      <TaskList tasks={filtered} refresh={loadTasks} />
    </div>
  );
}
