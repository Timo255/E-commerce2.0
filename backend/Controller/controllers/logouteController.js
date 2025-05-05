const { user } = require("../../models")
const logoutUser = async (req, res) => {
    const cookies = req.cookies;
  
    try {
      if (!cookies.jwt) return res.sendStatus(201);
      const refreshToken = cookies.jwt;
  
      const foundUser = await user.findOne({ where: { refreshToken } });
  
      // didn't find user but you found cookie
      if (!foundUser) {
        res.clearCookie("jwt", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "None",
          maxAge: 24 * 60 * 60 * 1000,
        });
        return res.sendStatus(201)
      }
    
      // deleting the refreshToken in database
      foundUser.refreshToken = ''
      await foundUser.save();
  
      // deleting the cookie
      res.clearCookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
      });
  
      return res.sendStatus(204);
  
    } catch (err) {
      console.log(err);
    }
  };

  module.exports={logoutUser}