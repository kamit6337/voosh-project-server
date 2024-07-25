import Todo from "../../models/TodoModel.js";
import catchAsyncError from "../../utils/catchAsyncError.js";
import HandleGlobalError from "../../utils/HandleGlobalError.js";

const createTodo = catchAsyncError(async (req, res, next) => {
  const userId = req.userId;

  const { title, description } = req.body;

  if (!title || !description) {
    return next(new HandleGlobalError("All fields is not provided", 404));
  }

  const todo = await Todo.create({
    user: userId,
    title,
    description,
  });

  if (!todo) {
    return next(new HandleGlobalError("Issue in creating todo", 404));
  }

  res.json({
    message: "Todo is created",
    data: todo,
  });
});

export default createTodo;
