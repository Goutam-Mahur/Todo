const express = require("express");

const {
  registerUser,
  loginUser,
  changePassword,
} = require("../controllers/auth.controller");
const {
  registerSchema,
  loginSchema,
  changePasswordSchema,
} = require("../validations/auth.validations");
const validateRequest = require("../middlewares/validateRequest.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/register", validateRequest(registerSchema), registerUser);
router.post("/signin", validateRequest(loginSchema), loginUser);
router.post(
  "/change-password",
  validateRequest(changePasswordSchema),
  authMiddleware,
  changePassword
);

module.exports = router;
