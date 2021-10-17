const express = require('express');
const cors = require('cors');
const Conn = require('./conn/conn')
const port = 8000;
const app = express();

app.use(express.json());
app.use(cors());
Conn();

app.listen(port, () => console.log(`App listening on http://localhost:${port}/`))