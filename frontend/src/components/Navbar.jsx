import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import AddModal from "./AddModal";
import ChangePasswordModal from "./ChangePassword";
import { useState } from "react";
import { useNavigate } from "react-router"; // Correct import
import { LogOut } from "lucide-react";

export default function Navbar({ setSearch, setFilter, refresh }) {
  const [openAdd, setOpenAdd] = useState(false);
  const [openChangePwd, setOpenChangePwd] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div className="flex flex-wrap justify-center items-center gap-4 my-8">
      <CategoryFilter setFilter={setFilter} />
      <SearchBar setSearch={setSearch} />
      <button
        className="px-8 py-4 border border-neutral-500 grow sm:grow-0"
        onClick={() => setOpenAdd(true)}
      >
        Add
      </button>
      <button
        className="px-8 py-4 border border-neutral-500 grow sm:grow-0"
        onClick={() => setOpenChangePwd(true)}
      >
        Change Password
      </button>

      <button
        className="p-4 border border-neutral-500 grow sm:grow-0 flex items-center justify-center space-x-2 sm:space-x-0 sm:text-base"
        onClick={handleLogout}
      >
        <span className="sm:hidden">Logout</span>
        <LogOut className="hidden sm:block" />
      </button>

      {openAdd && (
        <AddModal close={() => setOpenAdd(false)} refresh={refresh} />
      )}
      {openChangePwd && (
        <ChangePasswordModal onClose={() => setOpenChangePwd(false)} />
      )}
    </div>
  );
}
