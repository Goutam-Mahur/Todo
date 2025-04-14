const validateRequest = (schema) => (req, res, next) => {
  const user = req.body;
  const validationResult = schema.safeParse(user);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: "invalid fields of user",
      error: validationResult.error.errors,
    });
  }
  next();
};

module.exports = validateRequest;
