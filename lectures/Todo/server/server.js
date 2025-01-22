const express = require("express")
const cors = require('cors')
const app = express()
const mongoose = require("mongoose")

app.use(cors())
app.use(express.json())
const PORT = 3000

app.get("/test", (req, res) => {
    console.log("Test route hit")
    res.json({msg: "success"})
})


app.listen(PORT, () => {
    console.log(`Server is runnning on port ${PORT}`)
})