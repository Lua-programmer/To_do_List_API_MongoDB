const Task = require("../models/task");

class TaskService {
  findAll = async () => await Task.find();

  findById = async (id) => {
    return await Task.findById(id);
  };

  createTask = async (task) => {
    return await Task.create(task);
  };

  updateTask = async (id, task) => {
    return await Task.updateOne({ _id: id }, task);
  };

  deleteTask = async (id) => {
    return await Task.deleteOne({ _id: id });
  };
}

module.exports = TaskService;
