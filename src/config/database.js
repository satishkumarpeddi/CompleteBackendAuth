const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
const path = require('path')
dotenv.config({
    path:path.resolve(__dirname,'../../.env')
})
const MONGODB_URL = process.env.MONGODB_URI;

const Users = mongoose.model('Users',{
    username:String,
    password:String,
    name:String,
});

const findUser = async (username) => {
    const user = await Users.findOne({username:username})
    if(!user) return true;
    return false;
}
findUser("satishkumarpeddi@gmail.com")
const createUser = async (username,password,name) => {
    try{
        if(!await findUser(username))
            return false;
        const encryptedPassword = await bcrypt.hash(password,10)
        const user = new Users({username:username,password:encryptedPassword,name:name});
        await user.save();
    }catch(err){
        throw err;
    }
    return true;
}

const checkUser = async (username,password) => {
        const user = await Users.findOne({username:username});
        if(!user) return false;
        const isPasswordValid = await bcrypt.compare(password,user.password)
        if(!isPasswordValid) return false;
        return true;
}

const getAllUsers = async (currentUser) => {
    try {
        const users = await Users.find({
            username:{$ne:currentUser}
        }).select('-password');
        return users;
    } catch (err) {
        throw err;
    }
}


mongoose.connect(MONGODB_URL).then(()=>{
    console.log("Mongodb Connected")
}).catch((err)=>{
    throw err;
})

module.exports = {createUser,checkUser,getAllUsers}