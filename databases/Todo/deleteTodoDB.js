import Todo from "../../models/TodoModel.js";

const deleteTodoDB = async (todoId) => {
  await Todo.deleteOne({
    _id: todoId,
  });
};

export default deleteTodoDB;
