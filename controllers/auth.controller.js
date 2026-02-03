const { User } = require("../models/relations.model");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const SECRET_KEY = process.env.SECRET_KEY;

const REGISTER = async (req, res) => {
  const { name, email, password } = req.body;

  const isExistEmail = await User.findOne({
    where: {
      email,
    },
  });

  if (isExistEmail)
    return res.json({
      message: "ro'yhatdan o'tilgan",
    });

  if (!(email && password))
    return res.json({
      message: "email and password required",
    });

  let data = await User.create({
    name,

    email,

    password: await bcrypt.hash(password, 12),
  });

  return res.json({
    message: "Successfully registered",

    data,
  });
};

const LOGIN = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({
      message: "email and password are requiredd",
    });

  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user)
    return res.status(404).json({
      message: "User not found",
    });

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch)
    return res.status(400).json({
      message: "Invalide credentials",
    });

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: "1h",
  });

  res.json({
    message: "Successfully logggged in",

    token,
  });
};

module.exports = {
  LOGIN,

  REGISTER,
};
