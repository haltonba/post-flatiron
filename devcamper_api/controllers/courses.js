const Course = require("../models/Course")
const ErrorResponse = require("../utils/errorResponse")
const asyncHandler = require("../middleware/async")
const Bootcamp = require("../models/Bootcamp")

// @description Get all courses
// @route GET /api/v1/courses
// @route GET /api/v1/bootcamps/bootcampId/courses
// @access Public

exports.getCourses = asyncHandler(async (request, response, next) => {
    let query
    if (request.params.bootcampId) {
        query = Course.find({bootcamp: request.params.bootcampId})
    } 
    else {
        query = Course.find().populate({
            path: "bootcamp",
            select: "name description"
        }) 
    }

    const courses = await query

    response.status(200).json({
        success: true,
        count: courses.length,
        data: courses
    })
})

// @description Get single course
// @route GET /api/v1/courses/:id
// @access Public

exports.getCourse = asyncHandler(async (request, response, next) => {
    const course = await Course.findById(request.params.id).populate({
        path: "bootcamp",
        select: "name description"
    })
    if (!course) {
        return next(new ErrorResponse(`Course not found with id of ${request.params.id}`, 404))
    }
    response.status(200).json({success: true, data: course})
})

// @description Create new course
// @route POST /api/v1/bootcamps/bootcampId/courses
// @access Private

exports.addCourse = asyncHandler(async (request, response, next) => {
    request.body.bootcamp = request.params.bootcampId

    const bootcamp = await Bootcamp.findById(request.params.bootcampId)
    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${request.params.bootcampId}`, 404))
    }

    const course = await Course.create(request.body)
    response.status(200).json({success: true, data: course})
})

// @description Update course
// @route PUT /api/v1/courses/:id
// @access Private

exports.updateCourse = asyncHandler(async (request, response, next) => {
    const course = await Course.findByIdAndUpdate(request.params.id, request.body, {
        runValidators: true,
        new: true
    })
    if (!course) {
        return next(new ErrorResponse(`Course not found with id of ${request.params.bootcampId}`, 404))
    }
    response.status(200).json({success: true, data: course})
})

// @description Delete course
// @route DELETE /api/v1/courses/:id
// @access Private

exports.deleteCourse = asyncHandler(async (request, response, next) => {
    const course = await Course.findById(request.params.id)
    if (!course) {
        return next(new ErrorResponse(`Course not found with id of ${request.params.bootcampId}`, 404))
    }
    await course.remove()
    response.status(200).json({success: true, data: course})
})