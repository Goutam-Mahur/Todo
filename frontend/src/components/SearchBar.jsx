export default function SearchBar({ setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search"
      className="border p-3 rounded flex-grow border-neutral-500 outline-none ring-0 focus:border-[#646cff]"
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}
