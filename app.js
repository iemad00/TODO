const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;


const todoRouter = require("./routes/todo");
app.use("/todo", todoRouter);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});