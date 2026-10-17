const mongoose = require('mongoose')
const path = require('path')
const bcrypt = require('bcrypt')
require('dotenv').config({
    path:path.resolve(__dirname,'../../.env')
})
const MONGOOSE_URL = process.env.MONGODB_URI;
const Users = mongoose.model('users',{username:String,password:String,name:String});
const createUser = async (username,password,name) => {
    await mongoose.connect(MONGOOSE_URL);
    const encryptedPassword = await bcrypt.hash(password,10);
    if(!await Users.findOne({username:username})){
        const user = new Users({username:username,password:encryptedPassword,name:name})
        user.save();
    }else{
        console.err("User already exists")
        return;
    }
}

module.exports = {createUser}