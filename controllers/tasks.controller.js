const mongoose = require("mongoose");
const TasksServices = require("./../services/tasks.service");

const tasksService = new TasksServices();

class TasksController {
  getTasks = async (req, res) => {
    const tasks = await tasksService.findAll();
    res.send(tasks);
  };

  getTasksById = async (req, res) => {
    const id = req.params.id;

    //validation if the id type is different from the mongoose id - validação caso o tipo do ID esteja diferente do ID no mongoose
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(403).send("Invalid ID");
      return;
    }

    const task = await tasksService.findById(id);

    //validation for wrong id - validação para id errado
    if (!task) {
      res.status(404).send("Task not found");
      return;
    }

    res.status(200).send(task);
  };

  createTask = async (req, res) => {
    const task = req.body;
    const taskSave = await tasksService.createTask(task)
    .then(() => {
      res.send({ message: `Tarefa criada com sucesso` });
    })
    .catch((err) => res.status(500).send({error: `erro no servdor: ${err}`}));
    console.log(taskSave);
  };

  //validation for incomplete ID - validação para o ID incompleto
  updateTask = async (req, res) => {
    const id = req.params.id;

    //validation if the id type is different from the mongoose id - validação caso o tipo do ID esteja diferente do ID no mongoose
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.send("Invalid code");
      return;
    }

    const task = await tasksService.findById(id);

    //validation for wrong id - validação para id errado
    if (!task) {
      res.status(404).send("Task not found");

      return;
    }

    const newTask = req.body;

    //validation if the submitted body is empty - validação caso o body enviado esteja vazio
    if (!Object.keys(newTask).length) {
      res.status(400).send({
        message: "The request body is empty",
      });

      return;
    }

    //validation if the body has a wrong string - validação caso o body esteja com alguma string errado
    if (
      !newTask ||
      !newTask.title ||
      !newTask.description ||
      !newTask.priority ||
      !newTask.status ||
      !newTask.deadline
    ) {
      res.status(400).send({
        message: "Invalid task. Make sure the body is correctly filled.",
      });

      return;
    }

    //if everything is correct, it will return the updated task - se tudo estiver correto, retornará a tarefa atualizada
    tasksService.updateTask(id, newTask);
    const updatedTask = await tasksService.findById(id)
    .then(() => {
      res.status(200).send({message: 'Tarefa atualizada com sucesso'});
    })
    .catch((err) => res.status(500).send({error: `erro no servdor: ${err}`}));
    console.log(updatedTask);
  };

  deleteTask = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(422).send("Invalid task");

      return;
    }

    //validation if the ID does not exist - validação caso o ID não exista
    const task = await tasksService.findById(id);
    if (!task) {
      res.status(404).send("Task not found");

      return;
    }

    //if everything is correct, it will delete the task successfully - se tudo estiver correto, excluirá a tarefa com sucesso
    await tasksService.deleteTask(id);

    res.send({
      message: "Task deleted successfully",
    });
  };
}

module.exports = TasksController;
