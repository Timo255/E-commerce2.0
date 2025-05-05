const { Op } = require("sequelize");
const { user } = require("../../models");
const { handleForgotPassword, resetPassword } = require("../services/useServices");
const { verifyResetToken } = require("../middleware/authToken");

const handleForgotPwd = async (req, res) => {
  const { user: username } = req.body;

  try {
    const foundUser = await user.findOne({
      where: {
        [Op.or]: [{ username }, { email: username }],
      },
    });

    if (!foundUser) {
      return res.sendStatus(401);
    } else {
      // where the reset link is generated and send to the user
      const isHandled = await handleForgotPassword(username);
      if (isHandled) {
        return res
          .status(200)
          .json({ msg: "check your email to reset password" });
      }
    }
  } catch (err) {
    return res.status(500).json("Internal server error");
  }
};

const handleVerifyResetToken = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json("Missing required paramaters");
  } else {
    try {
      const isTokenValid = await verifyResetToken(token);
      if (!isTokenValid) {
        return res.status(400).json("Invalid token");
      } else {
        const existingUser = await user.findOne({
          where: { username: isTokenValid },
        });

        if(existingUser.resetToken !== token){
            return res.status(400).json("Invalid token");
        } else{
            return res.status(200).json("Token is valid")
        }
      }
    } catch (err) {
        return res.status(500).json("Internal server error");
    }
  }
};

const handleResetPwd = async (req, res) => {
    const {resetToken, pwd} = req.body;

    if(!resetToken || ! pwd){
        return res.status(400).json("Missing required paramaters")
    } else {
        try{
          const userName = await verifyResetToken(resetToken);
          if(userName && typeof userName === "string"){
            //reset password
            const isReset = await resetPassword(pwd, userName)
            if(isReset){
              return res.status(200).json("Reset successfully")  
            }
          }else if(!userName){
            return res.status(400).json("Invalid token");
          }  
        }catch(err){
            return res.status(500).json("Internal server error");
        }
    }
}

module.exports = {
  handleForgotPwd,
  handleVerifyResetToken,
  handleResetPwd
};
