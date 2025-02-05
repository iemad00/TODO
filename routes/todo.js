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

// We use PATCH for partial updates (e.g., updating only the 'completed' field)
router.patch("/:id", (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;

    const todo = todos.find((t) => t.id === id);
    if (!todo) {
        return res.status(404).json({ error: "To-do item not found." });
    }

    // Update only provided fields
    if (title !== undefined) {
        if (typeof title !== "string" || title.trim() === "") {
            return res.status(400).json({ error: "Title must be a non-empty string" });
        }
        todo.title = title;
    }

    if (completed !== undefined) {
        if (typeof completed !== "boolean") {
            return res.status(400).json({ error: "Completed must be a boolean value" });
        }
        todo.completed = completed;
    }

    res.status(200).json(todo);
});

// Delete a to-do item
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const index = todos.findIndex((t) => t.id === id);
    if (index === -1) {
        return res.status(404).json({ error: "To-do item not found." });
    }
    todos.splice(index, 1);
    res.status(204).send(); 
});

module.exports = router;
