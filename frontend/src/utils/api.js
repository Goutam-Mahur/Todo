import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL || "/api";

const getAxios = () =>
  axios.create({
    baseURL: apiUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

// Task operations
export const fetchTasks = async () => {
  try {
    const res = await getAxios().get("/tasks");
    return res.data;
  } catch (err) {
    throw err?.response?.data || { message: "Failed to fetch tasks" };
  }
};

export const createTask = async (taskData) => {
  try {
    const res = await getAxios().post("/tasks", taskData);
    return res.data;
  } catch (err) {
    throw err?.response?.data || { message: "Failed to create task" };
  }
};

export const updateTask = async (id, updatedData) => {
  try {
    const res = await getAxios().put(`/tasks/${id}`, updatedData);
    return res.data;
  } catch (err) {
    throw err?.response?.data || { message: "Failed to update task" };
  }
};

export const deleteTask = async (id) => {
  try {
    await getAxios().delete(`/tasks/${id}`);
  } catch (err) {
    throw err?.response?.data || { message: "Failed to delete task" };
  }
};

export const searchTasks = async (query) => {
  try {
    const res = await getAxios().get("/tasks/search", {
      params: { query },
    });
    return res.data;
  } catch (err) {
    throw err?.response?.data || { message: "Search failed" };
  }
};

export const filterTasksByCategory = async (category) => {
  try {
    const res = await getAxios().get("/tasks/filter", {
      params: { category },
    });
    return res.data;
  } catch (err) {
    throw err?.response?.data || { message: "Filter failed" };
  }
};

// Auth
export const register = async (userData) => {
  try {
    const res = await getAxios().post("/auth/register", userData);
    return res.data;
  } catch (err) {
    throw err?.response?.data || { message: "Registration failed" };
  }
};

export const signin = async (credentials) => {
  try {
    const res = await getAxios().post("/auth/signin", credentials);
    return res.data;
  } catch (err) {
    throw err?.response?.data || { message: "Login failed" };
  }
};

export const changePassword = async ({ oldPassword, newPassword }) => {
  try {
    const res = await getAxios().post("/auth/change-password", {
      oldPassword,
      newPassword,
    });
    return res.data;
  } catch (err) {
    throw err?.response?.data || { message: "Password change failed" };
  }
};

// Utility
export const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
