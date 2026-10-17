const zod =  require('zod');

const schemaSignUp = zod.object({
    username:zod.string().email(),
    password:zod.string().min(9),
    name:zod.string().nonempty()
})

const validateSignUp = (username,password,name) => {
    const response = schemaSignUp.safeParse({username,password,name});
    if(!response.success)
        return false;
    return true;
}

const validateSignUpMiddleware = (req,res,next) => {
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;
    if(!validateSignUp(username,password,name)){
        return res.status(422).json({
            msg:"Unprocessable Input"
        })
    }
    next()
}

module.exports = {validateSignUpMiddleware}