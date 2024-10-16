import getAllTodos from "../../../controllers/todo/getAllTodos.js";
import getAllTodoDB from "../../../databases/Todo/getAllTodoDB.js";

jest.mock("../../../databases/Todo/getAllTodoDB.js");

let req, res, next;

beforeEach(() => {
  req = {
    userId: "userId",
  };

  res = {
    json: jest.fn(),
  };

  next = jest.fn();
});

// NOTE: GET ALL TODOS SUCCESSFULLY
it("get all todos successfully", async () => {
  const mockTodos = [
    {
      _id: "todoId",
      title: "task 1",
    },
  ];

  getAllTodoDB.mockResolvedValue(mockTodos);

  await getAllTodos(req, res, next);

  expect(res.json).toHaveBeenCalledWith({
    message: "All todos",
    data: mockTodos,
  });

  expect(getAllTodoDB).toHaveBeenCalledWith("userId");
});
