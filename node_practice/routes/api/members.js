const express = require("express")
const router = express.Router()
const members = require("../../Members")
const uuid = require("uuid")

router.get("/", (request, response) => response.json(members))

router.get("/:id", (request, response) => {

    const found = members.some(member => member.id === parseInt(request.params.id))

    found ? response.json(members.filter(member => member.id === parseInt(request.params.id)))
    : response.status(400).json({message: "No member by that id found!"})

})

// Create Member
router.post("/", (request, response) => {
    const newMember = {
        id: uuid.v4(),
        name: request.body.name,
        email: request.body.email,
        status: request.body.status
    }

    if (!newMember.name || !newMember.email || !newMember.status) {
        return response.status(400).json({msg: "Please fill out all info"})
    }

    members.push(newMember)
    response.json(members)
    // response.redirect("/")
})

// Update Member
router.put("/:id", (request, response) => {
    const found = members.some(member => member.id === parseInt(request.params.id))
    if (found) {
        const updatedMember = request.body
        members.forEach(member => {
            if (member.id === parseInt(request.params.id)) {
                member.name = updatedMember.name ? updatedMember.name : member.name
                member.email = updatedMember.email ? updatedMember.email : member.email
                member.status = updatedMember.status ? updatedMember.status : member.status

                response.json({msg: "Updated Successfully", member})
            }
        })
    }
    else {
        response.status(400).json({message: "No member by that id found!"})
    }
})

// Delete Member
router.delete("/:id", (request, response) => {
    const found = members.some(member => member.id === parseInt(request.params.id))
    if (found) {
        response.json({msg: "Member Deleted", members: members.filter(member => member.id !== parseInt(request.params.id))})
    }
    else {
        response.status(400).json({message: "No member by that id found!"})
    }
})

module.exports = router