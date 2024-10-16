import updateTodoDB from "../../databases/Todo/updateTodoDB.js";
import catchAsyncError from "../../utils/catchAsyncError.js";
import HandleGlobalError from "../../utils/HandleGlobalError.js";

const updateTodo = catchAsyncError(async (req, res, next) => {
  const { id, title, description, dueDate } = req.body;

  if (!id || !title || !description || !dueDate) {
    return next(new HandleGlobalError("All fields are required", 404));
  }

  const obj = {
    title,
    description,
    dueDate,
  };

  const todo = await updateTodoDB(id, obj);

  if (!todo) {
    return next(
      new HandleGlobalError("Issue is updating Todo. Please try later", 404)
    );
  }

  res.json({
    message: "Todo update successfully",
    data: todo,
  });
});

export default updateTodo;
