const geocoder = require("../utils/geocoder")
const Bootcamp = require("../models/Bootcamp")
const ErrorResponse = require("../utils/errorResponse")
const asyncHandler = require("../middleware/async")

// @description Get all bootcamps
// @route GET /api/v1/bootcamps
// @access Public

exports.getBootcamps = asyncHandler(async (request, response, next) => {
    // Original find all bootcamps
    // const bootcamps = await Bootcamp.find(request.query)

    // Copy request.query
    const requestQuery = {...request.query}

    // Fields to exclude
    const removeFields = ["select", "sort", "page", "limit"]

    // Loop over removeFields and delete them from requestQuery
    removeFields.forEach(param => delete requestQuery[param])

    // Create query string
    let queryStr = JSON.stringify(requestQuery)

    // Create operators
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)

    // Finding resource
    let query = Bootcamp.find(JSON.parse(queryStr)).populate("courses")

    // Select fields
    if (request.query.select) {
        const fields = request.query.select.replace(",", " ")
        query = query.select(fields)
    }

    // Sort
    if (request.query.sort) {
        const sortBy = request.query.sort.replace(",", " ")
        query = query.sort(sortBy) 
    }

    // Page
    const page = parseInt(request.query.page) || 1
    const limit = parseInt(request.query.limit) || 10
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const total = await Bootcamp.countDocuments()
    query = query.skip(startIndex).limit(limit)

    // Executing query
    const bootcamps = await query

    // Pagination result
    const pagination = {}

    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit
        }
    }

    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit
        }
    }

    response.status(200).json({success: true, count: bootcamps.length, pagination, data: bootcamps})
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
    // const bootcamp = await Bootcamp.findByIdAndDelete(request.params.id)
    const bootcamp = await Bootcamp.findById(request.params.id)

    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${request.params.id}`, 404))
    }

    await bootcamp.remove()

    response.status(200).json({success: true, data: {}})
})

// @description Get bootcamps within a certain mile radius
// @route GET /api/v1/bootcamps/:radius/:zipcode/:distance
// @access Private

exports.getBootcampsInRadius = asyncHandler(async (request, response, next) => {
    const {zipcode, distance} = request.params

    // Get latitude/logitude from geocoder
    const loc = await geocoder.geocode(zipcode)
    const lng = loc[0].longitude
    const lat = loc[0].latitude

    // Calculate radius using radians
    // Divide distance by radius of the earth
    // Earth radius = 3,963mi

    const radius = distance / 3963

    const bootcamps = await Bootcamp.find({
        location: {$geoWithin: {$centerSphere: [[lng, lat], radius]}}
    })
    
    response.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps
    })
})