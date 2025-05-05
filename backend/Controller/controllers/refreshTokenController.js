const jwt = require("jsonwebtoken");
const { user } = require("../../models");

const tokenRefresh = async (req, res) => {
  const cookies = req.cookies;

  try {
    if (!cookies?.jwt) return res.sendStatus(401);

    const refreshToken = cookies.jwt;

    const foundUser = await user.findOne({
      where: { refreshToken: refreshToken },
    });

    if (!foundUser) return res.sendStatus(403); // forbidden

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decode) => {
        if (err || foundUser.uuid !== decode.uuid) {
          return res.sendStatus(403);
        }

        const accessToken = jwt.sign(
          {
            UserInfo: {
              username: decode.username,
              uuid: decode.uuid,
              userId: decode.userId,
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "10s" }
        );

        return res
          .status(200)
          .json({
            accessToken,
            uuid: foundUser.uuid,
            userId: foundUser.id,
            username: foundUser.username,
          });
      }
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  tokenRefresh,
};
