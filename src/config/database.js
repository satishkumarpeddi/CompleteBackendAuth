const mongoose = require('mongoose')
const path = require('path')
const bcrypt = require('bcrypt')
require('dotenv').config({
    path:path.resolve(__dirname,'../../.env')
})
const MONGOOSE_URL = process.env.MONGODB_URI;
const Users = mongoose.model('users',{username:String,password:String,name:String});
const createUser = async (username,password,name) => {
    const encryptedPassword = await bcrypt.hash(password,10);
    if(!await Users.findOne({username:username})){
        const user = new Users({username:username,password:encryptedPassword,name:name})
        await user.save();
    }else{
        console.err("User already exists")
        return;
    }
}


const checkUserExists = async(username,password) => {
    const user = await Users.findOne({username:username})
    if(!user){
        return false;
    }
    
    let    isValid = await bcrypt.compare(password,user.password)

    return isValid;
}

mongoose.connect(MONGOOSE_URL)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));
module.exports = {createUser,checkUserExists}