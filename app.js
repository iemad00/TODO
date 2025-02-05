const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const todoRouter = require("./routes/todo");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev")); // Logging

// Routes
app.use("/todo", todoRouter);

// Global error handler
app.use(errorHandler);

module.exports = app;
