const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

// In-memory storage for to-do items
const todos = [];

// Middleware for TODO creation
function validateTodoInput(req, res, next) {
    const { title, completed } = req.body;
    if (typeof title !== "string" || title.trim() === "") {
        return res.status(400).json({ error: "Title is required" });
    }
    if (typeof completed !== "boolean") {
        return res.status(400).json({ error: "Completed must be a boolean value" });
    }
    next();
}

// Get all to-do items
router.get("/", (req, res) => {
    res.status(200).json(todos);
});

// Add a new to-do item
router.post("/", validateTodoInput, (req, res) => {
    const { title, completed } = req.body;
    const newTodo = { id: uuidv4(), title, completed };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});


module.exports = router;
