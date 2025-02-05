const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const todoRouter = require("./routes/todo");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev")); // Logging

const port = process.env.PORT || 3000;

// Routes
app.use("/todo", todoRouter);

// Register the global error handler
app.use(errorHandler);

app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
