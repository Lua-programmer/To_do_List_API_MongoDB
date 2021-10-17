const mongoose = require('mongoose');

const TaskModel = new.mongoose.Schema({
    title: { type: String, required: true }, //titulo
    description: { type: String, required: true }, //descricao
    priority: { type: String, required: true }, //prioridade(alta, media e baixa)
    status: { type: String, required: true }, //fazer, fazendo, feito
    deadline: { type: String, required: true }, //prazo
    creationDate: { type: Date, default: Date.now}
})

const Task = mongoose.model("tasks", TaskModel);

module.exports = Task;