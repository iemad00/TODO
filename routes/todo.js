const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const validateSchema = require("../middlewares/validateSchema");
const { validateCreateTodo, validateUpdateTodo } = require("../schemas/todo");

// In-memory storage for to-do items
const todos = [];

// Get all to-do items
router.get("/", (req, res) => {
    res.status(200).json(todos);
});

// Add a new to-do item
router.post("/", validateSchema(validateCreateTodo), (req, res) => {
    const { title, completed } = req.body;
    const newTodo = { id: uuidv4(), title, completed };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Update a to-do item (partial updates)
router.patch("/:id", validateSchema(validateUpdateTodo), (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;

    const todo = todos.find((t) => t.id === id);
    if (!todo) {
        return res.status(404).json({ error: "To-do item not found." });
    }

    if (title !== undefined) {
        todo.title = title;
    }

    if (completed !== undefined) {
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
