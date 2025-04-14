import { useState } from "react";
import { changePassword } from "../utils/api";
import { X } from "lucide-react";
const ChangePasswordModal = ({ onClose }) => {
  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPwd.length < 8) {
      return setError("New password must be at least 8 characters");
    }
    if (oldPwd === newPwd) {
      return setError("New password must be different from old password");
    }

    try {
      const res = await changePassword({
        oldPassword: oldPwd,
        newPassword: newPwd,
      });
      setSuccess("Password updated successfully");
      setOldPwd("");
      setNewPwd("");
    } catch (err) {
      setError(err.message || "Password update failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-white/10 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-gray-900 text-slate-100 p-6 rounded-xl w-full max-w-sm relative">
        <button className="absolute top-3 right-3" onClick={onClose}>
          <X />
        </button>
        <h2 className="text-xl font-bold mb-4">Change Password</h2>
        {error && <p className="text-red-400 text-sm mb-2">{error}</p>}
        {success && <p className="text-green-400 text-sm mb-2">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Old Password</label>
            <input
              type="password"
              value={oldPwd}
              onChange={(e) => setOldPwd(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">New Password</label>
            <input
              type="password"
              value={newPwd}
              onChange={(e) => setNewPwd(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-3 font-semibold bg-gray-950"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
