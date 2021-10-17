const mongoose = require('mongoose');
const TasksServices = require('./../services/tasks.service');

const tasksService = new TasksServices();

class TasksController {

    getTasks = async (req, res) => {
        const tasks = await tasksService.findAll();
        res.send(tasks);
    }

    getTasksById = async (req, res) => {
        const id = req.params.id;

        //validation
        if(!mongoose.Types.ObjectId.isValid(id)) {
            res.status(403).send('Invalid ID');
            return;
        }

        const task = await tasksService.findById(id);

        //validation
        if(!task) {
            res.status(404).send('Task not found');
            return;
        }

        res.status(200).send(task);
    }

    createTask = async (req, res) => {
        const task = req.body;

        //validation
        if(!task || !task.title || task.description || task.priority || task.status || task.deadline){
            res.status(400).send({
                message: 
                'Invalid task. Make sure the body is correctly filled.'
            });
            return;

        };

        const taskSave = await tasksService.createTask(task);
        res.send(taskSave);
    }

    updateTask = async (req, res) => {
        const id = req.params.id;

        if(!mongoose.Types.ObjectId.isValid(id)) {
            res.send("Invalid code");
            return;
        }

        const task = await tasksService.findById(id);

        //validation
        if(!task){
            res.status(404).send("Task not found");

            return;
        }

        const newTask = req.body;

        if(!Object.keys(newTask).length){
            res.status(400).send({
                message: 
                'The request body is empty'
            });

            return;
        }

        if(!newTask || newTask.title || newTaskask.description || newTask.priority || newTask.status || newTask.deadline){
            res.status(400).send({
                message:
                'Invalid task. Make sure the body is correctly filled.'
            });

            return;
        }

        tasksService.updateTask(newTask, id);
        const updatedTask = await tasksService.findById(id);

        res.send(updatedTask);
    }

    deleteTask = async (req, res) => {
        const id = req.params.id;

        if(!mongoose.Types.ObjectId.isValid(id)){
            res.status(422).send("Invalid task");

            return;
        }

        //validation
        if(!task){
            res.status(404).send("Task not found");

            return;
        }

        await tasksService.deleteTask(id);

        res.send({
            message:
            "Task deleted successfully"
        });
    }
}

module.exports = TasksController;