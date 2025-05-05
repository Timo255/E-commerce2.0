const { user } = require("../../models");
const bcrpt = require("bcrypt");
const { generateResetToken } = require("../middleware/authToken");
const { Op } = require("sequelize");
const { EmailSender } = require("./sendEmail");

const handleForgotPassword = async (username) => {
  try {
    const foundUser = await user.findOne({
      where: {
        [Op.or]: [{ username }, { email: username }],
      },
    });

    // create a reset token
    const resetToken = generateResetToken(foundUser);

    // inserting resetToken in the database
    foundUser.resetToken = resetToken;
    await foundUser.save();

    // create a reset link to send to the user
    const link = `http://localhost:5173/reset-pwd?resetToken=${resetToken}`;
    await EmailSender(link, foundUser.email);

    return true;
  } catch (err) {
    console.log(err);
  }
};

const resetPassword = async (newPwd, userName) => {
  try {
    const foundUser = await user.findOne({ where: { username: userName } });
    const hashedPwd = await bcrpt.hash(newPwd, 10);
    foundUser.password = hashedPwd;
    foundUser.resetToken = "";
    await foundUser.save();
    return true;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  handleForgotPassword,
  resetPassword,
};
