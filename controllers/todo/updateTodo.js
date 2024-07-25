import Todo from "../../models/TodoModel.js";
import catchAsyncError from "../../utils/catchAsyncError.js";
import HandleGlobalError from "../../utils/HandleGlobalError.js";

const updateTodo = catchAsyncError(async (req, res, next) => {
  const { id, title, description } = req.body;

  if (!id || !title || !description) {
    return next(new HandleGlobalError("All fields are required", 404));
  }

  const todo = await Todo.findOneAndUpdate(
    {
      _id: id,
    },
    {
      title,
      description,
    },
    {
      new: true,
      runValidators: true,
    }
  );

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
