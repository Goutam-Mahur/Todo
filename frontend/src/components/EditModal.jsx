import { createPortal } from "react-dom";
import { useState } from "react";
import { updateTask } from "../utils/api";

export default function EditModal({ task, close, refresh }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate.split("T")[0]);
  const [category, setCategory] = useState(task.category);
  const [submitted, setSubmitted] = useState(false);

  const handleUpdate = async () => {
    setSubmitted(true);
    if (!title || !description || !dueDate || !category) return;

    await updateTask(task._id, { title, description, dueDate, category });
    refresh();
    close();
  };

  const modal = (
    <div className="fixed inset-0 bg-white/10 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-gray-900 text-slate-100 p-6 rounded-lg w-[90%] max-w-md">
        <h3 className="text-center tracking-tight pb-4 font-bold text-xl">
          Edit Task
        </h3>

        {submitted && !title && (
          <p className="text-sm text-gray-400">Please fill this field</p>
        )}
        <input
          className="border p-2 mb-4 w-full bg-gray-900 text-slate-100 rounded border-neutral-500 focus:border-[#646cff]"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {submitted && !description && (
          <p className="text-sm text-gray-400">Please fill this field</p>
        )}
        <textarea
          className="border p-2 mb-4 w-full bg-gray-900 text-slate-100 rounded border-neutral-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        {submitted && !dueDate && (
          <p className="text-sm text-gray-400">Please select a due date</p>
        )}
        <input
          className="border p-2 mb-4 w-full bg-gray-900 text-slate-100 rounded border-neutral-500"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          onFocus={(e) => e.target.showPicker()}
          required
        />

        {submitted && !category && (
          <p className="text-sm text-gray-400">Please select a category</p>
        )}
        <select
          className="border p-2 mb-4 w-full bg-gray-900 text-slate-100 rounded border-neutral-500"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select category</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="learning">Learning</option>
          <option value="others">Others</option>
        </select>

        <div className="flex gap-4 justify-end">
          <button
            className="border  px-4 py-2 border-neutral-500"
            onClick={handleUpdate}
          >
            Update
          </button>
          <button
            className="border px-4 py-2 border-neutral-500"
            onClick={close}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
