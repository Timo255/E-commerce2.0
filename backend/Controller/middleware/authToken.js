const jwt = require("jsonwebtoken");

const generateResetToken = (user) => {
  const secret = process.env.RESET_TOKEN_SECRET;
  const payload = {
    user: user.username,
    id: user.id,
  };

  const token = jwt.sign(payload, secret, { expiresIn: "1d" });
  return token;
};

const verifyResetToken = async (token) => {
  const secret = process.env.RESET_TOKEN_SECRET;

  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, async (err, decode) => {
      if (err) {
        resolve(false);
      } else {
        try {
          resolve(decode.user);
        } catch (err) {
          resolve(false);
        }
      }
    });
  });
};

module.exports = { generateResetToken, verifyResetToken };
