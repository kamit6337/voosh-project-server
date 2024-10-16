import updateTodoDB from "../../databases/Todo/updateTodoDB.js";
import catchAsyncError from "../../utils/catchAsyncError.js";
import HandleGlobalError from "../../utils/HandleGlobalError.js";

const updateTodoStatus = catchAsyncError(async (req, res, next) => {
  const { id, status } = req.body;

  if (!id || !status) {
    return next(new HandleGlobalError("All fields are required", 404));
  }

  const obj = {
    status,
  };

  const todo = await updateTodoDB(id, obj);

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
