const express = require("express");
const router = express.Router();

const {
  addTask,
  getAllTasks,
  updateTask,
  deleteTask,
  searchTasks,
  filterTasksByCategory,
} = require("../controllers/task.controller");

const {
  createTaskSchema,
  updateTaskSchema,
} = require("../validations/tasks.validation");

const validateRequest = require("../middlewares/validateRequest.middleware");
const authMiddleware = require("../middlewares/auth.middleware");
const verifyTaskOwner = require("../middlewares/verifyTaskOwner.middleware");
const validateId = require("../middlewares/validateId.middleware");

router.use(authMiddleware);

router.get("/", getAllTasks);
router.post("/", validateRequest(createTaskSchema), addTask);
router.put(
  "/:id",
  validateId,
  verifyTaskOwner,
  validateRequest(updateTaskSchema),
  updateTask
);
router.delete("/:id", validateId, verifyTaskOwner, deleteTask);

router.get("/search", searchTasks);
router.get("/filter", filterTasksByCategory);

module.exports = router;
