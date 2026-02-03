const { where } = require("sequelize");

const { Task, Tag } = require("../models/relations.model.js");

const CREATE = async (req, res) => {
  try {
    const { name, tasks } = req.body;

    // Validation
    if (!name) {
      return res.status(400).json({ message: "Name majburiy" });
    }

    const newData = await Tag.create({
      name,
      tasks: tasks || 0,
    });

    return res.json({
      message: "Success",
      data: newData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Xatolik yuz berdi" });
  }
};

const GET = async (req, res) => {
  const data = await Tag.findAll({
    include: { model: Task, as: "task" },
  });

  res.json({
    message: "Success",

    data: data,
  });
};

const DELETE_TAG = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Tag.destroy({
      where: { id },
    });

    if (!deleted) {
      return res.status(404).json({ message: "Tag topilmadi" });
    }

    return res.json({ message: "Tag muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Xatolik yuz berdi" });
  }
};

module.exports = {
  CREATE,

  GET,

  DELETE_TAG,
};
