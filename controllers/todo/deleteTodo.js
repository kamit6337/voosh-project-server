import deleteTodoDB from "../../databases/Todo/deleteTodoDB.js";
import catchAsyncError from "../../utils/catchAsyncError.js";
import HandleGlobalError from "../../utils/HandleGlobalError.js";

const deleteTodo = catchAsyncError(async (req, res, next) => {
  const { id } = req.query;

  if (!id) {
    return next(new HandleGlobalError("Id must be provided", 404));
  }

  await deleteTodoDB(id);

  res.json({
    message: "Deleted successfully",
  });
});

export default deleteTodo;
