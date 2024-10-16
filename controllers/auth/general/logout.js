import cookieOptions from "../../../utils/cookieOptions.js";

const logout = (req, res) => {
  res.clearCookie("_use", cookieOptions);

  res.status(200).json({
    message: "Successfully Logout",
  });
};

export default logout;
