import updateTodo from "../../../controllers/todo/updateTodo.js";
import updateTodoDB from "../../../databases/Todo/updateTodoDB.js";

jest.mock("../../../databases/Todo/updateTodoDB.js");

let req, res, next;

beforeEach(() => {
  req = {
    userId: "userId",
    body: {
      id: "todoId",
      title: "task 1",
      description: "description 1",
      dueDate: "currentDate",
    },
  };

  res = {
    json: jest.fn(),
  };

  next = jest.fn();
});

// NOTE: UPDATE TODO SUCCESSFULLY
it("update todo successfully", async () => {
  const obj = {
    title: "task 1",
    description: "description 1",
    dueDate: "currentDate",
  };

  const mockTodo = {
    _id: "todoId",
    title: "task 1",
  };

  updateTodoDB.mockResolvedValue(mockTodo);

  await updateTodo(req, res, next);

  expect(res.json).toHaveBeenCalledWith({
    message: "Todo update successfully",
    data: mockTodo,
  });

  expect(updateTodoDB).toHaveBeenCalledWith("todoId", obj);
});

// NOTE: FAILED UPDATE TODO, REQ.BODY IS EMPTY
it("failed update todo, req.body is empty", async () => {
  req.body = {};
  await updateTodo(req, res, next);

  expect(next).toHaveBeenCalledWith(
    expect.objectContaining({
      message: "All fields are required",
    })
  );
});

// NOTE: FAILED UPDATE TODO, ERROR IN DB
it("failed update todo, error in db", async () => {
  updateTodoDB.mockResolvedValue(null);

  await updateTodo(req, res, next);

  expect(next).toHaveBeenCalledWith(
    expect.objectContaining({
      message: "Issue is updating Todo. Please try later",
    })
  );
});
