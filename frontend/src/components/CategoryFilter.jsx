export default function CategoryFilter({ setFilter }) {
  return (
    <select
      className="grow sm:grow-0 border p-3 rounded border-neutral-500 outline-none focus:border-[#646cff] bg-transparent text-white"
      onChange={(e) => {
        const val = e.target.value;
        setFilter(val === "all" ? "" : val);
      }}
    >
      <option value="all" className="bg-neutral-800">
        All
      </option>
      <option value="work" className="bg-neutral-800">
        Work
      </option>
      <option value="personal" className="bg-neutral-800">
        Personal
      </option>
      <option value="learning" className="bg-neutral-800">
        Learning
      </option>
      <option value="others" className="bg-neutral-800">
        Others
      </option>
    </select>
  );
}
