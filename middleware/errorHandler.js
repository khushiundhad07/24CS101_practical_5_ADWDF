function errorHandler(err, req, res, next) {
    console.error(err.stack);

    // Mongoose validation error
    if (err.name === "ValidationError") {
        const errors = {};

        for (const field in err.errors) {
            errors[field] = err.errors[field].message;
        }

        return res.status(400).json({
            message: "Validation failed",
            errors: errors
        });
    }

    // Invalid MongoDB ObjectId
    if (err.name === "CastError") {
        return res.status(400).json({
            message: "Invalid ID format"
        });
    }

    // Other errors
    res.status(500).json({
        error: "Something went wrong"
    });
}

module.exports = errorHandler;