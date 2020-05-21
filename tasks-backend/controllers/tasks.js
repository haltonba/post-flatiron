const Task = require("../models/Task")
const asyncHandler = require("../middleware/async")

// @description Get all tasks
// @route GET /tasks
// @access Public

exports.getTasks = asyncHandler(async (request, response, next) => {
    const tasks = await Task.find()

    if (!tasks) {
        return response.status(404).json({
            success: false,
            message: "Can't find these bootcamps dawggg"
        })
    }
    response.status(200).json({
        success: true,
        count: tasks.length,
        data: tasks
    })
})