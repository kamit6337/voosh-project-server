import Todo from "../../models/TodoModel.js";

const createTodoDB = async (obj) => {
  const todo = await Todo.create({
    ...obj,
  });

  return todo;
};

export default createTodoDB;
