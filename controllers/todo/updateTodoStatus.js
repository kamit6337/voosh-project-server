import Todo from "../../models/TodoModel.js";
import catchAsyncError from "../../utils/catchAsyncError.js";
import HandleGlobalError from "../../utils/HandleGlobalError.js";

const updateTodoStatus = catchAsyncError(async (req, res, next) => {
  const { id, status } = req.body;

  if (!id || !status) {
    return next(new HandleGlobalError("All fields data is not prvided", 404));
  }

  const todo = await Todo.findOneAndUpdate(
    {
      _id: id,
    },
    {
      status,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!todo) {
    return next(
      new HandleGlobalError("Issue in updating todo. Please try later")
    );
  }

  res.json({
    message: "Todo status is updated",
    data: todo,
  });
});

export default updateTodoStatus;
