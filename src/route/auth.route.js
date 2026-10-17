const express = require('express')
const bcrypt = require('bcrypt') 
const {validateSignUpMiddleware,validateSignInMiddleware} = require('../middleware/validate')
const {createUser,checkUserExists} = require('../config/database')
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

auth.post('/api/auth/signin',validateSignInMiddleware,async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    try{
       if(!await checkUserExists(username,password))
            return res.status(404).json({
                msg:"Incorrect Username or Password"
            })
       res.status(201).json({
            msg:"User is verfied successfully"
       })
    }catch(err){
        console.log(err)
        res.status(500).json({
            msg:"Internal server failure"
        })
    }
})

module.exports = auth;