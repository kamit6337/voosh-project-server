import getUserByEmail from "../../../databases/User/getUserByEmail.js";
import HandleGlobalError from "../../../utils/HandleGlobalError.js";
import catchAsyncError from "../../../utils/catchAsyncError.js";
import cookieOptions from "../../../utils/cookieOptions.js";
import sendingEmail from "../../../utils/email/email.js";
import otpTemplate from "../../../utils/email/otpTemplate.js";
import { encrypt } from "../../../utils/encryption/encryptAndDecrypt.js";
import generate8digitOTP from "../../../utils/javaScript/generate8digitOTP.js";

const signup = catchAsyncError(async (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;

  if (!firstname || !lastname || !email || !password) {
    return next(new HandleGlobalError("Not provided all field", 404));
  }

  // MARK: CHECK USER IS ALREADY PRESENT OR NOT
  const findUser = await getUserByEmail(email);

  if (findUser) {
    return next(
      new HandleGlobalError(
        "You have already signed up with this Email ID. Please login or signup with different Email ID"
      )
    );
  }

  const otp = generate8digitOTP();

  const html = otpTemplate(otp);

  await sendingEmail(email, "OTP for verification", html);

  const token = encrypt({
    otp,
    firstname,
    lastname,
    email,
    password,
  });

  res.cookie("_sig", token, cookieOptions);

  res.json({
    message: "Successfully Send OTP to Email",
  });
});

export default signup;
