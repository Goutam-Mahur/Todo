import { useState } from "react";
import EditModal from "./EditModal";
import { updateTask, deleteTask } from "../utils/api";

export default function Task({ task, refresh }) {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteTask(task._id);
      refresh();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleComplete = async () => {
    try {
      const updatedTask = { ...task, completed: !task.completed };
      await updateTask(task._id, updatedTask);
      refresh();
    } catch (error) {
      console.error("Error updating task completion status:", error);
    }
  };

  return (
    <div
      className={`border rounded-lg p-4 bg-gray-900 text-slate-100 flex items-center gap-4 transition-all duration-600 ease-in-out ${
        task.completed
          ? "opacity-60 translate-y-8"
          : "opacity-100 translate-y-0"
      }`}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleComplete}
        className="form-checkbox accent-neutral-800 w-6 h-6"
      />

      <div className="flex-1 flex flex-col gap-1">
        <h3
          className={`text-lg font-semibold ${
            task.completed ? "line-through italic text-neutral-500" : ""
          }`}
        >
          {task.title}
        </h3>
        <p
          className={`text-sm text-neutral-200 ${
            task.completed ? "line-through italic text-neutral-500" : ""
          }`}
        >
          {task.description}
        </p>
        <p
          className={`text-xs text-neutral-300 ${
            task.completed ? "line-through italic text-neutral-500" : ""
          }`}
        >
          Due Date: {new Date(task.dueDate).toLocaleDateString()}
        </p>
        <p
          className={`text-xs text-neutral-400 ${
            task.completed ? "line-through italic text-neutral-500" : ""
          }`}
        >
          Category: {task.category}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={() => setOpen(true)}
          className="text-sm text-blue-500 border  border-blue-500 px-4 py-2"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="text-sm text-red-400 border border-red-400 px-4 py-2"
        >
          Delete
        </button>
      </div>

      {open && (
        <EditModal task={task} close={() => setOpen(false)} refresh={refresh} />
      )}
    </div>
  );
}
