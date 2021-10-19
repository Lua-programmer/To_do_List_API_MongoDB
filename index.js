const express = require("express");
const cors = require("cors");
const Conn = require("./conn/conn");
const TasksRoutes = require("./routes/tasks.routes");
const port = 8000;
const app = express();

if(process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

app.use(express.json());
app.use(cors());
app.use("/tasks", TasksRoutes);

const db_url = process.env.DB_URL;
const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASS;
const db_data = process.env.DB_DATA;

Conn(db_url, db_user, db_pass, db_data);



app.listen(process.env.PORT || port, () =>
  console.log(`App listening on http://localhost:${port}/`)
);
