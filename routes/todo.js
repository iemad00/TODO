const express = require("express");
const router = express.Router();

// In-memory storage for to-do items
const todos = [];

// Get all to-do items
router.get("/", (req, res) => {
    res.status(200).json(todos);
});


module.exports = router;
