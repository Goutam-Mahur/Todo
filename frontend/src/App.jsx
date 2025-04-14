import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signin");
      return;
    }
    navigate("/home");
  }, [navigate]);

  return null;
}
