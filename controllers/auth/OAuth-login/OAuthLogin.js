import { environment } from "../../../utils/environment.js";
import HandleGlobalError from "../../../utils/HandleGlobalError.js";
import catchAsyncError from "../../../utils/catchAsyncError.js";
import { encrypt } from "../../../utils/encryption/encryptAndDecrypt.js";
import cookieOptions from "../../../utils/cookieOptions.js";
import getUserByEmail from "../../../databases/User/getUserByEmail.js";
import postCreateUser from "../../../databases/User/postCreateUser.js";

// NOTE: LOGIN SUCCESS
const OAuthLogin = catchAsyncError(async (req, res, next) => {
  if (!req.user)
    return next(
      new HandleGlobalError("Error in login. Please try again!", 403)
    );

  const {
    id,
    provider,
    _json: { name, email, picture },
  } = req.user;

  let findUser = await getUserByEmail(email);

  if (!findUser) {
    // MARK: IF NOT FIND USER

    const firstname = name.split(" ")[0];
    const lastname = name.split(" ").at(-1);

    const obj = {
      firstname,
      lastname,
      email,
      photo: picture,
      OAuthId: id,
      OAuthProvider: provider,
    };

    const createUser = await postCreateUser(obj);

    if (!createUser) {
      return next(new HandleGlobalError("Issue in Signup", 404));
    }

    findUser = createUser;
  }

  // MARK: IF FIND USER IS PRESENT
  const token = encrypt({
    id: findUser._id,
    role: findUser.role,
  });

  res.cookie("_use", token, cookieOptions);

  res.redirect(environment.CLIENT_URL);
});

export default OAuthLogin;
