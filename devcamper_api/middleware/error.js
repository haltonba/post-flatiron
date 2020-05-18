const ErrorResponse = require("../utils/errorResponse")

const errorHandler = (error, request, response, next) => {
    let err = {...error}
    err.message = error.message

    // Mongoose bad ObjectId
    if (error.name === "CastError") {
        const message = `Resource not found with id of ${error.value}`
        err = new ErrorResponse(message, 404)
    }

    // Mongoose duplicate key
    if (error.code === 11000) {
        const message = "Duplicate field value entered"
        err = new ErrorResponse(message, 404)
    }

    // Mongoose validation error
    if (error.name === "ValidationError") {
        const message = Object.values(error.errors).map(value => " " + value.message)
        err = new ErrorResponse(message, 404)
    }

    response.status(err.statusCode || 500).json({success: false, error: err.message || "Server Error"})
}

module.exports = errorHandler