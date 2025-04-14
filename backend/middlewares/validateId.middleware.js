const mongoose = require("mongoose");

const validateId = (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false, // ← fix here
      message: "invalid id format",
    });
  }

  next();
};

module.exports = validateId;
