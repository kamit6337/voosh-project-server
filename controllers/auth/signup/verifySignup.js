import postCreateUser from "../../../databases/User/postCreateUser.js";
import catchAsyncError from "../../../utils/catchAsyncError.js";
import cookieOptions from "../../../utils/cookieOptions.js";
import {
  decrypt,
  encrypt,
} from "../../../utils/encryption/encryptAndDecrypt.js";
import HandleGlobalError from "../../../utils/HandleGlobalError.js";
import Req from "../../../utils/Req.js";

const verifySignup = catchAsyncError(async (req, res, next) => {
  const { otp: userOtp } = req.body;

  if (!userOtp) {
    return next(
      new HandleGlobalError("OTP is not provided. Please provide it")
    );
  }

  const { _sig } = Req(req);

  if (!_sig) {
    return next(
      new HandleGlobalError("Something went wrong on Sign Up. Please try later")
    );
  }

  const { otp, firstname, lastname, email, password } = decrypt(_sig);

  if (otp !== +userOtp) {
    return next(
      new HandleGlobalError("OTP is incorrect. Please provide correct OTP")
    );
  }

  const profilePicUrl = `https://ui-avatars.com/api/?background=random&name=${firstname}&size=128&bold=true`;

  const obj = {
    firstname,
    lastname,
    email,
    password,
    photo: profilePicUrl,
  };

  const createUser = await postCreateUser(obj);

  if (!createUser) {
    return next(
      new HandleGlobalError("Issue in Signup. Please try later", 404)
    );
  }

  const token = encrypt({
    id: createUser._id,
    role: createUser.role,
  });

  res.clearCookie("_sig", cookieOptions);

  res.cookie("_use", token, cookieOptions);

  res.status(200).json({
    message: "SignUp Successfully",
  });
});

export default verifySignup;
