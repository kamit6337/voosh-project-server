import createTodoDB from "../../databases/Todo/createTodoDB.js";
import catchAsyncError from "../../utils/catchAsyncError.js";
import HandleGlobalError from "../../utils/HandleGlobalError.js";

const createTodo = catchAsyncError(async (req, res, next) => {
  const userId = req.userId;

  const { title, description, dueDate } = req.body;

  if (!title || !description || !dueDate) {
    return next(new HandleGlobalError("All fields is not provided", 404));
  }

  const obj = {
    user: userId,
    title,
    description,
    dueDate,
  };

  const todo = await createTodoDB(obj);

  if (!todo) {
    return next(new HandleGlobalError("Issue in creating todo", 404));
  }

  res.json({
    message: "Todo is created",
    data: todo,
  });
});

export default createTodo;
