const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev")); // Logging

const port = process.env.PORT || 3000;


const todoRouter = require("./routes/todo");
app.use("/todo", todoRouter);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});