import verifySignup from "../../../controllers/auth/signup/verifySignup.js";
import postCreateUser from "../../../databases/User/postCreateUser.js";
import cookieOptions from "../../../utils/cookieOptions.js";
import {
  decrypt,
  encrypt,
} from "../../../utils/encryption/encryptAndDecrypt.js";
import Req from "../../../utils/Req.js";

jest.mock("../../../utils/Req.js");
jest.mock("../../../databases/User/postCreateUser.js");
jest.mock("../../../utils/encryption/encryptAndDecrypt.js");

let req, res, next;

beforeEach(() => {
  req = {
    body: {
      otp: "895689",
    },
  };

  res = {
    status: jest.fn(() => res),
    json: jest.fn(),
    cookie: jest.fn(),
    clearCookie: jest.fn(),
    redirect: jest.fn(),
  };

  next = jest.fn();
});

// NOTE: USER SIGNED UP SUCCESSFULLY
it("user signup successfully", async () => {
  Req.mockReturnValue({
    _sig: "ReqCookie",
  });

  decrypt.mockReturnValue({
    otp: 895689,
    name: "user",
    email: "user@gmail.com",
    password: "user1234",
  });

  postCreateUser.mockResolvedValue({
    _id: "userId",
    role: "user",
  });

  encrypt.mockReturnValue("encryptedData");

  await verifySignup(req, res, next);

  expect(res.clearCookie).toHaveBeenCalledWith("_sig", cookieOptions);

  // Ensure the cookie is set with the correct token
  expect(res.cookie).toHaveBeenCalledWith(
    "_use",
    "encryptedData",
    cookieOptions
  );

  expect(res.json).toHaveBeenCalledWith({
    message: "SignUp Successfully",
  });
});

// NOTE: FAILED, EMPTY REQ.BODY
it("failed, req.body is empty", async () => {
  req.body = {};

  await verifySignup(req, res, next);

  expect(next).toHaveBeenCalledWith(
    expect.objectContaining({
      message: "OTP is not provided. Please provide it",
    })
  );
});

// NOTE: FAILED, REQ IS EMPTY
it("failed, Req is empty", async () => {
  Req.mockReturnValue({});

  await verifySignup(req, res, next);

  expect(next).toHaveBeenCalledWith(
    expect.objectContaining({
      message: "Something went wrong on Sign Up. Please try later",
    })
  );
});

// NOTE: FAILED, OTP DON'T MATCH
it("failed, OTP don't match", async () => {
  Req.mockReturnValue({
    _sig: "ReqCookie",
  });

  decrypt.mockReturnValue({
    otp: 895680,
    name: "user",
    email: "user@gmail.com",
    password: "user1234",
  });

  await verifySignup(req, res, next);

  expect(next).toHaveBeenCalledWith(
    expect.objectContaining({
      message: "OTP is incorrect. Please provide correct OTP",
    })
  );
});

// NOTE: FAILED, USER NOT CREATED
it("failed, user not created", async () => {
  Req.mockReturnValue({
    _sig: "ReqCookie",
  });

  decrypt.mockReturnValue({
    otp: 895689,
    name: "user",
    email: "user@gmail.com",
    password: "user1234",
  });

  postCreateUser.mockResolvedValue(null);

  await verifySignup(req, res, next);

  expect(next).toHaveBeenCalledWith(
    expect.objectContaining({
      message: "Issue in Signup. Please try later",
    })
  );
});
