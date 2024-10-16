import deleteTodo from "../../../controllers/todo/deleteTodo.js";
import deleteTodoDB from "../../../databases/Todo/deleteTodoDB.js";

jest.mock("../../../databases/Todo/deleteTodoDB.js");

let req, res, next;

beforeEach(() => {
  req = {
    userId: "userId",
    query: {
      id: "todoId",
    },
  };

  res = {
    json: jest.fn(),
  };

  next = jest.fn();
});

// NOTE: TODO DELETED SUCCESSFULLY
it("todo deleted successfully", async () => {
  await deleteTodo(req, res, next);

  expect(res.json).toHaveBeenCalledWith({
    message: "Deleted successfully",
  });

  expect(deleteTodoDB).toHaveBeenCalledWith("todoId");
});

// NOTE: TODO DELETE FAILED
it("todo delete failed", async () => {
  req.query = {};

  await deleteTodo(req, res, next);

  expect(next).toHaveBeenCalledWith(
    expect.objectContaining({
      message: "Id must be provided",
    })
  );
});
