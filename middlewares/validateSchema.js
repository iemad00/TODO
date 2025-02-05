
const { BadRequest } = require("../utils/responseHelper");

// This middleware is used to validate the schema of the request body
function validateSchema(schemaValidator) {
    return (req, res, next) => {
        const valid = schemaValidator(req.body);
        if (!valid) {
            return BadRequest(res, "Invalid request body", schemaValidator.errors);
        }
        next();
    };
}

module.exports = validateSchema;
