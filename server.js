const express = require('express')
const app = express()
const cors = require('cors') //allows requests from external clients
app.use(cors())
const PORT = 8000

const tea = {
    "oolong": {
        "type": "black",
        "origin": "China",
        "waterTempF": 200,
        "steepTimeSecond": 180,
        "caffinated": true,
        "desc": "a traditional semi-oxidized Chinese tea produced through a process including withering the plant under strong sun and oxidation before curling and twisting"
    },
    "genmaicha": {
        "type": "green",
        "origin": "Japan",
        "waterTempF": 180,
        "steepTimeSecond": 240,
        "caffinated": true,
        "desc": "a Japanese brown rice green tea consisting of green tea mixed with roasted popped brown rice"
    },
    "unknown": {
        "type": "unknown",
        "origin": "unknown",
        "waterTempF": 0,
        "steepTimeSecond": 0,
        "caffinated": false,
        "desc": "unknown"
    }
}

app.get("/", (request, response) => {
    console.log("sending you to index.html")
    response.sendFile(`${__dirname}/index.html`)
})

app.get("/api/:name", (request, response) => {
    const teaName = (request.params.name).toLowerCase()
    console.log(`searching for: ${teaName}`)

    if (tea[teaName]) {
        response.json(tea[teaName])
        console.log(tea[teaName])
    } else {
        response.json(tea['unknown'])
        console.log(tea['unknown'])
    }
})

app.get("/api", (request, response) => {
    response.json(tea)
})

app.listen(process.env.PORT || PORT, () => { //process.env.PORT allows you to use heroku's port number
    console.log(`listening on port ${PORT}`)
    console.log(`search api using pattern: /api/oolong (replace oolong with search term)`)
})