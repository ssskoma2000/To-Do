const { where } = require("sequelize");

const { User, Task } = require("../models/relations.model.js");

const GET = async (req, res) => {
  const data = await User.findAll({
    include: { model: Task, as: "task" },
  });

  if (!data)
    return res.json({
      message: "Malumotlar topilmadi",
    });

  return res.json({
    message: "Success",

    data: data,
  });
};

const GET_BY_ID = async (req, res) => {
  const { id } = req.params;

  const data = await User.findByPk(id, {
    include: { model: Task, as: "task" },
  });

  if (!data)
    return res.json({
      message: "Malumotlar topilmadi",
    });

  return res.json({
    message: "Success",
    data: data,
  });
};

const DELETE_USER = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.json({
      message: "ID yuborilmadi",
    });
  }

  const deleted = await User.destroy({
    where: { id },
  });

  if (!deleted) {
    return res.json({
      message: "User topilmadi",
    });
  }

  return res.json({
    message: "Ochirildi",

    data: deleted,
  });
};

const UPDATE_USER = async (req, res) => {
  let { id } = req.params;

  const body = req.body;

  const data = await User.update(body, { where: { id: id } });

  console.log(data);

  if (data[0]) {
    return res.json({
      message: "Success",

      data: await User.findByPk(id, {
        include: { model: Task, as: "task" },
      }),
    });
  } else {
    res.json({
      message: "Fail",

      data: "Data not found",
    });
  }
};

module.exports = {
  GET,

  GET_BY_ID,

  DELETE_USER,

  UPDATE_USER,
};
