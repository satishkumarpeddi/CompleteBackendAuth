const express = require('express');
const {validateSignUpMiddleware , validateSignInMiddleware} = require('../middleware/validate')
const {createUser,checkUser} =  require('../config/database')
const auth = express.Router();


auth.post('/api/auth/register',validateSignUpMiddleware,async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;
    try{
        if(!await createUser(username,password,name))
            return res.status(500).json({
                msg:"User already exists in the database"
            })
        res.status(201).json({
            username:username,
            name:name
        })
    }catch(err){
        res.status(500).json({
            error:"Internal serveral failure"
        })
    }
})


auth.post('/api/auth/signin',validateSignInMiddleware,async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    try{
        if(!await checkUser(username,password))
            return res.status(401).json({
                msg:"Invalid Username or Password"
            })
        res.status(201).json({
            username:username,
            msg:"Access Granted"
        })
    }catch(err){
        res.status(500).json({
            error:"Internal serveral failure"
        })
    }
})

module.exports = auth