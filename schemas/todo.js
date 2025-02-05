const { Type } = require("@sinclair/typebox");
const Ajv = require("ajv");
const addFormats = require("ajv-formats");

// Create a new Ajv instance with strict validation
const ajv = new Ajv({ coerceTypes: false, useDefaults: false, allErrors: true, strict: "log" });
addFormats(ajv);

// Schema for creating to-do items
const CreateTodoSchema = Type.Object({
    title: Type.String({ minLength: 1 }),
    completed: Type.Boolean(),
});

// Schema for updating to-do items (optional fields)
const UpdateTodoSchema = Type.Object({
    title: Type.Optional(Type.String({ minLength: 1 })), // Optional but must be a valid string
    completed: Type.Optional(Type.Boolean()), // Optional but must be a valid boolean
});

// Compile the schemas using Ajv
const validateCreateTodo = ajv.compile(CreateTodoSchema);
const validateUpdateTodo = ajv.compile(UpdateTodoSchema);

module.exports = { validateCreateTodo, validateUpdateTodo };
