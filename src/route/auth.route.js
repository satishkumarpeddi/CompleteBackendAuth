const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const {validateSignUpMiddleware} = require('../middleware/validate')
const {createUser} = require('../config/database')
const auth = express.Router();

auth.post('/api/auth/register',validateSignUpMiddleware,async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;
    try{
       await createUser(username,password,name)
       res.status(201).json({
            msg:"User is created successfully"
       })
    }catch(err){
        res.status(500).json({
            msg:"Internal server failure"
        })
    }
})

module.exports = auth;