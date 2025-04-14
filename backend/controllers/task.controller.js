const Task = require("../models/task.model");

exports.addTask = async (req, res) => {
  const { title, description, dueDate, category } = req.body;

  try {
    const newTask = new Task({
      title,
      description,
      dueDate,
      category,
      user: req.userInfo.userId,
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.userInfo.userId }); // Filter tasks by logged-in user
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, category, completed } = req.body;

  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
        error: "Task does not exist",
      });
    }

    if (task.user.toString() !== req.userInfo.userId.toString()) {
      return res.status(400).json({
        success: false,
        message: "Unauthorized access",
        error: "You are not the owner of this task",
      });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;
    task.category = category || task.category;
    task.completed = completed !== undefined ? completed : task.completed;

    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
        error: "Task does not exist",
      });
    }

    if (task.user.toString() !== req.userInfo.userId.toString()) {
      return res.status(400).json({
        success: false,
        message: "Unauthorized access",
        error: "You are not the owner of this task",
      });
    }

    await task.deleteOne();
    res.json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};

exports.searchTasks = async (req, res) => {
  const { query } = req.query;

  try {
    const tasks = await Task.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
      user: req.userInfo.userId, // Filter by logged-in user
    });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};

exports.filterTasksByCategory = async (req, res) => {
  const { category } = req.query;

  try {
    const tasks = await Task.find({
      category,
      user: req.userInfo.userId, // Filter by logged-in user
    });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};
