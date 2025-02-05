module.exports = {
    OK: (res, message = "Success", data = null) => {
        return res.status(200).json({
            success: true,
            message,
            data,
        });
    },

    Created: (res, message = "Created successfully", data = null) => {
        return res.status(201).json({
            success: true,
            message,
            data,
        });
    },

    BadRequest: (res, message = "Bad request", errors = null) => {
        return res.status(400).json({
            success: false,
            message,
            errors,
        });
    },

    NotFound: (res, message = "Not found") => {
        return res.status(404).json({
            success: false,
            message,
        });
    },

    InternalError: (res, message = "Internal server error") => {
        return res.status(500).json({
            success: false,
            message,
        });
    },
};
