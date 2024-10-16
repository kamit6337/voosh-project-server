import { Schema, model } from "mongoose";

const todoSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Title must be provided"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description must be provided"],
      trim: true,
    },
    dueDate: {
      type: Date,
      required: [true, "Please provide Due Date"],
    },
    status: {
      type: String,
      enum: ["pending", "progress", "done"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Todo = model("Todo", todoSchema);

export default Todo;
