const express = require('express');
const cors = require('cors');
const Conn = require('./conn/conn');
const TasksRoutes = require('./routes/tasks.routes')
const port = 8000;
const app = express();

app.use(express.json());
app.use(cors());
app.use('/tasks', TasksRoutes);
Conn();

app.listen(port, () => console.log(`App listening on http://localhost:${port}/`))