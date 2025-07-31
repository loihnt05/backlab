const express = require("express")
const app = express()
const port = "3000"

app.use((req, res) => {
    console.log(`${req.method} ${req.url}`)
    next()
})

app.get('/', (req, res) => {
    res.send("server")
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})