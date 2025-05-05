const bycrpt = require("bcrypt");
const { user } = require("../../models");

const registerUser = async (req, res) => {
  const { user: username, email, pwd } = req.body;

  try {
    const hashedPwd = await bycrpt.hash(pwd, 10);

    await user.create({ username, email, password: hashedPwd });

    return res.status(201).json({ success: "New user created" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  registerUser,
};
