const Bootcamp = require("../models/Bootcamp")
const ErrorResponse = require("../utils/errorResponse")
const asyncHandler = require("../middleware/async")

// @description Get all bootcamps
// @route GET /api/v1/bootcamps
// @access Public

exports.getBootcamps = asyncHandler(async (request, response, next) => {
    const bootcamps = await Bootcamp.find()
    response.status(200).json({success: true, count: bootcamps.length, data: bootcamps})
})

// @description Get single bootcamp
// @route GET /api/v1/bootcamps/:id
// @access Public

exports.getBootcamp = asyncHandler(async (request, response, next) => {
    const bootcamp = await Bootcamp.findById(request.params.id)
    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${request.params.id}`, 404))
    }
    response.status(200).json({success: true, data: bootcamp})
})

// @description Create bootcamp
// @route POST /api/v1/bootcamps
// @access Private

exports.createBootcamp = asyncHandler(async (request, response, next) => {
    const bootcamp = await Bootcamp.create(request.body)

    response.status(201).json({
        success: true,
        data: bootcamp
    }) 
})

// @description Update bootcamp
// @route PUT /api/v1/bootcamps/:id
// @access Private

exports.updateBootcamp = asyncHandler(async (request, response, next) => {
    const bootcamp = await Bootcamp.findByIdAndUpdate(request.params.id, request.body, {
        new: true,
        runValidators: true
    })

    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${request.params.id}`, 404))
    }
    response.status(200).json({success: true, data: bootcamp})
})

// @description Delete bootcamp
// @route DELETE /api/v1/bootcamps/:id
// @access Private

exports.deleteBootcamp = asyncHandler(async (request, response, next) => {
    const bootcamp = await Bootcamp.findByIdAndDelete(request.params.id)

    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${request.params.id}`, 404))
    }
    response.status(200).json({success: true, data: {}})
})