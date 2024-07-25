import Todo from "../../models/TodoModel.js";
import catchAsyncError from "../../utils/catchAsyncError.js";
import HandleGlobalError from "../../utils/HandleGlobalError.js";

const getAllTodos = catchAsyncError(async (req, res, next) => {
  const userId = req.userId;

  const todos = await Todo.find({
    user: userId,
  })
    .lean()
    .sort("-updatedAt");

  if (todos?.length === 0) {
    return next(
      new HandleGlobalError("Issue in getting todos. Please try later")
    );
  }

  res.json({
    message: "All todos",
    data: todos,
  });
});

export default getAllTodos;
