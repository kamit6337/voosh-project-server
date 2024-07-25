import express from "express";
import getAllTodos from "../controllers/todo/getAllTodos.js";
import createTodo from "../controllers/todo/createTodo.js";
import updateTodo from "../controllers/todo/updateTodo.js";
import deleteTodo from "../controllers/todo/deleteTodo.js";
import updateTodoStatus from "../controllers/todo/updateTodoStatus.js";

const router = express.Router();

router
  .route("/")
  .get(getAllTodos)
  .post(createTodo)
  .patch(updateTodo)
  .delete(deleteTodo);

router.patch("/status", updateTodoStatus);

export default router;
