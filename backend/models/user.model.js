const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      unique: [true, "username already exists"],
      minlength: [3, "username should have atleast 3 chars - mongo"],
      maxlength: [30, "username can only have 30 chars - mongo"],
      required: [true, "username is required - mongo"],
      lowercase: true,
    },
    email: {
      type: String,
      trim: true,
      unique: [true, "email already exists"],
      minlength: [5, "email should have atleast 5 chars - mongo"],
      maxlength: [50, "email can only have 50 chars - mongo"],
      required: [true, "email is required -mongo"],
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: [4, "password should have atleast 4 chars - mongo"],
      maxlength: [100, "password can only have upto 20 chars - mongo"],
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
