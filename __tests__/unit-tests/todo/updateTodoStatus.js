import updateTodoStatus from "../../../controllers/todo/updateTodoStatus.js";
import updateTodoDB from "../../../databases/Todo/updateTodoDB.js";

jest.mock("../../../databases/Todo/updateTodoDB.js");

let req, res, next;

beforeEach(() => {
  req = {
    userId: "userId",
    body: {
      id: "todoId",
      status: "completed",
    },
  };

  res = {
    json: jest.fn(),
  };

  next = jest.fn();
});

// NOTE: UPDATE TODO STATUS SUCCESSFULLY
it("update todo status successfully", async () => {
  const obj = {
    status: "completed",
  };

  const mockTodo = {
    _id: "todoId",
    title: "task 1",
    status: "completed",
  };

  updateTodoDB.mockResolvedValue(mockTodo);

  await updateTodoStatus(req, res, next);

  expect(res.json).toHaveBeenCalledWith({
    message: "Todo status is updated",
    data: mockTodo,
  });

  expect(updateTodoDB).toHaveBeenCalledWith("todoId", obj);
});

// NOTE: FAILED UPDATE STATUS TODO, REQ.BODY IS EMPTY
it("failed update status todo, req.body is empty", async () => {
  req.body = {};
  await updateTodoStatus(req, res, next);

  expect(next).toHaveBeenCalledWith(
    expect.objectContaining({
      message: "All fields are required",
    })
  );
});

// NOTE: FAILED UPDATE STATUS TODO, ERROR IN DB
it("failed update status todo, error in db", async () => {
  updateTodoDB.mockResolvedValue(null);

  await updateTodoStatus(req, res, next);

  expect(next).toHaveBeenCalledWith(
    expect.objectContaining({
      message: "Issue in updating todo. Please try later",
    })
  );
});
