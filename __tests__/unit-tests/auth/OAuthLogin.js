import OAuthLogin from "../../../controllers/auth/OAuth-login/OAuthLogin.js";
import getUserByEmail from "../../../databases/User/getUserByEmail.js";
import postCreateUser from "../../../databases/User/postCreateUser.js";
import cookieOptions from "../../../utils/cookieOptions.js";
import { encrypt } from "../../../utils/encryption/encryptAndDecrypt.js";
import { environment } from "../../../utils/environment.js";

jest.mock("../../../databases/User/getUserByEmail.js");
jest.mock("../../../databases/User/postCreateUser.js");
jest.mock("../../../utils/encryption/encryptAndDecrypt.js");

let req, res, next;

beforeEach(() => {
  req = {
    user: {
      id: "userId",
      provider: "google",
      _json: {
        name: "user",
        email: "user@gmail.com",
        picture: "https://userProfilePic.png",
      },
    },
  };

  res = {
    status: jest.fn(),
    json: jest.fn(() => res),
    cookie: jest.fn(),
    redirect: jest.fn(),
  };

  next = jest.fn();
});

// NOTE: USER LOGGED IN WHEN CREATED PREVIOUSLY
it("OAuth-login, user logged in when create previously successsfully", async () => {
  getUserByEmail.mockResolvedValue({
    _id: "userId",
    role: "user",
  });

  encrypt.mockReturnValue("encryptedToken");

  await OAuthLogin(req, res, next);

  expect(res.cookie).toHaveBeenCalledWith(
    "_use",
    "encryptedToken",
    cookieOptions
  );

  expect(res.redirect).toHaveBeenCalledWith(environment.CLIENT_URL);
});

// NOTE: USER LOGGED IN WITH CREATED
it("OAuth-login, user logged in with create user successsfully", async () => {
  getUserByEmail.mockResolvedValue(null);

  postCreateUser.mockResolvedValue({
    _id: "userId",
    role: "user",
  });

  encrypt.mockReturnValue("encryptedToken");

  await OAuthLogin(req, res, next);

  expect(res.cookie).toHaveBeenCalledWith(
    "_use",
    "encryptedToken",
    cookieOptions
  );

  expect(res.redirect).toHaveBeenCalledWith(`${environment.CLIENT_URL}`);
});

// NOTE: FAILED DUE TO EMPTY REQ.USER
it("failed, due to empty req.user", async () => {
  req = {};

  await OAuthLogin(req, res, next);

  expect(next).toHaveBeenCalledWith(
    expect.objectContaining({
      message: "Error in login. Please try again!",
    })
  );
});

// NOTE: FAILED DUE TO USER NOT CREATED SUCCESSFULLY
it("failed, due to user not created successfully", async () => {
  getUserByEmail.mockResolvedValue(null);

  postCreateUser.mockResolvedValue(null);

  await OAuthLogin(req, res, next);

  expect(next).toHaveBeenCalledWith(
    expect.objectContaining({
      message: "Issue in Signup",
    })
  );
});
