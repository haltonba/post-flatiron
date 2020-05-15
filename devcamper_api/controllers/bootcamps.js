// @description Get all bootcamps
// @route GET /api/v1/bootcamps
// @access Public

exports.getBootcamps = (request, response, next) => {
    response.status(200).json({success: true, msg: "Show all bootcamps"})
}

// @description Get single bootcamp
// @route GET /api/v1/bootcamps/:id
// @access Public

exports.getBootcamp = (request, response, next) => {
    response.status(200).json({success: true, msg: `Display bootcamp ${request.params.id}`})
}

// @description Create bootcamp
// @route POST /api/v1/bootcamps
// @access Private

exports.createBootcamp = (request, response, next) => {
    response.status(200).json({success: true, msg: "Create new bootcamp"})
}

// @description Update bootcamp
// @route PUT /api/v1/bootcamps/:id
// @access Private

exports.updateBootcamp = (request, response, next) => {
    response.status(200).json({success: true, msg: `Update bootcamp ${request.params.id}`})
}

// @description Delete bootcamp
// @route DELETE /api/v1/bootcamps/:id
// @access Private

exports.deleteBootcamp = (request, response, next) => {
    response.status(200).json({success: true, msg: `Delete bootcamp ${request.params.id}`})
}