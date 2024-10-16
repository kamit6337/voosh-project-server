import Todo from "../../models/TodoModel.js";

const getAllTodoDB = async (userId) => {
  const todos = await Todo.find({
    user: userId,
  })
    .lean()
    .sort("-updatedAt");

  return todos;
};

export default getAllTodoDB;
