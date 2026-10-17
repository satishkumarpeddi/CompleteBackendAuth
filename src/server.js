const express = require('express')
const auth = require('./route/auth.route')

const app = express();
app.use(express.json())
app.use(auth)

app.listen(3001,()=>{
    console.log("Server is running on the port : 3001")
})