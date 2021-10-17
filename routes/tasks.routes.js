const express = require("express");
const TasksController = require("../controllers/tasks.controller");

const router = express.Router();
const tasksController = new TasksController();

router.get("/", tasksController.getTasks);

router.get("/:id", tasksController.getTasksById);

router.post("/add", tasksController.createTask);

router.put("/:id", tasksController.updateTask);

router.delete("/:id", tasksController.deleteTask);

module.exports = router;
