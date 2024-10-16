import createTodo from "../../../controllers/todo/createTodo.js";
import createTodoDB from "../../../databases/Todo/createTodoDB.js";

jest.mock("../../../databases/Todo/createTodoDB.js");

let req, res, next;

beforeEach(() => {
  req = {
    userId: "userId",
    body: {
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

// NOTE: TODO CREATED SUCCESSFULLY
it("todo created successfully", async () => {
  const obj = {
    user: "userId",
    title: "task 1",
    description: "description 1",
    dueDate: "currentDate",
  };

  const mockTodo = {
    _id: "todoId",
    title: "task 1",
    description: "description 1",
    dueDate: "currentDate",
  };

  createTodoDB.mockResolvedValue(mockTodo);

  await createTodo(req, res, next);

  expect(res.json).toHaveBeenCalledWith({
    message: "Todo is created",
    data: mockTodo,
  });

  expect(createTodoDB).toHaveBeenCalledWith(obj);
});

// NOTE: FAILED CREATE TODO : REQ.BODY IS EMPTY
it("failed create todo, req.body is empty", async () => {
  req.body = {};

  await createTodo(req, res, next);

  expect(next).toHaveBeenCalledWith(
    expect.objectContaining({
      message: "All fields is not provided",
    })
  );
});

// NOTE: FAILED CREATE TODO : TODO NOT CREATED IN DB
it("failed create todo, todo not created in DB", async () => {
  createTodoDB.mockResolvedValue(null);

  await createTodo(req, res, next);

  expect(next).toHaveBeenCalledWith(
    expect.objectContaining({
      message: "Issue in creating todo",
    })
  );
});
