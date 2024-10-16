import Todo from "../../models/TodoModel.js";

const updateTodoDB = async (todoId, obj) => {
  const todo = await Todo.findOneAndUpdate(
    {
      _id: todoId,
    },
    {
      ...obj,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  return todo;
};

export default updateTodoDB;
