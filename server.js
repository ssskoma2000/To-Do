require("dotenv").config();
const express = require("express");
const { sequelize } = require("./config/db");
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const taskRoute = require("./routes/task.route");
const subtaskRoute = require("./routes/subtask.route");
const TaskTagsRoute = require("./routes/TaskTags.route");
const tagRoute = require("./routes/tag.route");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

async function start() {
  try {
    await sequelize.sync();
    console.log("* Ma'lumotlar bazasiga muvaffaqiyatli ulanildi.");

    app.use("/auth", authRoute);
    app.use(userRoute);
    app.use(taskRoute);
    app.use(subtaskRoute);
    app.use(TaskTagsRoute);
    app.use(tagRoute);

    app.get("/", (req, res) => {
      res.send("Server muvaffaqiyatli ishlamoqda!");
    });

    app.listen(PORT, () =>
      console.log(`* Server ${PORT}-portda ishga tushdi.`),
    );
  } catch (error) {
    console.error(
      "Serverni ishga tushirishda yoki DBga ulanishda xatolik:",
      error,
    );
  }
}
start();
