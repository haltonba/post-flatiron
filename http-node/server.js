const http = require("http")

const todos = [
    {
        id: 1,
        text: "todo 1"
    },
    {
        id: 2,
        text: "todo 2"
    },
    {
        id: 3,
        text: "todo 3"
    },
]

const server = http.createServer((request, response) => {
    const {method, url} = request

    let body = []

    request.on("data", chunk => {
        body.push(chunk)
    })
    .on("end", () => {
        body = Buffer.concat(body).toString()

        let status = 404
        const res = {
            success: false,
            data: null
        }

        if(method === "GET" && url === "/todos") {
            status = 200
            res.success = true
            res.data = todos
        } 
        else if (method === "POST" && url === "/todos") {
            const {id, text} = JSON.parse(body)

            if (!id || !text) {
                status = 404
            }
            else {
                todos.push({id, text})
                status = 201
                res.success = true
                res.data = todos
            }
        }
        
        response.writeHead(status, {
            "Content-Type": "application/json"
        })

        response.end(JSON.stringify(res))
    })
})

const PORT = 5000

server.listen(PORT, () => console.log(`Server running on port: ${PORT}`))