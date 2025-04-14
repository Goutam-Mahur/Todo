import { useState } from "react";
import { createTask } from "../utils/api";

export default function AddModal({ close, refresh }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    setSubmitted(true);
    if (!title || !description || !dueDate || !category) {
      return;
    }
    await createTask({ title, description, dueDate, category });
    refresh();
    close();
  };

  return (
    <div className="fixed inset-0 bg-white/10 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-gray-900 text-slate-100 p-6 rounded-lg w-[90%] max-w-md">
        <h3 className="text-center tracking-tight pb-4 font-bold text-xl">
          Add Task
        </h3>
        {submitted && !title && (
          <p className="text-sm text-gray-400">Please fill this field</p>
        )}
        <input
          className="border p-2 mb-4 w-full bg-gray-900 text-slate-100 rounded border-neutral-500"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {submitted && !description && (
          <p className="text-sm text-gray-400">Please fill this field</p>
        )}
        <textarea
          className="border p-2 mb-4 w-full bg-gray-900 text-slate-100 rounded focus:border-[#646cff] border-neutral-500"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        {submitted && !dueDate && (
          <p className="text-sm text-gray-400">Please select a due date</p>
        )}
        <input
          className="border p-2 mb-4 w-full bg-gray-900 text-slate-200 rounded focus:border-[#646cff] border-neutral-500"
          type="date"
          value={dueDate}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => setDueDate(e.target.value)}
          onFocus={(e) => e.target.showPicker()}
          required
        />

        {submitted && !category && (
          <p className="text-sm text-gray-400">Please select a category</p>
        )}
        <select
          className="border p-2 mb-4 w-full bg-gray-900 text-slate-200 rounded focus:border-[#646cff] border-neutral-500"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select category</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="learning">Learning</option>
          <option value="Others">Others</option>
        </select>

        <div className="flex gap-4 justify-end">
          <button
            className="border px-4 py-2 focus:border-[#646cff] border-neutral-500"
            onClick={handleSubmit}
          >
            Save
          </button>
          <button
            className="border px-4 py-2 focus:border-[#646cff] border-neutral-500"
            onClick={close}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
