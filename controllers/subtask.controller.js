const { where } = require("sequelize");

const { Task, SubTask } = require("../models/relations.model.js");

const CREATE = async (req, res) => {
  try {
    let reqBody = req.body;

    const { taskId, title, isCompleted } = reqBody;

    // Validation
    if (!title) {
      return res.status(400).json({ message: "Title majburiy" });
    }

    if (!taskId) {
      return res.status(400).json({ message: "TaskId majburiy" });
    }

    const newData = await SubTask.create({
      taskId,

      title,

      isCompleted: isCompleted || false,
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
    const { taskId } = req.params;

    const data = await SubTask.findAll({
      where: taskId ? { taskId } : {},
      include: { model: Task, as: "mainTask" },
    });
    res.json({
      message: "Success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({ message: "Xatolik", error: error.message });
  }
};

const GET_BY_ID = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await SubTask.findByPk(id, {
      include: [{ model: Task, as: "mainTask" }],
    });

    if (!data) {
      return res.json({ message: "Malumotlar topilmadi" });
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
    const deleted = await SubTask.destroy({
      where: { id },
    });

    if (!deleted) {
      return res.json({ message: "Task topilmadi" });
    }

    return res.json({ message: "O'chirildi" });
  } catch (error) {
    console.error("Server xatosi (DELETE):", error);
    res.status(500).json({ message: "Ichki server xatosi" });
  }
};

const UPDATE = async (req, res) => {
  const { id } = req.params;

  const { title, isCompleted } = req.body;

  try {
    const [updatedRows] = await SubTask.update(
      { title, isCompleted },

      { where: { id } },
    );

    if (!updatedRows) {
      return res.json({ message: "Task topilmadi" });
    }

    const updatedTask = await SubTask.findByPk(id, {
      include: { model: Task, as: "mainTask" },
    });

    // Agar subtask complete bo'lsa, taskni ham check qilish
    if (isCompleted) {
      const taskId = updatedTask.taskId;
      const incompleteSubtasks = await SubTask.count({
        where: { taskId, isCompleted: false },
      });

      // Agar barcha subtasklar complete bo'lsa task ham complete bo'ladi
      if (incompleteSubtasks === 0) {
        await Task.update({ isCompleted: true }, { where: { id: taskId } });
      }
    }

    return res.json({
      message: "Yangilandii",

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
