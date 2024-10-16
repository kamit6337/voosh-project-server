import HandleGlobalError from "../../../utils/HandleGlobalError.js";
import catchAsyncError from "../../../utils/catchAsyncError.js";
import Req from "../../../utils/Req.js";
import { decrypt } from "../../../utils/encryption/encryptAndDecrypt.js";
import getUserById from "../../../databases/User/getUserById.js";

const loginCheck = catchAsyncError(async (req, res, next) => {
  const { _use } = Req(req);

  if (!_use) {
    throw new Error("Your do not have active session. Please Login");
  }

  const decoded = decrypt(_use);

  const findUser = await getUserById(decoded.id);

  if (!findUser) {
    return next(
      new HandleGlobalError("Unauthorised Access. Please Login Again.", 400)
    );
  }

  // MARK: CHECK UPDATED-AT WHEN PASSWORD UPDATE, SO LOGIN AGAIN IF PASSWORD RESET
  const updatedAtInMilli = new Date(findUser.updatedAt).getTime();

  if (decoded.iat + 5000 <= updatedAtInMilli) {
    return next(new HandleGlobalError("Please login again...", 403));
  }

  res.json({
    message: "User is present",
    _id: findUser._id,
    firstname: findUser.firstname,
    lastname: findUser.lastname,
    photo: findUser.photo,
    email: findUser.email,
    role: findUser.role,
  });
});

export default loginCheck;
