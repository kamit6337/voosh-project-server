import getAllTodoDB from "../../databases/Todo/getAllTodoDB.js";
import catchAsyncError from "../../utils/catchAsyncError.js";

const getAllTodos = catchAsyncError(async (req, res, next) => {
  const userId = req.userId;

  const todos = await getAllTodoDB(userId);

  res.json({
    message: "All todos",
    data: todos,
  });
});

export default getAllTodos;
