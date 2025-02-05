const { InternalError } = require("../utils/responseHelper");

const errorHandler = (err, req, res, next) => {
    console.error("🔥 Error:", err.message);
    return InternalError(res, "Something went wrong.");
};

module.exports = errorHandler;
