const express = require('express')
const auth = require('./route/auth.route')
const path = require('path')
require('dotenv').config({
    path:path.resolve(__dirname,'../.env')
})
const app = express();
app.use(express.json());
app.use(auth)
app.listen(process.env.PORT,(req,res)=>{
    console.log(`Server is running on the port : ${process.env.PORT}`)
})
