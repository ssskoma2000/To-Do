const { where } = require("sequelize");

const { User } = require("../models/relations.model.js");
const { Task } = require("../models/relations.model.js");

const CREATE = async (req, res) => {
  try {
    let reqBody = req.body;

    const { userId, title, description, isCompleted, priority, dueDate } =
      reqBody;

    // Validation
    if (!title) {
      return res.status(400).json({ message: "Title majburiy" });
    }

    if (!userId) {
      return res.status(400).json({ message: "UserId majburiy" });
    }

    if (!priority || !["low", "medium", "high"].includes(priority)) {
      return res
        .status(400)
        .json({ message: "Priority low/medium/high bo'lishi kerak" });
    }

    if (dueDate && new Date(dueDate) < new Date()) {
      return res
        .status(400)
        .json({ message: "Due date bugundan oldingi bo'lmasi kerak" });
    }

    const newData = await Task.create({
      userId,

      title,

      description,

      isCompleted: isCompleted || false,

      priority,

      dueDate,
    });

    return res.json({
      message: "Success",

      data: newData,
    });
  } catch (error) {
    res.status(500).json({ message: "Xatolik", error: error.message });
  }
};

const GET = async (req, res) => {
  try {
    const { userId, isCompleted, priority, dueBefore } = req.query;

    const whereClause = {};

    if (userId) whereClause.userId = userId;
    if (isCompleted !== undefined)
      whereClause.isCompleted = isCompleted === "true";
    if (priority) whereClause.priority = priority;
    if (dueBefore) {
      const { Op } = require("sequelize");
      whereClause.dueDate = { [Op.lte]: new Date(dueBefore) };
    }

    const data = await Task.findAll({
      where: Object.keys(whereClause).length > 0 ? whereClause : {},
      include: { model: User, as: "owner" },
    });

    res.json({
      message: "Success",

      data: data,
    });
  } catch (error) {
    console.error("Server xatosi (GET):", error);
    res.status(500).json({ message: "Ichki server xatosi" });
  }
};

const GET_BY_ID = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Task.findByPk(id, {
      include: [{ model: User, as: "owner" }],
    });

    if (!data) {
      return res.json({ message: "Mal'umotlar topilmadi" });
    }

    return res.json({
      message: "Success",
      data: data,
    });
  } catch (error) {
    console.error("Server xatosi (GET_BY_ID):", error);
    res.status(500).json({ message: "Ichki server xatosi" });
  }
};

const DELETE = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Task.destroy({
      where: { id },
    });

    if (!deleted) {
      return res.json({ message: "Task topilmadi" });
    }

    return res.json({ message: "Ochirildi" });
  } catch (error) {
    console.error("Server xatosi (DELETE):", error);
    res.status(500).json({ message: "Ichki server xatosi" });
  }
};

const UPDATE = async (req, res) => {
  const { id } = req.params;

  const { userId, title, description, isCompleted, priority, dueDate } =
    req.body;

  try {
    const [updatedRows] = await Task.update(
      { userId, title, description, isCompleted, priority, dueDate },

      { where: { id } },
    );

    if (!updatedRows) {
      return res.json({ message: "Task topilmadi" });
    }

    const updatedTask = await Task.findByPk(id, {
      include: { model: User, as: "owner" },
    });

    res.json({
      message: "Yangilandi",

      data: updatedTask,
    });
  } catch (error) {
    console.error("Server xatosi (UPDATE):", error);
    res.status(500).json({ message: "Ichki server xatosi" });
  }
};

module.exports = {
  CREATE,

  GET,

  GET_BY_ID,

  DELETE,

  UPDATE,
};
