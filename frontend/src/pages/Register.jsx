import { useState } from "react";
import { useNavigate } from "react-router";
import { register, signin } from "../utils/api";

const Register = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setErrMsg("");

    const errors = validate();
    if (Object.keys(errors).length > 0) return;

    try {
      const authFn = isRegister ? register : signin;
      const res = await authFn(
        isRegister ? { username, email, password } : { email, password }
      );
      localStorage.setItem("token", res.accessToken);
      navigate("/home");
    } catch (err) {
      if (Array.isArray(err.error) && err.error[0]?.message) {
        setErrMsg(err.error[0].message);
      } else {
        setErrMsg(err.message || "Auth error");
      }
    }
  };

  const validate = () => {
    const errors = {};
    if (isRegister) {
      if (!username.trim()) errors.username = "Username is required";
      else if (username.length < 3) errors.username = "Minimum 3 characters";
      else if (username.length > 30) errors.username = "Max 30 characters";
    }

    if (!email.trim()) errors.email = "Email is required";
    else if (email.length < 5) errors.email = "Minimum 5 characters";
    else if (email.length > 50) errors.email = "Max 50 characters";

    if (!password) errors.password = "Password is required";
    else if (password.length < 4) errors.password = "Minimum 4 characters";
    else if (password.length > 100) errors.password = "Max 100 characters";

    return errors;
  };

  const errors = isSubmitted ? validate() : {};

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen w-[90%] m-auto bg-gray-900 text-slate-200">
        <h1 className="text-center font-extrabold text-4xl tracking-tight pb-5">
          Todo App
        </h1>
        <form
          className="bg-gray-800 p-6 rounded-xl shadow-md space-y-4 w-full max-w-sm"
          onSubmit={handleSubmit}
        >
          <h2 className="text-xl font-bold text-center">
            {isRegister ? "Register" : "Login"}
          </h2>
          {errMsg && <p className="text-red-400 text-sm">{errMsg}</p>}

          <div>
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded outline-none ring-0 focus:border-[#646cff]"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {isRegister && (
            <div>
              <label htmlFor="username" className="block mb-1">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded outline-none ring-0 focus:border-[#646cff]"
                placeholder="Choose a username"
              />
              {errors.username && (
                <p className="text-red-400 text-xs mt-1">{errors.username}</p>
              )}
            </div>
          )}

          <div>
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded outline-none ring-0 focus:border-[#646cff]"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold bg-gray-900"
          >
            {isRegister ? "Register" : "Login"}
          </button>

          <p
            onClick={() => {
              setIsRegister(!isRegister);
              setIsSubmitted(false);
              setErrMsg("");
            }}
            className="text-sm text-center text-blue-400 hover:underline cursor-pointer"
          >
            {isRegister
              ? "Already have an account? Sign In"
              : "New here? Register"}
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
