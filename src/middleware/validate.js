const zod = require('zod');
const jwt = require('jsonwebtoken')
const path = require('path')
require('dotenv').config({
    path:path.resolve(__dirname,'../../.env')
})
const schemaSignUp = zod.object({
    username:zod.string().email(),
    password:zod.string().min(8),
    name:zod.string().nonempty(),
})

const schemaSignIn = zod.object({
    username:zod.string().email(),
    password:zod.string().min(8)
})

const validateSignIn = (username,password) => {
    const response = schemaSignIn.safeParse({username,password});
    if(response.success)
        return true;
    return false;
}


const validateSignUp = (username,password,name) => {
    const response = schemaSignUp.safeParse({username,password,name});
    if(response.success)
        return true;
    return false;
}

const validateSignUpMiddleware = (req,res,next) => {
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;
    try{
        if(!validateSignUp(username,password,name))
            return res.status(422).json({
                msg:"Unproccessable Data"
            })
    
            next();
    }catch(err){
        res.status(422).json({
            mgs:err
        })
    }
}

const validateSignInMiddleware = (req,res,next) => {
    const username = req.body.username;
    const password = req.body.password; 
    try{
        if(!validateSignIn(username,password))
            return res.status(422).json({
                msg:"Unproccessable Data"
            })
    
            next();
    }catch(err){
        res.status(422).json({
            mgs:err
        })
    }
}

const validateSessionTokenJWT = (req,res,next) => {
    const authToken = req.headers.authorization;
    try{
        const decode = jwt.verify(authToken,process.env.JWT_SECRET);
        if(!decode) return res.status(401).json({
            msg:"Unauthorized Access"
        })
        req.user = decode;
        next();
    }catch(err){
        res.status(500).send({
            msg:"Authorization token is required"
        })
    }
}

module.exports ={ validateSignUpMiddleware , validateSignInMiddleware,validateSessionTokenJWT}