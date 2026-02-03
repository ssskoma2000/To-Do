const { User } = require("./user.model");
const { Task } = require("./task.model");
const { SubTask } = require("./subTask.model");
const { Tag } = require("./tag.model");
const { TaskTags } = require("./TaskTags.model");
// user task one to many
User.hasMany(Task, { foreignKey: "userId", as: "task", onDelete: "CASCADE" });
Task.belongsTo(User, { foreignKey: "userId", as: "owner" });

// task subtask one to many
Task.hasMany(SubTask, {
  foreignKey: "taskId",
  as: "subtasks",
  onDelete: "CASCADE",
});
SubTask.belongsTo(Task, { foreignKey: "taskId", as: "mainTask" });

// task tag many to many
Task.belongsToMany(Tag, {
  through: TaskTags,
  as: "tags",
  foreignKey: "taskId",
});
Tag.belongsToMany(Task, { through: TaskTags, as: "task", foreignKey: "tagId" });

// TaskTags -> Task & Tag
TaskTags.belongsTo(Task, { foreignKey: "taskId", as: "task" });
TaskTags.belongsTo(Tag, { foreignKey: "tagId", as: "tag" });

Task.hasMany(TaskTags, { foreignKey: "taskId" });
Tag.hasMany(TaskTags, { foreignKey: "tagId" });

module.exports = { User, Task, SubTask, Tag, TaskTags };
