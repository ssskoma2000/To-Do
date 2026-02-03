const jwt = require("jsonwebtoken");

const { User } = require("../models/relations.model.js");

const checkToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message:
          "Kirish uchun ruxsat yo'q. Token mavjud emas yoki formati noto'g'ri.",
      });
    }

    if (!process.env.SECRET_KEY) {
      throw new Error("SECRET_KEY topilmadi!");
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(404).json({
        message: "Foydalanuvchi topilmadi.",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Token muddati o'tgan." });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Yaroqsiz token." });
    }

    console.error("Token tekshirishda xatolik:", error);
    return res.status(500).json({ message: "Ichki server xatosi." });
  }
};

module.exports = { checkToken };
