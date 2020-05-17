const Member = require("../models/Member")

// @description Get all members
// @route GET /api/members
// @access Public

exports.getMembers = async (request, response, next) => {
    try {
        const members = await Member.find()
        response.status(200).json({success: true, data: members})
    } catch (error) {
        response.status(400).json({success: false})
    }
}

// @description Get single member
// @route GET /api/members/:id
// @access Public

exports.getMember = async (request, response, next) => {
    try {
        const member = await Member.findById(request.params.id)

        if (!member) {
            return response.status(400).json({success: false}) 
        }

        response.status(200).json({success: true, data: member})
    } catch (error) {
        response.status(400).json({success: false})
    }
}

// @description Create member
// @route POST /api/members
// @access Private

exports.createMember = async (request, response, next) => {
    try {
        const member = await Member.create(request.body)

        response.status(201).json({
            success: true,
            data: member
        }) 
    } catch (error) {
        response.status(400).json({success: false})
    }
}

// @description Update bootcamp
// @route PUT /api/members/:id
// @access Private

exports.updateMember = (request, response, next) => {
    response.status(200).json({success: true, msg: `Update member ${request.params.id}`})
}

// @description Delete member
// @route DELETE /api/members/:id
// @access Private

exports.deleteMember = (request, response, next) => {
    response.status(200).json({success: true, msg: `Delete member ${request.params.id}`})
}