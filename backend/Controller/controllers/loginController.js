const bcrpt = require("bcrypt");
const { user } = require("../../models");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");


const loginUser = async (req, res) => {
  const { user: username, pwd } = req.body;

  if (!username || !pwd)
    return res.json(400).json({ message: "Username and password required" });

  const foundUser = await user.findOne({
    where: { [Op.or]: [{ username: username }, { email: username }] },
  });

  if (!foundUser) return res.status(401);

  try {
    await bcrpt.compare(pwd, foundUser.password);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          uuid: foundUser.uuid,
          userId: foundUser.id
        },
      },
       process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10s" }
    );
    const refreshToken = jwt.sign(
      {
        username: foundUser.username,
        uuid: foundUser.uuid,
        userId: foundUser.id
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // Saving refreshToken with current user
    foundUser.refreshToken = refreshToken;
    await foundUser.save();

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    }); // secure: true - this is inserted in cookie if it is in deployement,

    res
      .status(200)
      .json({
        accessToken,
        uuid: foundUser.uuid,
        username: foundUser.username,
        userId: foundUser.id
      });
  } catch (err) {
    return res.status(401).json(err.message);
  }
};



module.exports = {
  loginUser,
};
