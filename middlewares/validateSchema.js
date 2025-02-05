
// This middleware is used to validate the schema of the request body
function validateSchema(schemaValidator) {
    return (req, res, next) => {
        const valid = schemaValidator(req.body);
        if (!valid) {
            return res.status(400).json({ errors: schemaValidator.errors });
        }
        next();
    };
}

module.exports = validateSchema;
