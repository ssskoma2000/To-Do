const { Task, Tag, TaskTags } = require("../models/relations.model.js");

const CREATE = async (req, res) => {
  try {
    const { taskId, tagId } = req.params;
    const newData = await TaskTags.create({
      taskId: parseInt(taskId),
      tagId: parseInt(tagId),
    });

    return res.json({
      message: "Success",
      data: newData,
    });
  } catch (error) {
    console.error("SQL xatosi:", error.parent?.detail || error.message);
    return res.status(400).json({
      message: "Xatolik!",
      detail: error.parent?.detail || error.message,
    });
  }
};

const GET = async (req, res) => {
  const { taskId } = req.params;

  const data = await TaskTags.findAll({
    where: taskId ? { taskId } : {},
    include: [
      { model: Task, as: "task" },
      { model: Tag, as: "tag" },
    ],
  });
  res.json({
    message: "Success",
    data: data,
  });
};

const DELETE = async (req, res) => {
  const { taskId, tagId } = req.params;

  try {
    const deleted = await TaskTags.destroy({
      where: { taskId, tagId },
    });

    if (deleted === 0) {
      return res.json({ message: "Ma'lumot topilmadi" });
    }

    return res.json({ message: "Muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.log("error:", error.message);
  }
};

module.exports = {
  CREATE,
  GET,
  DELETE,
};
