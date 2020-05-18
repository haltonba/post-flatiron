const Bootcamp = require("../models/Bootcamp")

// @description Get all bootcamps
// @route GET /api/v1/bootcamps
// @access Public

exports.getBootcamps = async (request, response, next) => {
    try {
        const bootcamps = await Bootcamp.find()
        response.status(200).json({success: true, count: bootcamps.length, data: bootcamps})
    } catch (error) {
        response.status(400).json({success: false})
    }
}

// @description Get single bootcamp
// @route GET /api/v1/bootcamps/:id
// @access Public

exports.getBootcamp = async (request, response, next) => {
    try {
        const bootcamp = await Bootcamp.findById(request.params.id)
        if (!bootcamp) {
            response.status(400).json({success: false})
        }
        response.status(200).json({success: true, data: bootcamp})
    } catch (error) {
        response.status(400).json({success: false})
    }
}

// @description Create bootcamp
// @route POST /api/v1/bootcamps
// @access Private

exports.createBootcamp = async (request, response, next) => {
    try {
        const bootcamp = await Bootcamp.create(request.body)

        response.status(201).json({
            success: true,
            data: bootcamp
        }) 
    } catch (error) {
        response.status(400).json({success: false})
    }
}

// @description Update bootcamp
// @route PUT /api/v1/bootcamps/:id
// @access Private

exports.updateBootcamp = async (request, response, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndUpdate(request.params.id, request.body, {
            new: true,
            runValidators: true
        })
    
        if (!bootcamp) {
            return response.status(400).json({success: false})
        }
        response.status(200).json({success: true, data: bootcamp})
    } catch (error) {
        response.status(400).json({success: false})
    }
}

// @description Delete bootcamp
// @route DELETE /api/v1/bootcamps/:id
// @access Private

exports.deleteBootcamp = async (request, response, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndDelete(request.params.id)
    
        if (!bootcamp) {
            return response.status(400).json({success: false})
        }
        response.status(200).json({success: true, data: {}})
    } catch (error) {
        response.status(400).json({success: false})
    }
}