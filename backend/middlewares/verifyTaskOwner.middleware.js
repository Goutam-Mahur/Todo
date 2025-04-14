const Task = require("../models/task.model");

const verifyTaskOwner = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(400).json({
        success: false,
        message: "task not found",
        error: "invalid task ID",
      });
    }

    if (task.user.toString() !== req.userInfo.userId.toString()) {
      return res.status(400).json({
        success: false,
        message: "unauthorized access",
        error: "you do not have permission to modify this task",
      });
    }

    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
      error: err.message,
    });
  }
};

module.exports = verifyTaskOwner;
