const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401); // unauthorized

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
    if (err) return res.sendStatus(403); // forbidden
    req.username = decode.UserInfo.username;
    req.uuid = decode.UserInfo.uuid;
    next();
  });
};

module.exports = verifyJWT;
